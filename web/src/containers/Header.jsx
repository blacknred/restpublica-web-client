import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
    toggleNotFound, toggleNightMode, toggleDrawer,
    toggleNotify, logoutUser, createFlashMessage
} from '../actions'
import HeaderContent from '../components/HeaderContent'
import { withRouter } from 'react-router-dom';



const Header = (props) => {
    const redirect = (path) => props.history.push(path)
    return (
        <HeaderContent
            {...props}
            redirect={redirect}
        />
    )

}

Header.propTypes = {
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
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired,
    query: PropTypes.any.isRequired,
    toggleFound: PropTypes.func.isRequired,
    toggleNotify: PropTypes.func.isRequired,
    createFlashMessage: PropTypes.func.isRequired
}
const mapStateToProps = (state, ownProps) => ({
    isDrawer: state.uiSwitchers.isDrawer,
    isAuthenticated: state.authentication.isAuthenticated,
    isNotify: state.notifications.isNotify,
    isNightMode: state.uiSwitchers.isNightMode,
    isNotFound: state.uiSwitchers.isNotFound,
    notifications: state.notifications.notificationsList,
    user: state.authentication.user,
    query: ownProps.match.params.query || null
})
const mapDispatchToProps = dispatch => {
    return {
        toggleNotFound: (mode) => dispatch(toggleNotFound(mode)),
        toggleNightMode: (mode) => dispatch(toggleNightMode(mode)),
        toggleDrawer: (mode) => dispatch(toggleDrawer(mode)),
        toggleNotify: (mode) => dispatch(toggleNotify(mode)),
        createFlashMessage: (text) => dispatch(createFlashMessage(text)),
        logoutUser: () => {
            dispatch(logoutUser())
            this.props.history.push('/')
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))