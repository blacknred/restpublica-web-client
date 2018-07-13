import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import { switchDrawer } from '../actions'
import DrawerContent from '../components/DrawerContent'

class Drawer extends Component {
    static propTypes = {
        isDrawer: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        switchDrawer: PropTypes.func.isRequired,
        path: PropTypes.array.isRequired,
        username: PropTypes.string
    }

    render() {
        return <DrawerContent {...this.props} />
    }
}

const mapStateToProps = (state, ownProps) => ({
    isDrawer: state.uiSwitchers.isDrawer,
    isNightMode: state.uiSwitchers.isNightMode,
    path: ownProps.location.pathname.split('/'),
    username: state.authentication.username,
    isAuthenticated: state.authentication.isAuthenticated,
})

const mapDispatchToProps = dispatch => ({
    switchDrawer: (mode) => dispatch(switchDrawer(mode)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Drawer))
