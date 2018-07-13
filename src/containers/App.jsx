import React, { Component, Fragment } from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Post from './Post';
import Tags from './Tags';
import Album from './Album';
import Posts from './Posts';
import Header from './Header';
import Drawer from './Drawer';
import Author from './Author';
import Authors from './Authors';
import Landing from './Landing';
import NewPost from './NewPost';
import Settings from './Settings';
import Community from './Community';
import Communities from './Communities';
import Frame from '../components/Frame';
import Loader from '../components/Loader';
import NewCommunity from './NewCommunity';
import Notifications from './Notifications';
import CommunityModeration from './CommunityModeration'

import FlashMessages from './FlashMessages';
import ThemeRoot from '../components/AppRoot';
import NotFound from '../components/NotFound';
import ToTopButton from '../components/ToTopButton';

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
            location, isAuthenticated, isNotFound, isNightMode, isDrawer, isLoading
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
            <Frame
                isDrawer={isDrawer}
                isLoading={isLoading}
                slideKey={isModal ? this.previousLocation.key : location.key}
            >
                <Switch
                    key={isModal ? this.previousLocation.key : location.key}
                    location={isModal ? this.previousLocation : location}
                >

                    <Route path='/(login|register)' render={() => (
                        <div>
                            {isAuthenticated ? <Redirect to='/' /> : <Landing />}
                        </div>
                    )} />



                    <Route exact path='/' render={() => (
                        isAuthenticated ? <Posts /> : toLogin
                    )} />
                    <Route path='/explore/communities' component={Communities} />
                    <Route path='/explore' render={() =>
                        <div>
                            <Tags />
                            <Communities isPreview />
                            <Posts />
                        </div>
                    } />
                    <Route path='/search/:query/communities' component={Communities} />
                    <Route path='/search/:query/authors' component={Authors} />
                    <Route path='/search/:query/posts' render={() =>
                        <div>
                            <Tags />
                            <Posts />
                        </div>
                    } />
                    <Route path='/search/:query' render={() =>
                        <Fragment>
                            <Tags />
                            <Authors isPreview />
                            <Communities isPreview />
                            <Posts />
                        </Fragment>
                    } />
                    <Route path='/search' render={() => <Redirect to='/' />} />
                    <Route path='/posts/:slug' render={() => <Post />} />
                    <Route path='/posts' render={() => <Redirect to='/' />} />
                    <Route path='/post' render={() => <Redirect to='/' />} />
                    <Route path='/tags/:tag' component={Posts} />
                    <Route path='/tags' render={() => <Redirect to='/' />} />

                    <Route path='/people/(followers|followin|recommended)' component={Authors} />
                    <Route path='/people' render={() => <Redirect to='/' />} />

                    <Route path='/communities/:name/moderation' render={() =>
                        isAuthenticated ? <CommunityModeration /> : toLogin
                    } />
                    <Route path='/communities/:name/(moderators|participants)' render={() => (
                        isAuthenticated ? <Authors /> : toLogin
                    )} />
                    <Route path='/communities/recommended' render={() => (
                        isAuthenticated ? <Communities /> : toLogin
                    )} />
                    <Route path='/communities/:name' render={() =>
                        <Fragment>
                            <Community />
                            <Posts />
                        </Fragment>
                    } />
                    <Route path='/communities' render={() => (
                        isAuthenticated ? <Communities isHome /> : toLogin
                    )} />
                    <Route path='/community' render={() => <Redirect to='/' />} />



                    <Route path='/settings' render={() => (
                        isAuthenticated ? <Settings /> : toLogin
                    )} />
                    <Route path='/activity' render={() =>
                        isAuthenticated ? <Notifications /> : toLogin
                    } />
                    <Route path='/album' render={() => <Redirect to='/' />} />



                    <Route path='/:username/communities' component={Communities} />
                    <Route path='/:username/(followers|following)' component={Authors} />
                    <Route path='/:username' render={() =>
                        <Fragment>
                            <Author />
                            <Communities isPreview />
                            <Posts />
                        </Fragment>
                    } />

                </Switch>
            </Frame >
        )

        return (
            <ThemeRoot isNightMode={isNightMode}>
                <FlashMessages />
                <ToTopButton />
                {isLoading && <Loader />}
                {isNotFound && <NotFound />}
                {!isNotFound && <Header />}
                {!isNotFound && <Drawer />}
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
