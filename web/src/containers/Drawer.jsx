import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import {
    switchNotFound,
    switchDrawer
} from '../actions'
import DrawerContent from '../components/DrawerContent'

class Drawer extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        isDrawer: PropTypes.bool.isRequired,
        isNotFound: PropTypes.bool.isRequired,
        switchNotFound: PropTypes.func.isRequired,
        switchDrawer: PropTypes.func.isRequired,
        path: PropTypes.string.isRequired,
        updateHistory: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired
    }

    navigateHandler = (path) => {
        const { isNotFound, switchNotFound, updateHistory } = this.props
        if (isNotFound) switchNotFound(true);
        updateHistory(path)
    }

    render() {
        return (
            <DrawerContent
                {...this.props}
                navigate={this.navigateHandler}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isDrawer: state.uiSwitchers.isDrawer,
    isNotFound: state.uiSwitchers.isNotFound,
    isNightMode: state.uiSwitchers.isNightMode,
    path: ownProps.location.pathname,
    updateHistory: ownProps.history.push,
    username: state.authentication.username
})

const mapDispatchToProps = dispatch => ({
    switchNotFound: (mode) => dispatch(switchNotFound(mode)),
    switchDrawer: (mode) => dispatch(switchDrawer(mode)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Drawer))
