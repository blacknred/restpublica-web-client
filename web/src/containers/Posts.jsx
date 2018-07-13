import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import {
    getFeedPosts,
    getTrendingPosts,
    getSearchedPosts,
    getProfilePosts,
    getCommunityPosts,
    getTagPosts,
    getProfile,
    getCommunity
} from '../api'
import {
    createFlashMessage,
    switchLoader
} from '../actions'
import PostsList from '../components/PostsList'
import NewPostButton from '../components/NewPostButton'
import EmptyContentMessage from '../components/EmptyContentMessage'

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetId: null,
            hasMore: true,
            empty: false,
            posts: [],
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        path: PropTypes.array.isRequired,
        userId: PropTypes.any,
        username: PropTypes.string,
        userAvatar: PropTypes.string,
        switchLoader: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired
    }

    getPostsHandler = async (page) => {
        let res
        const { targetId, posts } = this.state
        const { path, userId, username, switchLoader, createMessage } = this.props
        switch (path[1]) {
            case '': res = await getFeedPosts(page)
                break
            case 'explore': res = await getTrendingPosts(page)
                break
            case username: res = await getProfilePosts({ userId, page })
                break
            case 'search':
                res = await getSearchedPosts({ query: path[2], page })
                break
            case 'tags': res = await getTagPosts({ tag: path[2], page })
                break
            case 'communities':
                if (!targetId) await this.getCommunityIdHandler(path[2])
                res = await getCommunityPosts({ communityId: this.state.targetId, page })
                break
            default:
                if (!targetId) await this.getProfileIdHandler(path[1])
                res = await getProfilePosts({ userId: this.state.targetId, page })
        }
        switchLoader(false)
        if (!res) {
            this.setState({ hasMore: false });
            createMessage('Server error. Try later.')
            return
        }
        if (this.mounted) {
            // if there are no requested posts at all view empty page 
            if (res.data.count === '0') {
                this.setState({
                    hasMore: false,
                    empty: true
                })
            }
            // enlarge posts arr if there are, block loading if there are not
            if (res.data.posts.length) {
                this.setState({ posts: posts.concat(...res.data.posts) });
            } else {
                this.setState({ hasMore: false });
            }
            console.log(`page:${page}, ${this.state.posts.length} from ${res.data.count}`)
        }
    }

    getCommunityIdHandler = async (communityName) => {
        const res = await getCommunity(communityName)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({
            targetId: res.data.id,
            communityName: res.data.name,
            communitySubscription: res.data.my_subscription
        })
    }

    getProfileIdHandler = async (profileName) => {
        const res = await getProfile(profileName)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({ targetId: res.data.id })
    }

    componentDidMount() {
        this.mounted = true;
        const { path, switchLoader } = this.props
        switchLoader(true)
        console.log('posts are mounted:', path[1] || 'feed')
    }

    componentWillUnmount() {
        this.setState({ hasMore: false })
        this.mounted = false;
    }

    render() {
        const { empty, targetId, communityName, communitySubscription } = this.state
        const {
            isAuthenticated, username, userAvatar, isFeedMultiColumn, path
        } = this.props;
        return (
            <Fragment>
                {
                    (
                        (path[1] === '') ||
                        (path[1] === username) ||
                        (path[1] === 'communities' && communitySubscription)
                    ) &&
                    <NewPostButton
                        community={
                            !communityName ? null :
                                {
                                    id: targetId,
                                    name: communityName
                                }
                        }
                    />
                }
                {
                    empty ?
                        <EmptyContentMessage
                            mode={path[1]}
                            isProfilePage={isAuthenticated && path[1] === username}
                        /> :
                        <PostsList
                            {...this.state}
                            mode={path[1] || 'feed'}
                            userAvatar={userAvatar}
                            isPreview={path[1] === 'explore'}
                            isFeedMultiColumn={isFeedMultiColumn}
                            getPosts={this.getPostsHandler}
                        />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    userId: state.authentication.id,
    username: state.authentication.username,
    userAvatar: state.authentication.avatar,
    isFeedMultiColumn: state.uiSwitchers.isFeedMultiColumn,
    path: ownProps.location.pathname.split('/'),
})

const mapDispatchToProps = dispatch => ({
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    createMessage: (text) => dispatch(createFlashMessage(text))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))