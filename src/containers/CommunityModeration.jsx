import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    createFlashMessage,
    switchLoader
} from '../actions'
import CommunityModerationContent from '../components/CommunityModerationContent'

class CommunityModeration extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        path: PropTypes.array.isRequired,
        switchLoader: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired
    }

    render() {
        return (
            <CommunityModerationContent/>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    path: ownProps.location.pathname.split('/'),
})

const mapDispatchToProps = dispatch => ({
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    createMessage: (text) => dispatch(createFlashMessage(text))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommunityModeration))