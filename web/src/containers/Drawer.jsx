import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
    switchNotFound,
    switchDrawer
} from '../actions'
import DrawerContent from '../components/DrawerContent'

const Drawer = (props) => {
    const navigate = (path) => {
        if (props.isNotFound) props.switchNotFound(true);
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
    switchNotFound: PropTypes.func.isRequired,
    switchDrawer: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}
const mapStateToProps = (state, ownProps) => ({
    isDrawer: state.uiSwitchers.isDrawer,
    isNotFound: state.uiSwitchers.isNotFound,
    isNightMode: state.uiSwitchers.isNightMode,
    path: ownProps.location.pathname,
    username: state.authentication.username
})
const mapDispatchToProps = dispatch => ({
    switchNotFound: (mode) => dispatch(switchNotFound(mode)),
    switchDrawer: (mode) => dispatch(switchDrawer(mode)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Drawer))
