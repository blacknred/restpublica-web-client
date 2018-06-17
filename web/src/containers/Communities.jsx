import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    getTrendingCommunities, 
    getSearchedCommunities,
    getAdminCommunities,
    getProfileCommunities,
    getSubscriptionsCommunities,
    createCommunitySubscription, 
    removeCommunitySubscription
} from '../api'
import {
    createFlashMessage,
    switchLoader
} from '../actions'
import CommunitiesList from '../components/CommunitiesList';
import EmptyContentMessage from '../components/EmptyContentMessage'

class Communities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.path[1],
            empty: false,
            hasMore: true,
            communities: []
        };
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        path: PropTypes.array.isRequired,
        userId: PropTypes.any.isRequired,
    }

    getCommunitiesHandler = async (page) => {
        let res
        const { mode, communities } = this.state
        const { path, userId, switchLoader, createMessage } = this.props
        switch (mode) {
            case 'search': res = await getSearchedCommunities({ query: path[2], page })
                break
            default: res = await getTrendingCommunities(page)
        }
        switchLoader(false)
        if (!res) {
            this.setState({ hasMore: false });
            createMessage('Server error. Try later.')
            return
        }
        // if there are no requested communitys at all view empty page 
        if (res.data.count === '0') {
            this.setState({
                hasMore: false,
                empty: true
            })
        }
        // enlarge communitys arr if there are, block loading if there are not
        if (res.data.communities.length) {
            this.setState({ communities: communities.concat(...res.data.communities) });
        } else {
            this.setState({ hasMore: false });
        }
        console.log(`page:${page}, ${this.state.communities.length} from ${res.data.count}`)
    }

    createSubscriptionHandler = async ({ id, name }) => {
        const { communities } = this.state
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
        communities.forEach((community) => {
            if (community.id === id) {
                community.followers_cnt = parseInt(community.followers_cnt, 10) + 1,
                community.my_subscription = parseInt(res.data, 10)
            }
        })
        this.setState({ communities })
        createMessage(`You are subscribed ${name} from now`)
    }

    removeSubscriptionHandler = async ({ id, name }) => {
        const { communities } = this.state
        const { userId, createMessage } = this.props
        const data = {
            communityId: id,
            subscriptionId: communities.find(c => c.id === id).my_subscription
        }
        const res = await removeCommunitySubscription(data)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        communities.forEach((community) => {
            if (community.id === id) {
                community.followers_cnt = parseInt(community.followers_cnt, 10) - 1,
                community.my_subscription = null
            }
        })
        this.setState({ communities })
        createMessage(`You are not subscribed ${name} from now`)
    }

    componentDidMount() {
        this.props.switchLoader(true)
        console.log('communities are mounted:', this.state.mode)
    }

    render() {
        const { empty } = this.state
        const { isAuthenticated } = this.props
        return (
            !empty ?
            <CommunitiesList
                {...this.state}
                isAuthenticated={isAuthenticated}
                getCommunities={this.getCommunitiesHandler}
                createSubscription={this.createSubscriptionHandler}
                removeSubscription={this.removeSubscriptionHandler}
            /> :
            <EmptyContentMessage/>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    path: ownProps.location.pathname.split('/'),
    userId: state.authentication.id,
})

const mapDispatchToProps = dispatch => ({
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    createMessage: (message) => dispatch(createFlashMessage(message))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Communities))
