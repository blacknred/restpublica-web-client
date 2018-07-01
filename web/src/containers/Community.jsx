import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    getCommunity,
    createCommunitySubscription,
    removeCommunitySubscription,
} from '../api'
import {
    createFlashMessage,
    switchNotFound
} from '../actions'
import CommunityContent from '../components/CommunityContent';

class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRemoveSubscriptionOpen: false
        };
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        community: PropTypes.string.isRequired,
        switchNotFound: PropTypes.func.isRequired
    }

    toggleContextDialogHandler = (target) => {
        this.setState({ [target]: !this.state[target] })
    }

    getCommunityDataHandler = async () => {
        const { community } = this.props
        const res = await getCommunity(community)
        if (!res) {
            this.props.switchNotFound(true)
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({ ...res.data })
    }

    createSubscriptionHandler = async () => {
        const { id, name } = this.state
        const { userId, createMessage } = this.props
        const data = {
            communityId: id,
            data: { userId }
        }
        const res = await createCommunitySubscription(data)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        this.setState({
            followers_cnt: parseInt(this.state.followers_cnt, 10) + 1,
            my_subscription: parseInt(res.data, 10)
        })
        createMessage(`You are subscribed ${name} from now`)
    }

    removeSubscriptionHandler = async () => {
        const { id, name, my_subscription } = this.state
        const { createMessage } = this.props
        const data = {
            communityId: id,
            subscriptionId: my_subscription
        }
        const res = await removeCommunitySubscription(data)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        this.setState({
            followers_cnt: this.state.followers_cnt - 1,
            my_subscription: null
        })
        createMessage(`You are not subscribed ${name} from now`)
    }

    componentDidMount() {
        console.log(`community page is mounted: ${this.props.community} `)
        this.getCommunityDataHandler();
    }

    render() {
        const { name, admin_id } = this.state
        const { isAuthenticated, userId } = this.props
        return (
            name ?
                <CommunityContent
                    {...this.state}
                    {...this.props}
                    isAdmin={isAuthenticated && admin_id === userId }
                    removeSubscription={this.removeSubscriptionHandler}
                    createSubscription={this.createSubscriptionHandler}
                    toggleContextDialog={this.toggleContextDialogHandler}
                /> :
                <div />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        username: state.authentication.username,
        userId: state.authentication.id,
        community: ownProps.match.params.name
    }
}

const mapDispatchToProps = dispatch => ({
    createMessage: (text) => dispatch(createFlashMessage(text)),
    switchNotFound: (mode) => dispatch(switchNotFound(mode)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Community))

