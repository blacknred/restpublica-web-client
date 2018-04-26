import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import {
    getDashboardPosts,
    getTrendingPosts,
    getSearchedPosts,
    getProfilePosts,
    getCommunityPosts,
    getTagPosts
} from '../api'
import {
    createFlashMessage,
    switchLoader
} from '../actions'
import PostList from '../components/PostList'
import EmptyPostsMessage from '../components/EmptyPostsMessage'

class Posts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
            posts: [],
            empty: false
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        mode: PropTypes.string.isRequired, //PropTypes.oneOf(['feed', 'trending', 'search']),
        specificator: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        query: PropTypes.string,
        switchLoader: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired
    }

    getPostsHandler = async (page) => {
        let res
        const { mode, specificator, query, username } = this.props
        page === 1 && this.props.switchLoader(true)
        switch (mode) {
            case 'feed': res = await getDashboardPosts(page)
                break
            case 'trending': res = await getTrendingPosts(page)
                break
            case 'search': res = await getSearchedPosts(query, page)
                break
            case 'community': res = await getCommunityPosts(specificator, page)
                break
            case 'tag': res = await getTagPosts(specificator, page)
                break
            case `${username}`: res = await getProfilePosts(username, page)
                break
            default: res = await getProfilePosts(mode, page);
        }
        page === 1 && this.props.switchLoader(false)
        if (!res.status) {
            this.setState({ hasMore: false });
            this.props.createMessage(res)
            return
        }
        // if there are no requested posts at all view empty page 
        if (res.data.count === '0') {
            this.setState({ hasMore: false, empty: true })
        }
        // enlarge posts arr if there are, block loading if there are not
        if (res.data.posts.length) {
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

    componentDidMount() {
        console.log(`[${this.props.mode}, ${this.props.username}] posts are mounted`)
    }

    render() {
        const {
            isAuthenticated, mode, username, isAutoGifs, isFeedOneColumn
        } = this.props;
        return (
            !this.state.empty ?
                <PostList
                    {...this.state}
                    mode={mode}
                    isAutoGifs={isAutoGifs}
                    isFeedOneColumn={isFeedOneColumn}
                    isFullAccess={isAuthenticated && mode === username}
                    getPosts={this.getPostsHandler}
                    expandPost={this.expandPostHandler}
                    updatePost={this.updatePostHandler}
                    deletePost={this.deletePostHandler}
                /> :
                <EmptyPostsMessage
                    mode={mode}
                    isProfileMode={isAuthenticated && mode === username}
                />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    mode: ownProps.location.pathname.split('/')[1] || 'feed',
    specificator: ownProps.location.pathname.split('/')[2] || '',
    query: ownProps.match.params.query || '',
    username: state.authentication.username,
    isAutoGifs: state.uiSwitchers.isAutoGifs,
    isFeedOneColumn: state.uiSwitchers.isFeedOneColumn
})

const mapDispatchToProps = dispatch => ({
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    createMessage: (text) => dispatch(createFlashMessage(text))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))