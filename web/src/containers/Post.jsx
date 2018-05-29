import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    getPost,
    getPostComments,
    createPostComment,
    createPostLike,
    deletePostLike,
} from '../api'
import {
    createFlashMessage,
    switchLoader,
    switchNotFound
} from '../actions'
import PostItem from '../components/PostItem'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.post,
            listMode: true,
            hasMoreComments: true,
            showComments: false,
            showCommentForm: false,
            newComment: ''
        }
    }

    static propTypes = {
        post: PropTypes.object,
        slug: PropTypes.string,
        isAuthenticated: PropTypes.bool.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        userAvatar: PropTypes.string.isRequired,
        isAutoGifs: PropTypes.bool.isRequired,
        switchLoader: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        switchNotFound: PropTypes.func.isRequired
    }

    getPostHandler = async () => {
        this.props.switchLoader(true)
        const slug = this.props.slug
        const res = await getPost(slug)
        this.props.switchLoader(false)
        if (!res) {
            this.props.switchNotFound(true)
            return
        }
        this.setState({
            ...res.data,
            listMode: false,
            comments: [],
            hasMoreComments: true,
            showComments: true,
            showCommentForm: false,
            newComment: ''
        });
    }

    getPostCommentsHandler = async (page) => {
        const data = {
            postId: this.state.id,
            page
        }
        const res = await getPostComments(data)
        console.log('ddd', res.data)
        if (!res) {
            this.setState({ hasMoreComments: false })
            this.props.createMessage('Server error. Try later.')
            return
        }
        // if there are no comments left block further loading
        if (!res.data.comments.length) this.setState({ hasMoreComments: false })
        // enlarge post comments arr if there are
        this.setState({
            comments: [
                ...this.state.comments,
                ...res.data.comments
            ]
        });
        console.log(`${this.state.comments.length} from ${res.data.count}`)
    }

    formateDateHandler = dateObj => {
        let date = moment.parseZone(dateObj)
        let now = moment().parseZone()
        switch (true) {
            case (now.year() > date.year()):
                return (now.year() - date.year()) + ' year'
                break;
            case (now.month() > date.month()):
                return `${now.month() - date.month()} mon.`
                break;
            case (now.date() > date.date() + 7):
                return parseInt((now.date() - date.date()) / 7, 10) + ' w.'
                break;
            case (now.date() > date.date()):
                return `${now.date() - date.date()} d.`
                break;
            case (now.hour() > date.hour()):
                return `${now.hour() - date.hour()} h.`
                break;
            case (now.minute() > date.minute()):
                return `${now.minute() > date.minute()} min.`
                break;
            default:
                return `${date.secounds} sec.`
                break;
        }
    }





    togglePostCommentsHandler = () => {
        this.setState({ showComments: !this.state.showComments })
    }

    togglePostNewCommentFormHandler = () => {
        this.setState({
            newComment: '',
            showCommentForm: !this.state.showCommentForm
        })
    }

    changePostNewCommentHandler = (value) => {
        this.setState({ newComment: value })
    }

    addNewPostCommentHandler = async () => {
        const comment = this.state.newComment
        const data = {
            postId: this.state.id,
            body: { comment }
        }
        const res = await createPostComment(data)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        res.data.author = { 
            username: this.props.username,
            avatar: this.props.userAvatar
        }
        this.setState({
            newComment: '',
            showCommentForm: false,
            comments: [res.data, ...this.state.comments]
        })
        this.props.createMessage('New comment was published')
    }

    createPostLikeHandler = async () => {
        const userId = this.props.userId
        const data = {
            postId: this.state.id,
            body: { userId }
        }
        const res = await createPostLike(data)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({
            my_like_id: res.data.id,
            likes_cnt: ++this.state.likes_cnt
        })
        this.props.createMessage('You liked a post')
    }

    deletePostLikeHandler = async () => {
        const res = await deletePostLike(this.state.id)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({
            my_like_id: null,
            likes_cnt: --this.state.likes_cnt
        })
        this.props.createMessage('You deleted like from post')
    }



   

    updatePostHandler = async (e, child) => {
        console.log(e, child)
    }

    deletePostHandler = async (id) => {
        console.log(id)
    }

    componentDidMount() {
        console.log('post is mounted')
        !this.props.post && this.getPostHandler()
    }

    render() {
        return (
            this.state.author ?
                <PostItem
                    {...this.props}
                    post={this.state}
                    isFullAccess={this.props.isAuthenticated &&
                        this.state.author_id === this.props.userId}
                    getComments={this.getPostCommentsHandler}
                    toggleComments={this.togglePostCommentsHandler}
                    toggleNewCommentForm={this.togglePostNewCommentFormHandler}
                    changeNewComment={this.changePostNewCommentHandler}
                    postNewComment={this.addNewPostCommentHandler}
                    formateDate={this.formateDateHandler}
                    createLike={this.createPostLikeHandler}
                    deleteLike={this.deletePostLikeHandler}
                    updatePost={this.updatePostHandler}
                    deletePost={this.deletePostHandler}
                />
                : <div />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    post: ownProps.post || null,
    isAuthenticated: state.authentication.isAuthenticated,
    slug: ownProps.location.pathname.split('/')[2] || null,
    userId: state.authentication.id,
    username: state.authentication.username,
    userAvatar: state.authentication.avatar,
    isAutoGifs: state.uiSwitchers.isAutoGifs,
})

const mapDispatchToProps = dispatch => ({
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    switchNotFound: (mode) => dispatch(switchNotFound(mode)),
    createMessage: (text) => dispatch(createFlashMessage(text))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))