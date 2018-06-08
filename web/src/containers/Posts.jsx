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
            empty: false,
            posts: [],
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        mode: PropTypes.string.isRequired, //PropTypes.oneOf(['feed', 'trending', 'search']),
        specificator: PropTypes.string.isRequired,
        userId: PropTypes.any.isRequired,
        username: PropTypes.string.isRequired,
        userAvatar: PropTypes.string.isRequired,
        query: PropTypes.string,
        switchLoader: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired
    }

    getPostsHandler = async (page) => {
        let res
        const { mode, specificator, query, username, userId } = this.props
        this.props.switchLoader(true)
        switch (mode) {
            case 'feed': res = await getFeedPosts(page)
                break
            case 'trending': res = await getTrendingPosts(page)
                break
            case 'search': res = await getSearchedPosts(query, page)
                break
            case 'community': res = await getCommunityPosts(specificator, page)
                break
            case 'tag': res = await getTagPosts(specificator, page)
                break
            case `${username}`: res = await getProfilePosts({ userId, page })
                break
            default: res = await getProfilePosts({ userId, page });
        }
        this.props.switchLoader(false)
        if (!res) {
            this.setState({ hasMore: false });
            this.props.createMessage('Server error. Try later.')
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
            const posts = await this.state.posts.concat(...res.data.posts)
            this.setState({ posts });
        } else {
            this.setState({ hasMore: false });
        }
        console.log(`page:${page}, ${this.state.posts.length} from ${res.data.count}`)
    }

    componentDidMount() {
        const { mode, username } = this.props
        console.log('posts are mounted:', mode)
    }

    render() {
        const { isAuthenticated, mode, username, isFeedMultiColumn } = this.props;
        return (
            !this.state.empty ?
                <PostList
                    {...this.state}
                    mode={mode}
                    userAvatar={this.props.userAvatar}
                    isPreview={mode === 'trending'}
                    isFeedMultiColumn={isFeedMultiColumn}
                    getPosts={this.getPostsHandler}
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
    userAvatar: state.authentication.avatar,
    mode: ownProps.location.pathname.split('/')[1] || 'feed',
    specificator: ownProps.location.pathname.split('/')[2] || '',
    query: ownProps.match.params.query || '',
    username: state.authentication.username,
    userId: state.authentication.id,
    isFeedMultiColumn: state.uiSwitchers.isFeedMultiColumn
})

const mapDispatchToProps = dispatch => ({
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    createMessage: (text) => dispatch(createFlashMessage(text))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))