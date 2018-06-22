import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    createFlashMessage,
    switchLoader
} from '../actions'
import NotificationsList from '../components/NotificationsList'

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    formateDateHandler = dateObj => {
        const output = moment(dateObj).fromNow(true)
        const outputArr = output.split(' ')
        switch (outputArr[1]) {
            case 'secounds': return outputArr[0] + ' sec';
            case 'minutes': return outputArr[0] + ' min';
            case 'hours': return outputArr[0] + ' h';
            case 'days': return outputArr[0] + ' d';
            case 'months': return outputArr[0] + ' mon';
            case 'years': return outputArr[0] + ' y';
            default: return output
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        path: PropTypes.array.isRequired,
        notifications: PropTypes.array.isRequired,
        isNotify: PropTypes.bool.isRequired,
        switchLoader: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired
    }

    render() {
        return (
            <NotificationsList
                notifications={this.props.notifications}
                formateDate={this.formateDateHandler}
            />
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    isNotify: state.notifications.isNotify,
    notifications: state.notifications.notificationsList,
    path: ownProps.location.pathname.split('/'),
})

const mapDispatchToProps = dispatch => ({
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    createMessage: (text) => dispatch(createFlashMessage(text))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notifications))