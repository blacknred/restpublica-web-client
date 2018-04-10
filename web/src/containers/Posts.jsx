import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import {
    getDashboardPosts, getTrendingPosts,
    getSearchedPosts, getProfilePosts
} from '../api'
import { createFlashMessage } from '../actions'
import PostList from '../components/PostList'

class Posts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            empty: false,
            hasMore: true,
            posts: []
        }
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        mode: PropTypes.oneOf(['dashboard', 'trending', 'search', 'u']),
        username: PropTypes.string.isRequired,
        query: PropTypes.string
    }
    getPostsHandler = async (page) => {
        const { mode, query, username } = this.props
        let res
        switch (mode) {
            case 'dashboard': res = await getDashboardPosts(page)
                break
            case 'trending': res = await getTrendingPosts(page)
                break
            case 'search': res = await getSearchedPosts(query, page)
                break
            default:
            // get userId
            // res = await getProfilePosts(userId, page);
            // communityPosts, tagPosts
        }
        if (!res.status) {
            this.setState({ hasMore: false });
            this.props.createMessage(res)
            return
        }
        // if there are no requested posts at all view empty page 
        if (parseInt(res.data.count, 10) === 0) {
            this.setState({ empty: true, hasMore: false })
        }
        // enlarge posts arr if there are, block loading if there are not
        if (res.data.posts.length > 0) {
            res.data.posts.forEach(post => {
                post.isExpanded = false;
                post.comments = []
            })
            this.setState({ posts: this.state.posts.concat(res.data.posts) });
        } else {
            this.setState({ hasMore: false });
        }
        console.log(`page:${page}, count:${res.data.count}, length:${this.state.posts.length}`)
    }
    expandPostHandler = (id) => {
        const posts = [...this.state.posts]
        posts.forEach(post => {
            if (post.id === id) post.isExpanded = !post.isExpanded
        })
        this.setState({ posts })
    }
    updatePostHandler = (e, child) => {
        console.log(e, child)
    }
    deletePostHandler = (id) => {
        console.log(id)
    }
    emptyMessage = () => {
        switch (this.props.mode) {
            case 'dashboard':
                return (
                    <p>
                        Seems like you have not any subscription yet.<br /><br />
                        Start now with <Link to='/trending'><b>Trending</b></Link>.
                        </p>
                );
            case 'trending':
                return (
                    <p>
                        Seems like there is no any post at all.<br /><br />
                        If you are a developer start with posts db populating :)
                        </p>
                );
            case 'search':
                return (
                    <p>
                        There is nothing found by your request
                        </p>
                );
            case 'me':
                return (
                    <p>
                        Seems like you have no posts yet.<br /><br />
                        Start now with
                            <Link to={{ pathname: '/post', state: { modal: true } }}>
                            <b>Create a post</b></Link>.
                        </p>
                );
            default:
                return (
                    <p>
                        There is no any post yet.
                        </p>
                );
        }
    }
    componentDidMount() {
        const { mode, username } = this.props
        console.log(`[${mode}, ${username}] posts are mounted`)
    }

    render() {
        return <PostList
            mode={this.props.mode}
            isFullAccess={this.props.mode === 'me' ? true : false}
            isAuthenticated={this.props.isAuthenticated}
            isAutoGifs={this.props.isAutoGifs}
            isFeedOneColumn={this.props.isFeedOneColumn}
            {...this.state}
            getPosts={this.getPostsHandler}
            expandPost={this.expandPostHandler}
            updatePost={this.updatePostHandler}
            deletePost={this.deletePostHandler}
            emptyMessage={this.emptyMessage}
        />
    }
}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    mode: ownProps.location.pathname.split('/')[1] || 'dashboard',
    query: ownProps.match.params.query || '',
    username: ownProps.match.params.name || state.authentication.username,
    isAutoGifs: state.uiSwitchers.isAutoGifs,
    isFeedOneColumn: state.uiSwitchers.isFeedOneColumn
})

const mapDispatchToProps = dispatch => ({
    createMessage: (text) => dispatch(createFlashMessage(text))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))