/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { getDashboardPosts, getTrendingPosts, getSearchedPosts, getProfilePosts } from '../api'
import PostList from '../components/PostList'

class Posts extends Component {
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
        mode: PropTypes.oneOf(['dashboard', 'trending', 'search', 'u', 'me']),
        username: PropTypes.string.isRequired,
        query: PropTypes.string
    }
    getPostsHandler = async (page) => {
        let _res, res
        const { mode, query, username } = this.props 
        switch (mode) {
            case 'dashboard': _res = await getDashboardPosts({ page, filter: false })
            break
            case 'trending': _res = await getTrendingPosts({ page, filter: false })
            break
            case 'search': _res = await getSearchPosts({ query, page, filter: false })
            break
            default: _res = await getUserPosts({ username, page, filter: false });
        }
        res = _res.data.data
        if (!res) {
            this.setState({ hasMore: false });
            return
        }
        // if there are no requested posts at all view empty page 
        if (parseInt(res.count, 2) === 0) {
            this.setState({ empty: true, hasMore: false })
        }
        // enlarge posts arr if there are, block loading if there are not
        if (res.posts.length > 0) {
            this.setState({
                posts: this.state.posts.concat(res.posts)
            });
        } else {
            this.setState({ hasMore: false });
        }
        console.log(`Posts - page:${page}, count:${res.count}, length:${this.state.posts.length}`)
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
        console.log(`${this.props.mode} posts are mounted`)
    }

    render() {
        return <PostList
            mode={this.props.mode}
            isFullAccess={this.props.mode === 'me' ? true : false}
            isAuthenticated={this.props.isAuthenticated}
            {...this.state}
            getPosts={this.getPostsHandler}
            emptyMessage={this.emptyMessage}
        />
    }
}

const mapStateToProps = (state, ownProps) => ({
        isAuthenticated: state.authentication.isAuthenticated,
        mode: ownProps.location.pathname.split('/')[1],
        query: ownProps.match.params.query || '',
        username: ownProps.match.params.name || state.authentication.user.name,
})

export default withRouter(connect(mapStateToProps)(Posts))