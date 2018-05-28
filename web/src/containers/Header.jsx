import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    switchNotFound, 
    switchNightMode, 
    switchDrawer,
    switchNotify, 
    logoutUser, 
    createFlashMessage
} from '../actions'
import HeaderContent from '../components/HeaderContent'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserMenuOpen: false
        }
    }

    static propTypes = {
        isDrawer: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        isNotify: PropTypes.bool.isRequired,
        isNightMode: PropTypes.bool.isRequired,
        isNotFound: PropTypes.bool.isRequired,
        notifications: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired
            })
        ).isRequired,
        avatar: PropTypes.string.isRequired,
        mode: PropTypes.string.isRequired,
        query: PropTypes.string,
        history: PropTypes.any,
        switchNotFound: PropTypes.func.isRequired,
        switchNightMode: PropTypes.func.isRequired,
        switchDrawer: PropTypes.func.isRequired,
        switchNotify: PropTypes.func.isRequired,
        createFlashMessage: PropTypes.func.isRequired,
        logoutUser: PropTypes.func.isRequired,
    }

    redirect = (path) => this.props.history.push(path)

    userMenuOpenHandler = (val) => this.setState({ isUserMenuOpen: val })

    render() {
        return <HeaderContent
            {...this.props}
            {...this.state}
            redirect={this.redirect}
            userMenuOpen={this.userMenuOpenHandler}
        />
    }
}

const mapStateToProps = (state, ownProps) => ({
    isDrawer: state.uiSwitchers.isDrawer,
    isAuthenticated: state.authentication.isAuthenticated,
    isNotify: state.notifications.isNotify,
    isNightMode: state.uiSwitchers.isNightMode,
    isNotFound: state.uiSwitchers.isNotFound,
    notifications: state.notifications.notificationsList,
    avatar: state.authentication.avatar,
    mode: ownProps.location.pathname.split('/')[1] || 'Feed',
    query: ownProps.match.params.query || null,
    history: ownProps.history,
})

const mapDispatchToProps = dispatch => {
    return {
        switchNotFound: (mode) => dispatch(switchNotFound(mode)),
        switchNightMode: (mode) => dispatch(switchNightMode(mode)),
        switchDrawer: (mode) => dispatch(switchDrawer(mode)),
        switchNotify: (mode) => dispatch(switchNotify(mode)),
        createFlashMessage: (text) => dispatch(createFlashMessage(text)),
        logoutUser: () => dispatch(logoutUser())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))