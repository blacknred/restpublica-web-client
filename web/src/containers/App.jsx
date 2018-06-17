import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import Slide from '@material-ui/core/Slide';

import Post from './Post';
import Tags from './Tags';
import Album from './Album';
import Posts from './Posts';
import Header from './Header';
import Drawer from './Drawer';
import Author from './Author';
import Community from './Community';
import Authors from './Authors';
import Landing from './Landing';
import NewPost from './NewPost';
import Settings from './Settings';
import Notifications from './Notifications';
import Communities from './Communities';
import Frame from '../components/Frame';
import Loader from '../components/Loader';
import NewCommunity from './NewCommunity';

import FlashMessages from './FlashMessages';
import ThemeRoot from '../components/AppRoot';
import NotFound from '../components/NotFound';
import FabPanel from '../components/FabPanel';


class App extends Component {
    previousLocation = this.props.location
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        isNightMode: PropTypes.bool.isRequired,
        isDrawer: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isNotFound: PropTypes.bool.isRequired,
    }

    componentWillUpdate(nextProps) {
        const { location } = this.props
        const willUpdate = !!(
            nextProps.history.action !== 'POP' &&
            (!location.state || !location.state.modal)
        )
        if (willUpdate) this.previousLocation = this.props.location
    }

    render() {
        const {
            location, history, isAuthenticated, isNotFound, isNightMode, isDrawer, isLoading
        } = this.props

        const isModal = !!(
            /* 
                - modals engine -
                React-router Links with { modal:true } value will provoke is_modal to be true.
                When isModal is true Main switch routing will not go to new 
                location, stay on previousLocation and not render other component,
                but Modal switch routing will render proper modal component.
            */
            location.state &&
            location.state.modal &&
            this.previousLocation !== location // not initial render
        )

        const toLogin = (
            <Redirect to={{
                pathname: '/login',
                state: { from: location.pathname }
            }} />
        )

        const modals = (
            isModal &&
            <Switch>
                <Route path="/post" component={NewPost} />
                <Route path="/community" component={NewCommunity} />
                <Route path="/p/:id" component={Post} />
                <Route path="/album" component={Album} />
                <Route path="/search" component={Tags} />
            </Switch>
        )

        const frame = (
            !isNotFound &&
            <Frame isDrawer={isDrawer}>
                <Slide
                    key={isModal ? this.previousLocation.key : location.key}
                    direction="up"
                    in={!isLoading}
                    mountOnEnter
                    unmountOnExit
                >
                    <Switch
                        key={isModal ? this.previousLocation.key : location.key}
                        location={isModal ? this.previousLocation : location}
                    >

                        {/* ***** auth paths ***** */}
                        {/* ***** non auth paths ***** */}

                        <Route path='/(login|register)' render={() =>
                            isAuthenticated ? <Redirect to='/' /> : <Landing />
                        } />
                        <Route exact path='/' render={() => (
                            isAuthenticated ? <Posts /> : toLogin
                        )} />
                        <Route path='/settings' render={() => (
                            isAuthenticated ? <Settings /> : toLogin
                        )} />
                        <Route path='/trending/posts' render={() =>
                            <div>
                                <Tags />
                                <Posts />
                            </div>
                        } />
                        <Route path='/trending/communities' component={Communities} />
                        <Route path='/trending/authors' component={Authors} />
                        <Route path='/trending' render={() =>
                            <Redirect to='/trending/posts' />
                        } />

                        <Route path='/search/:query/posts' render={() =>
                            <div>
                                <Tags />
                                <Posts />
                            </div>
                        } />
                        <Route path='/search/:query/communities' component={Communities} />
                        <Route path='/search/:query/authors' component={Authors} />
                        <Route path='/search/:query' render={({ match }) =>
                            match.params.query ?
                                <Redirect to={`${match.url}/posts`} /> :
                                <Redirect to='/' />
                        } />
                        <Route path='/search' render={() => <Redirect to='/' />} />


                        <Route path='/post/:slug' render={() => <Post />} />
                        <Route path='/community/:name/members' component={Authors} />
                        <Route path='/community/:name' render={() =>
                            <div>
                                <Community />
                                <Posts />
                            </div>
                        } />

                        <Route path='/post' render={() => <Redirect to='/' />} />
                        <Route path='/album' render={() => <Redirect to='/' />} />
                        <Route path='/community' render={() => <Redirect to='/' />} />

                        <Route path='/activity' render={() =>
                            isAuthenticated ? <Notifications /> : toLogin
                        } />

                        <Route path='/:username/communities' render={() =>
                            isAuthenticated ? <Communities /> : toLogin
                        } />
                        <Route path='/:username/(followers|following)' render={() =>
                            isAuthenticated ? <Authors /> : toLogin
                        } />
                        <Route path='/:username' render={() =>
                            <div>
                                <Author />
                                <Posts />
                            </div>
                        } />


                        {/* <Route path='/communities' render={() => (
                            isAuthenticated ?  <Communities /> : toLogin
                        )} />
                        <Route path='/(followers|following)' render={() => (
                            isAuthenticated ? <Authors /> : toLogin
                        )} />
                        <Route path='/activity' render={() =>
                            isAuthenticated ? <Notifications /> : toLogin
                        } /> */}

                    </Switch>
                </Slide>
            </Frame>
        )

        return (
            <ThemeRoot isNightMode={isNightMode}>
                <Slide
                    direction="down"
                    in={isAuthenticated && !isNotFound}
                    timeout={400}
                >
                    <Header />
                </Slide>
                <FlashMessages />
                {isLoading && <Loader />}
                {isNotFound && <NotFound />}
                <FabPanel path={location.pathname} />
                {isAuthenticated && !isNotFound && <Drawer />}
                {modals}
                {frame}
            </ThemeRoot>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    isNightMode: state.uiSwitchers.isNightMode,
    isDrawer: state.uiSwitchers.isDrawer,
    isLoading: state.uiSwitchers.isLoading,
    isNotFound: state.uiSwitchers.isNotFound,
})

export default connect(mapStateToProps)(App)
