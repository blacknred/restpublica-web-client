import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

import {
    getPost,
    getFeedPosts,
    getTrendingPosts,
    getSearchedPosts,
    getProfilePosts,
    getCommunityPosts,
    getTagPosts,
    getProfile,
    getCommunity
} from '../api';
import {
    createFlashMessage,
    switchLoader
} from '../actions';
import PostsList from '../components/PostsList';
import NewPostButton from '../components/NewPostButton';
import PostsUpdatesButton from '../components/PostsUpdatesButton';
import EmptyContentMessage from '../components/EmptyContentMessage';

// eslint-disable-next-line
import Worker from 'worker-loader!./posts.worker.js';
const worker = new Worker();

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
            empty: false,
            posts: [],

            srcId: null,

            newPosts: []
        }
    }

    timer = null

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
        const { srcId, posts } = this.state
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
                if (!srcId) await this.getCommunityIdHandler(path[2])
                res = await getCommunityPosts({ communityId: this.state.srcId, page })
                break
            case 'post': res = await getPost(path[2])
                break
            default:
                if (!srcId) await this.getProfileIdHandler(path[1])
                res = await getProfilePosts({ userId: this.state.srcId, page })
        }
        switchLoader(false)
        if (!res) {
            this.setState({ hasMore: false });
            createMessage('Server error. Try later.')
            return
        }
        //  if single post mode enlarge posts arr and block further loading
        if (path[1] === 'post') {
            this.setState({
                posts: [res.data],
                hasMore: false
            });
        } else if (this.mounted) {
            // if there are no requested posts at all view empty page 
            if (res.data.count === '0') {
                this.setState({
                    hasMore: false,
                    empty: true
                })
            }
            if (res.data.posts.length) {
                // enlarge posts arr if there are
                this.setState({ posts: posts.concat(...res.data.posts) });
                // initiate posts autoupdate if feed mode
                if (path[1] === '' && page === 1) {
                    this.timer = setInterval(this.postsAutoUpdateHandler, 20000)
                }
            } else {
                // block loading if there are not posts left
                this.setState({ hasMore: false });
            }
            console.log(`page:${page}, ${this.state.posts.length} from ${res.data.count}`)
        }
    }

    postsAutoUpdateHandler = async () => {
        const lastPostDate = this.state.posts[0].created_at
        if (lastPostDate) {
            const res = await getFeedPosts(1);
            if (res && res.data.posts.length) {
                const newPosts = res.data.posts.filter(post =>
                    moment(post.created_at).isAfter(lastPostDate));
                this.setState({ newPosts })
            }
        }
    }

    addNewPostsHandler = async () => {
        const { posts, newPosts } = this.state
        this.setState({
            posts: [...newPosts, ...posts],
            newPosts: []
        })
        clearInterval(this.timer)
        this.timer = null
    }

    getCommunityIdHandler = async (communityName) => {
        const res = await getCommunity(communityName)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({
            srcId: res.data.id,
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
        this.setState({ srcId: res.data.id })
    }

    removePostHandler = (id) => {
        const posts = this.state.posts
        posts.forEach((t, i) => t.id === id && posts.splice(i, 1))
        this.setState({ posts })
    }

    componentDidMount() {
        const { path, switchLoader } = this.props
        this.mounted = true;
        switchLoader(true)
        console.log('posts are mounted:', path[1] || 'feed')
        this.getPostsHandler(1)

        // new posts worker
        if (path[1] === '') {
            worker.postMessage('start');
            worker.onmessage = mess => {
                const data = JSON.stringify(mess.data);
                console.log(data);
            }
            worker.addEventListener('error', e => console.log(e))
        }
    }

    componentWillUnmount() {
        this.setState({ hasMore: false })
        worker.terminate();
        clearInterval(this.timer)
        this.timer = null
        this.mounted = false;
    }


    render() {
        const {
            empty, srcId, communityName, communitySubscription, newPosts
        } = this.state
        const {
            isAuthenticated, username, userAvatar, isFeedMultiColumn, path
        } = this.props;
        return (
            <Fragment>
                {
                    newPosts.length > 0 &&
                    <PostsUpdatesButton
                        newPostsCnt={newPosts.length}
                        addNewPosts={this.addNewPostsHandler}
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
                            removePost={this.removePostHandler}
                        />
                }
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
                                    id: srcId,
                                    name: communityName
                                }
                        }
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