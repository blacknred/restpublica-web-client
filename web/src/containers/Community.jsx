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
        this.state = {};
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        community: PropTypes.string.isRequired,
        switchNotFound: PropTypes.func.isRequired
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
        const { userId } = this.props
        const data = {
            communityId: this.state.id,
            data: { userId }
        }
        const res = await createCommunitySubscription(data)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        // this.setState({
        //     followers_cnt: parseInt(this.state.followers_cnt, 10) + 1,
        //     my_subscription: parseInt(res.data, 10)
        // })
    }

    removeSubscriptionHandler = async () => {
        const data = {
            communityId: this.state.id,
            subscriptionId: this.state.my_subscription
        }
        const res = await removeCommunitySubscription(data)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        // this.setState({
        //     followers_cnt: this.state.followers_cnt - 1,
        //     my_subscription: null
        // })
    }

    componentDidMount() {
        console.log(`community page is mounted: ${this.props.community} `)
        this.getCommunityDataHandler();
    }

    render() {
        const { name, admin_id } = this.state
        const { isAuthenticated, userId } = this.props
        return (
            this.state.name ?
                <CommunityContent
                    {...this.state}
                    {...this.props}
                    isAdmin={isAuthenticated && admin_id === userId }
                    removeSubscription={this.removeSubscriptionHandler}
                    createSubscription={this.createSubscriptionHandler}
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

