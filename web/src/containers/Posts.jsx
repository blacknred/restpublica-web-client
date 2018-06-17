import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { PureComponent } from 'react';
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
import EmptyContentMessage from '../components/EmptyContentMessage'

class Posts extends PureComponent {
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
        userId: PropTypes.any.isRequired,
        username: PropTypes.string.isRequired,
        userAvatar: PropTypes.string.isRequired,
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
            case 'trending': res = await getTrendingPosts(page)
                break
            case username: res = await getProfilePosts({ userId, page })
                break
            case 'search': res = await getSearchedPosts({ query: path[2], page })
                break
            case 'tag': res = await getTagPosts({ tag: path[2], page })
                break
            case 'community':
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

    getCommunityIdHandler = async (communityName) => {
        const res = await getCommunity(communityName)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({ targetId: res.data.id })
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
        const { path, switchLoader } = this.props
        switchLoader(true)
        console.log('posts are mounted:', path[1] || 'feed')
    }

    render() {
        const { 
            isAuthenticated, username, userAvatar, isFeedMultiColumn, path 
        } = this.props;
        return (
            !this.state.empty ?
                <PostsList
                    {...this.state}
                    mode={path[1] || 'feed'}
                    userAvatar={userAvatar}
                    isPreview={path[1] === 'trending'}
                    isFeedMultiColumn={isFeedMultiColumn}
                    getPosts={this.getPostsHandler}
                /> :
                <EmptyContentMessage
                    isProfileMode={isAuthenticated && path[1] === username}
                />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    userId: state.authentication.id,
    username: state.authentication.username,
    userAvatar: state.authentication.avatar,
    isFeedMultiColumn: state.uiSwitchers.isFeedMultiColumn,
    path: ownProps.location.pathname.split('/')
})

const mapDispatchToProps = dispatch => ({
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    createMessage: (text) => dispatch(createFlashMessage(text))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))