import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    updatePost,
    deletePost,
    getPostComments,
    createPostComment,
    createPostLike,
    deletePostLike,
    deletePostComment,
    getPostLikes,
    getPostVotes,
    createPostVote,
    deletePostVote,
    deleteFileFromStorage
} from '../api'
import {
    createFlashMessage,
    switchLoader,
    switchNotFound
} from '../actions'
import PostContent from '../components/PostContent'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.post,
            isOptionsMenuOpen: false,
            isEditingModeOn: false,
            listMode: true,
            hasMoreComments: true,
            showComments: false,
            showCommentForm: false,
            newComment: '',
            newDescription: this.props.post && this.props.post.description || ''
        }
    }

    static propTypes = {
        post: PropTypes.object,
        removePost: PropTypes.func.isRequired,
        path: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        userId: PropTypes.any,
        username: PropTypes.string,
        userAvatar: PropTypes.string,
        isAutoGifs: PropTypes.bool.isRequired,
        switchLoader: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        switchNotFound: PropTypes.func.isRequired
    }

    getPostCommentsHandler = async (page) => {
        const { id, comments } = this.state
        const { createMessage } = this.props
        const data = {
            postId: id,
            page
        }
        const res = await getPostComments(data)
        console.log('ddd', res.data)
        if (!res) {
            this.setState({ hasMoreComments: false })
            createMessage('Server error. Try later.')
            return
        }
        // if there are no comments left block further loading
        if (!res.data.comments.length) this.setState({ hasMoreComments: false })
        // enlarge post comments arr if there are
        this.setState({
            comments: [
                ...comments,
                ...res.data.comments
            ]
        });
        console.log(`${this.state.comments.length} from ${res.data.count}`)
    }

    formateDateHandler = dateObj => {
        const output = moment(dateObj, "YYYY-MM-DD hh:mm:ss").fromNow(true)
        const outputArr = output.split(' ')
        switch (outputArr[1]) {
            case 'secounds': return outputArr[0] + ' sec';
            case 'minutes': return outputArr[0] + ' min';
            case 'hours': return outputArr[0] + ' h';
            case 'days': return outputArr[0] + ' d';
            case 'months':
            case 'month': return outputArr[0] + ' mon';
            case 'years': return outputArr[0] + ' y';
            default: return output
        }
    }





    togglePostValueHandler = (target) => {
        this.setState({ [target]: !this.state[target] })
    }

    togglePostNewCommentFormHandler = () => {
        this.setState({
            newComment: '',
            showCommentForm: !this.state.showCommentForm
        })
    }

    changePostDescriptionHandler = (value) => {
        this.setState({ newDescription: value })
    }

    changePostNewCommentHandler = (value) => {
        this.setState({ newComment: value })
    }

    addNewPostCommentHandler = async () => {
        const { newComment, comments } = this.state
        const { username, userAvatar, createMessage } = this.props
        const data = {
            postId: this.state.id,
            body: { comment: newComment }
        }
        const res = await createPostComment(data)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        res.data.author = {
            username,
            avatar: userAvatar
        }
        this.setState({
            newComment: '',
            showCommentForm: false,
            comments: [res.data, ...comments]
        })
        createMessage('New comment was published')
    }

    createPostLikeHandler = async () => {
        const { id, likes_cnt } = this.state
        const { userId, createMessage } = this.props
        const data = {
            postId: id,
            data: { userId }
        }
        const res = await createPostLike(data)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        this.setState({
            my_like_id: res.data.id,
            likes_cnt: parseInt(likes_cnt, 10) + 1
        })
        createMessage('You liked a post')
    }

    deletePostLikeHandler = async () => {
        const { id, likes_cnt } = this.state
        const { createMessage } = this.props
        const res = await deletePostLike(id)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        this.setState({
            my_like_id: null,
            likes_cnt: parseInt(likes_cnt, 10) - 1
        })
        createMessage('You deleted like from post')
    }

    updatePostHandler = async (option, value) => {
        const { id } = this.state
        const { path, createMessage } = this.props
        const data = {
            postId: id,
            data: {
                option,
                value
            }
        }
        this.setState({ [option]: value })
        const res = await updatePost(data)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        if ((path[1] === '' ||
            path[1] === 'search' ||
            path[1] === 'tags' ||
            path[1] === 'communites') &&
            option === 'archived') {
            this.setState({ id: null })
        }
        createMessage('Post updated')
    }

    deletePostHandler = async () => {
        const { id } = this.state
        const { removePost, createMessage } = this.props
        const res = await deletePost(id)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        if (res.data.filesToDelete) {
            Promise.all(res.data.filesToDelete
                .map(file => deleteFileFromStorage(file)))
        }
        removePost(id)
        createMessage('Post deleted')
    }

    createPostVoteHandler = async (optionId) => {
        const { id, content } = this.state
        const { userId, createMessage } = this.props
        const data = {
            postId: id,
            data: { optionId, userId }
        }
        const res = await createPostVote(data)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        if (content.every(ans => !ans.my_vote)) {
            content.forEach((ans) => {
                if (ans.id === optionId)++ans.count;
            })
        }
        content.forEach((ans) => {
            ans.my_vote = null
            if (ans.id === optionId) {
                ans.my_vote = res.data.id
            }
        })
        this.setState({ content })
        createMessage('You voted a post')
    }

    deletePostVoteHandler = async (optionId) => {
        const { id, content } = this.state
        const { createMessage } = this.props
        const data = {
            postId: id,
            optionId
        }
        const res = await deletePostVote(data)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        content.forEach((ans) => {
            if (ans.id === optionId) {
                ans.my_vote = null
                --ans.count;
            }
        })
        this.setState({ content })
        createMessage('You deleted vote from post')
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.post && (nextProps.post.id !== this.props.post.id)) {
            this.setState({ ...nextProps.post })
        }
    }

    render() {
        const { path, isAuthenticated, userId, userAvatar } = this.props
        const { author_id } = this.state
        return (
            <PostContent
                post={this.state}
                userAvatar={userAvatar}
                isFullAccess={isAuthenticated && (author_id == userId)}
                searchQuery={path[1] === 'search' ? path[2] : ''}
                getComments={this.getPostCommentsHandler}
                togglePostValue={this.togglePostValueHandler}
                changePostDescription={this.changePostDescriptionHandler}
                toggleNewCommentForm={this.togglePostNewCommentFormHandler}
                changeNewComment={this.changePostNewCommentHandler}
                postNewComment={this.addNewPostCommentHandler}
                formateDate={this.formateDateHandler}
                createLike={this.createPostLikeHandler}
                deleteLike={this.deletePostLikeHandler}
                createVote={this.createPostVoteHandler}
                deleteVote={this.deletePostVoteHandler}
                updatePost={this.updatePostHandler}
                deletePost={this.deletePostHandler}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    post: ownProps.post || null,
    removePost: ownProps.removePost,
    isAuthenticated: state.authentication.isAuthenticated,
    path: ownProps.location.pathname.split('/'),
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