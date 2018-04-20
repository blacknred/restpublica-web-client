import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Route, Redirect, Switch } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Paper from 'material-ui/Paper';
import './App.css';
import NotFound from '../components/NotFound';
import Landing from './Landing';
import FlashMessages from './FlashMessages';
import Header from './Header';
import AppDrawer from './Drawer';

import ModalHoc from './Modal'
import PostEditor from './PostEditor';

import Settings from './Settings';
import Post from './Post';
import DiscoveryTabs from '../components/DiscoveryTabs'
import Author from './Author';
import Activity from './Activity';
import Communities from './Communities'
import Tags from './Tags'
import Posts from './Posts';
import Subscriptions from './Subscriptions'
import Authors from './Authors'
import AuthorsPreview from './AuthorsPreview'

import { toggleModal } from '../actions'

//console.log(lightBaseTheme)
lightBaseTheme.palette.primary1Color = '#03A9F4'
lightBaseTheme.palette.canvasColor = '#fdfdfd'
lightBaseTheme.appBar = {
    color: lightBaseTheme.palette.canvasColor,
    textColor: lightBaseTheme.palette.secondaryTextColor
}
darkBaseTheme.palette.primary1Color = '#03A9F4'
darkBaseTheme.appBar = {
    color: darkBaseTheme.palette.canvasColor,
    textColor: darkBaseTheme.palette.secondaryTextColor
}

class App extends Component {
    previousLocation = this.props.location
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        isNightMode: PropTypes.bool.isRequired,
        isDrawer: PropTypes.bool.isRequired,
        isNotFound: PropTypes.bool.isRequired,
        isModalOpen: PropTypes.bool.isRequired,
        toggleModalOpen: PropTypes.func.isRequired
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
        const { location, history, isAuthenticated, isNotFound, isNightMode,
            isDrawer, isModalOpen, toggleModalOpen } = this.props
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
        const closeModalHandler = () => setTimeout(() => { history.goBack() }, 300);
        const Modal = ModalHoc(() =>
            <Switch >
                <Route exact path="/post" component={PostEditor} />
                <Route path="/community" component={() => (<h1>New community</h1>)} />
                <Route path="/p/:id" component={() => (<h1>Post</h1>)} />
            </Switch>
        )
        return (
            <MuiThemeProvider
                muiTheme={getMuiTheme(isNightMode ? darkBaseTheme : lightBaseTheme)}>
                <Paper className={isDrawer && isAuthenticated ? 'frame left top' :
                    isAuthenticated ? 'frame top' : 'frame'} >
                    <FlashMessages />
                    {isAuthenticated && !isNotFound && <Header />}
                    {isAuthenticated && !isNotFound && <AppDrawer />}
                    {isNotFound && <NotFound />}
                    {isModal &&
                        <Modal
                            close={closeModalHandler}
                            isModalOpen={isModalOpen}
                            toggleModalOpen={toggleModalOpen}
                        />}
                    {!isNotFound &&
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
                                <CSSTransitionGroup
                                    transitionName='fadeinup'
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={500} >
                                    <Switch
                                        key={isModal ? this.previousLocation.key : location.key}
                                        location={isModal ? this.previousLocation : location} >
                                        {/* ***** auth paths ***** */}
                                        <Route exact path='/' render={() => (
                                            !isAuthenticated ? toLogin :
                                                <Posts postable={isAuthenticated && !isModal} />
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
                                        <Route path='/community' render={() => <Redirect to='/' />} />

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
                                                        isAuthenticated &&
                                                        <Route path='/:username/:mode(followers|followin)'
                                                            component={Subscriptions} />
                                                    }
                                                    <Route render={() => (<Redirect to={`${match.url}/posts`} />)} />
                                                </Switch>
                                            </div>
                                        )} />
                                    </Switch>
                                </CSSTransitionGroup>
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
    isNotFound: state.uiSwitchers.isNotFound,
    isModalOpen: state.uiSwitchers.isModal
})

const mapDispatchToProps = dispatch => ({
    toggleModalOpen: (mode) => dispatch(toggleModal(mode))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
