import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { toggleNotFound } from '../actions'
import DrawerContent from '../components/DrawerContent'

const Drawer = (props) => {
    const navigate = (path) => {
        if (props.isNotFound) props.toggleNotFound(true);
        props.history.push(path)
    }
    return (
        <DrawerContent
            {...props}
            navigate={navigate}
        />
    )
}

Drawer.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    isNotFound: PropTypes.bool.isRequired,
    toggleNotFound: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}
const mapStateToProps = (state, ownProps) => ({
    isDrawer: state.uiSwitchers.isDrawer,
    isNotFound: state.uiSwitchers.isNotFound,
    isNightMode: state.uiSwitchers.isNightMode,
    pathname: ownProps.location.pathname,
    username: state.authentication.username
})
const mapDispatchToProps = dispatch => ({
    toggleNotFound: (mode) => dispatch(toggleNotFound(mode))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Drawer))
