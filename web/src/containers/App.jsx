import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import Post from './Post';
import Tags from './Tags';
import Album from './Album';
import Posts from './Posts';
import Header from './Header';
import Drawer from './Drawer';
import Author from './Author';
import Landing from './Landing';
import Authors from './Authors';
import NewPost from './NewPost';
import Settings from './Settings';
import Activity from './Activity';
import Communities from './Communities';
import Frame from '../components/Frame';
import Loader from '../components/Loader';
import NewCommunity from './NewCommunity';
import Slide from '@material-ui/core/Slide';
import Subscriptions from './Subscriptions';
import FlashMessages from './FlashMessages';
import ThemeRoot from '../components/AppRoot';
import AuthorsPreview from './AuthorsPreview';
import NotFound from '../components/NotFound';
import ContextPanel from '../components/ContextPanel';
import DiscoveryTabs from '../components/DiscoveryTabs';

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

        return (
            <ThemeRoot isNightMode={isNightMode}>
                <FlashMessages />
                {isLoading && <Loader />}
                {isNotFound && <NotFound />}
                <ContextPanel path={location.pathname} />
                {isAuthenticated && !isNotFound && <Drawer />}
                <Slide
                    direction="down"
                    in={isAuthenticated && !isNotFound}
                    timeout={400}
                >
                    <Header />
                </Slide>
                {
                    isModal &&
                    <Switch>
                        <Route path="/post" component={NewPost} />
                        <Route path="/community" component={NewCommunity} />
                        <Route path="/p/:id" component={Post} />
                        <Route path="/album" component={Album} />
                    </Switch>
                }
                {
                    !isNotFound &&
                    <Frame
                        isAuthenticated={isAuthenticated}
                        isDrawer={isDrawer}
                    >
                        <Slide
                            key={isModal ? this.previousLocation.key : location.key}
                            direction="up"
                            in={!isLoading}
                        >
                            <Switch
                                key={isModal ? this.previousLocation.key : location.key}
                                location={isModal ? this.previousLocation : location} >
                                <Route path='/(login|register)' render={() =>
                                    isAuthenticated ? <Redirect to='/' /> : <Landing />
                                } />

                                {/* ***** auth paths ***** */}
                                <Route exact path='/' render={() => (
                                    !isAuthenticated ? toLogin : <Posts />
                                )} />
                                <Route path='/activity' render={() => (
                                    !isAuthenticated ? toLogin : <Activity />
                                )} />
                                <Route path='/settings' render={() => (
                                    !isAuthenticated ? toLogin : <Settings />
                                )} />
                                <Route path='/communities' render={() => (
                                    !isAuthenticated ? toLogin : <Communities />
                                )} />
                                <Route path='/people' render={() => (
                                    <div>
                                        people
                                        {/* <Switch location={location} key={location.key}>
                                            <Route path='/:username/posts' component={Posts} />
                                            {
                                                isAuthenticated &&
                                                <Route path='/:username/:mode(followers|followin)'
                                                    component={Subscriptions} />
                                            }
                                            <Route render={() => (<Redirect to={`${match.url}/posts`} />)} />
                                        </Switch> */}
                                    </div>
                                )} />
                                <Route path='/post' render={() => <Redirect to='/' />} />
                                <Route path='/community' render={() => <Redirect to='/' />} />

                                {/* ***** non auth paths ***** */}
                                <Route path='/post/:slug' render={() => <Post />} />
                                <Route path='/album' render={() => <Redirect to='/' />} />
                                <Route path='/trending' render={() => (
                                    <div>
                                        <Route path='/trending/:mode(posts|authors|tags|communities)'
                                            component={DiscoveryTabs} />
                                        <Switch>
                                            <Route path='/trending/posts' component={Posts} />
                                            <Route path='/trending/authors' component={Authors} />
                                            <Route path='/trending/tags' component={Tags} />
                                            <Route path='/trending/communities' component={Communities} />
                                            <Route render={() => (
                                                <div>
                                                    <AuthorsPreview />
                                                    <br />
                                                    <Posts />
                                                </div>
                                            )} />
                                        </Switch>
                                    </div>
                                )} />
                                <Route path='/search/:query/:mode' render={({ match }) => (
                                    !match.params.query ? <Redirect to='/' /> :
                                        !match.params.mode ? <Redirect to={`${match.url}/all`} /> :
                                            <div>
                                                <DiscoveryTabs />
                                                <Switch>
                                                    <Route path='/search/:query/all' component={Posts} />
                                                    <Route path='/search/:query/posts' component={Posts} />
                                                    <Route path='/search/:query/authors' component={Authors} />
                                                    <Route path='/search/:query/tags' component={Tags} />
                                                    <Route path='/search/:query/communities' component={Communities} />
                                                    <Route render={() => (<Redirect to='/search/:query/all' />)} />
                                                </Switch>
                                            </div>
                                )} />
                                <Route path='/:username' render={() => (
                                    <Switch >
                                        <Route path='/:username/communities' render={() => (
                                            <div>communities</div>
                                        )} />
                                        <Route render={() => (
                                            <div>
                                                <Author />
                                                <Posts />
                                            </div>
                                        )} />
                                    </Switch>
                                )} />
                            </Switch>
                        </Slide>
                    </Frame>
                }
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
