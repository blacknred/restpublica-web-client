/* eslint-disable no-undef */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Route, Redirect, Switch } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationCloseIcon from 'material-ui/svg-icons/navigation/close';
import { grey100 } from 'material-ui/styles/colors';

import NotFound from '../components/NotFound';
import Landing from './Landing';
import FlashMessages from './FlashMessages';
import Header from './Header';
import AppDrawer from './Drawer';

import Settings from './Settings';
import Post from './Post';
import PostEditor from './PostEditor';
import DiscoveryTabs from '../components/DiscoveryTabs'
import Author from './Author';
import Activity from './Activity';
import Communities from './Communities'
import Tags from './Tags'
import Posts from './Posts';
import Subscriptions from './Subscriptions'
import Authors from './Authors'
import AuthorsPreview from './AuthorsPreview'
import './App.css';

class App extends Component {
    previousLocation = this.props.location
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        isNightMode: PropTypes.bool.isRequired,
        isDrawer: PropTypes.bool.isRequired,
        isNotFound: PropTypes.bool.isNotFound
    }
    componentWillUpdate(nextProps) {
        const { location } = this.props
        const willUpdate = !!(
            nextProps.history.action !== 'POP' &&
            (!location.state || !location.state.modal)
        )
        // console.log(`
        //     previousLocation: ${location.pathname}
        //     nextLocation: ${nextProps.history.location.pathname}
        //     action: ${willUpdate ? 'not modal' : 'modal'}
        //     previousLocation: ${this.previousLocation.pathname}
        //     `)
        if (willUpdate) {
            /* set previousLocation if props.location is not modal */
            this.previousLocation = this.props.location
        }
        // const willUpdate = !!(
        //     nextProps.history.action !== 'POP' &&
        //     (!nextProps.history.location.state || !nextProps.history.location.state.modal)
        // )
        // if (willUpdate) {
        //     /* set previousLocation if props.location is not modal */
        //     this.previousLocation = nextProps.history.location
        // }
    }
    render() {
        const { location, isAuthenticated, isNotFound, isNightMode, isDrawer} = this.props
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
            <MuiThemeProvider muiTheme={getMuiTheme(isNightMode ? darkBaseTheme : lightBaseTheme)}>
                <Paper style={{ minHeight: '100vh', backgroundColor: isNightMode ? null : grey100 }} >
                    <FlashMessages />
                    {isAuthenticated && !isNotFound ? <Header /> : null}
                    {isAuthenticated && !isNotFound ? <AppDrawer /> : null}
                    {
                        isNotFound ? <NotFound /> :
                            <Switch>
                                {/* ***** landing, auth ***** */}
                                <Route path='/register' render={() =>
                                    isAuthenticated ? <Redirect to='/' /> : <Landing />
                                } />
                                <Route path='/login' render={() =>
                                    isAuthenticated ? <Redirect to='/' /> : <Landing />
                                } />
                                {/* ***** app ***** */}
                                <Route render={() => (
                                    <div className={isDrawer ? 'frame open' : 'frame'}>
                                        <CSSTransitionGroup
                                            transitionName={{
                                                enter: "animatedd",
                                                enterActive: "fadeInUpp",
                                                leave: "animatedd",
                                                leaveActive: "fadeOutUpp"
                                                // appear: 'animatedd',
                                                // appearActive: 'fadeInUpp'
                                            }}
                                            transitionEnterTimeout={1000}
                                            transitionLeaveTimeout={1000} >
                                            <Switch key={location.key} location={isModal ? this.previousLocation : location}>
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
                                                <Route path='/post' render={() => <Redirect to='/' />} />

                                                {/* ***** non auth paths ***** */}
                                                <Route path='/p/:id' component={Post} />
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
                                                <Route path='/:username/:mode' render={({ match }) => (
                                                    <div>
                                                        <Author />
                                                        <Switch location={location} key={location.key}>
                                                            <Route path='/:username/posts' component={Posts} />
                                                            {
                                                                !isAuthenticated ? null :
                                                                    <Route path='/:username/:mode(followers|followin)'
                                                                        component={Subscriptions} />
                                                            }
                                                            <Route render={() => (<Redirect to={`${match.url}/posts`} />)} />
                                                        </Switch>
                                                    </div>
                                                )} />
                                            </Switch>
                                            {
                                                !isModal ? null :
                                                    <Route render={({ history }) => (
                                                        <Dialog
                                                            actions={
                                                                <IconButton onClick={() => history.goBack()} >
                                                                    <NavigationCloseIcon />
                                                                </IconButton>
                                                            }
                                                            modal={true}
                                                            contentStyle={{ width: 'auto', maxWidth: 'none' }}
                                                            open={true} >
                                                            <Switch>
                                                                <Route path="/newpost" component={PostEditor} />
                                                                <Route path="/p/:id/:mode(delete)" component={PostEditor} />
                                                                <Route path="/p/:id/:mode(edit)" component={PostEditor} />
                                                            </Switch>
                                                        </Dialog>
                                                    )} />
                                            }
                                        </CSSTransitionGroup>
                                    </div>
                                )} />
                            </Switch>
                    }
                </Paper>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    isNightMode: state.uiSwitchers.isNightMode,
    isDrawer: state.uiSwitchers.isDrawer,
    isNotFound: state.uiSwitchers.isNotFound
})

export default withRouter(connect(mapStateToProps)(App))
