import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    getTrendingCommunities,
    getSearchedCommunities,
    getAdminCommunities,
    getProfileCommunities,
    createCommunitySubscription,
    removeCommunitySubscription,
    getProfile,
} from '../api'
import {
    createFlashMessage,
    switchLoader
} from '../actions'
import PreviewList from '../components/PreviewList';
import CommunitiesList from '../components/CommunitiesList';
import EmptyContentMessage from '../components/EmptyContentMessage';

class Communities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.path[1],
            targetId: this.props.isHome ? this.props.userId : null,
            empty: false,
            hasMore: true,
            communities: []
        };
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        path: PropTypes.array.isRequired,
        userId: PropTypes.any,
        isPreview: PropTypes.bool,
        isHome: PropTypes.bool
    }

    getCommunitiesHandler = async (page) => {
        let res
        const { mode, targetId, communities } = this.state
        const { path, isPreview, isHome, switchLoader, userId, createMessage } = this.props
        switch (mode) {
            case 'search': res = await getSearchedCommunities({ query: path[2], page })
                break
            case 'explore':
            case 'communities':
                res = await getTrendingCommunities(page)
                break
            default:
                if (!targetId) await this.getProfileIdHandler(path[1])
                if (isHome) {
                    const [profileCom, adminCom] = await Promise.all([
                        getProfileCommunities({ userId: this.state.targetId, page }),
                        isHome && getAdminCommunities({ adminId: this.state.targetId, page })
                    ])
                    res = {
                        data: {
                            count: parseInt(adminCom.data.count, 10) +
                                parseInt(profileCom.data.count, 10),
                            communities: [
                                ...adminCom.data.communities,
                                ...profileCom.data.communities
                            ]
                        }
                    }
                } else res = await getProfileCommunities({ userId: this.state.targetId, page })
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
            this.setState({
                communities: [...communities, ...res.data.communities]
                    .sort((a) => a.admin_id !== parseInt(userId, 10) ? 1 : -1)
            });
            if (isPreview) this.setState({ hasMore: false });
        } else {
            this.setState({ hasMore: false });
        }
        console.log(`page:${page}, ${this.state.communities.length} from ${res.data.count}`)
    }

    getProfileIdHandler = async (profileName) => {
        const res = await getProfile(profileName)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({ targetId: res.data.id })
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
                community.followers_cnt = parseInt(community.followers_cnt, 10) + 1
                community.my_subscription = parseInt(res.data, 10)
            }
        })
        this.setState({ communities })
        createMessage(`You are subscribed ${name} from now`)
    }

    removeSubscriptionHandler = async ({ id, name }) => {
        const { communities } = this.state
        const { createMessage } = this.props
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
                community.followers_cnt = parseInt(community.followers_cnt, 10) - 1
                community.my_subscription = null
            }
        })
        this.setState({ communities })
        createMessage(`You are not subscribed ${name} from now`)
    }

    componentDidMount() {
        const { isPreview, switchLoader } = this.props
        switchLoader(true)
        if (isPreview) this.getCommunitiesHandler(1)
        console.log('communities are mounted:', this.state.mode)
    }

    componentWillUnmount() {
        this.setState({ hasMore: false })
    }

    render() {
        const { empty, communities, hasMore } = this.state
        const { path, isPreview } = this.props
        return (
            isPreview ?
                <PreviewList
                    {...this.props}
                    mode='communities'
                    datas={communities}
                    hasMore={hasMore}
                    createSubscription={this.createSubscriptionHandler}
                    removeSubscription={this.removeSubscriptionHandler}
                /> :
                empty ?
                    <EmptyContentMessage mode={path[1]} /> :
                    <CommunitiesList
                        {...this.state}
                        {...this.props}
                        getCommunities={this.getCommunitiesHandler}
                        createSubscription={this.createSubscriptionHandler}
                        removeSubscription={this.removeSubscriptionHandler}
                    />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    path: ownProps.location.pathname.split('/'),
    userId: state.authentication.id,
    isPreview: ownProps.isPreview,
    isHome: ownProps.isHome || false
})

const mapDispatchToProps = dispatch => ({
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    createMessage: (message) => dispatch(createFlashMessage(message))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Communities))
