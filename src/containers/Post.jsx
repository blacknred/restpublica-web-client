import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    getPost,
    updatePost,
    deletePost,
    getPostComments,
    createPostComment,
    deletePostComment,
    createPostLike,
    getPostLikes,
    deletePostLike,
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

    getPostHandler = async () => {
        const { path, switchLoader, switchNotFound } = this.props
        switchLoader(true)
        const slug = path[2]
        const res = await getPost(slug)
        switchLoader(false)
        if (!res) {
            switchNotFound(true)
            return
        }
        this.setState({
            ...res.data,
            newDescription: res.data.description
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
        const output = moment(dateObj, "YYYY-MM-DD hh:mm:ss").fromNow(true)
        const outputArr = output.split(' ')
        switch (outputArr[1]) {
            case 'secounds': return outputArr[0] + ' sec';
            case 'minutes': return outputArr[0] + ' min';
            case 'hours': return outputArr[0] + ' h';
            case 'days': return outputArr[0] + ' d';
            case 'months': return outputArr[0] + ' mon';
            case 'years': return outputArr[0] + ' y';
            default: return output
        }
    }





    togglePostValueHandler = (target) => {
        this.setState({ [target]: !this.state[target] })
    }





    changePostDescriptionHandler = (value) => {
        this.setState({ newDescription: value })
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
            data: { userId }
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

    updatePostHandler = async (option, value) => {
        const data = {
            postId: this.state.id,
            data: {
                option,
                value
            }
        }
        this.setState({ [option]: value })
        const res = await updatePost(data)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.props.createMessage('Post updated')
    }

    deletePostHandler = async () => {
        const res = await deletePost(this.state.id)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        if (res.data.filesToDelete) {
            Promise.all(res.data.filesToDelete
                .map(file => deleteFileFromStorage(file)))
        }
        this.setState({ id: null })
        this.props.createMessage('Post deleted')
    }

    createPostVoteHandler = async (optionId) => {
        const userId = this.props.userId
        const data = {
            postId: this.state.id,
            data: { optionId, userId }
        }
        const res = await createPostVote(data)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        const content = this.state.content;

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
        this.setState({ content: content })
        this.props.createMessage('You voted a post')
    }

    deletePostVoteHandler = async (optionId) => {
        const data = {
            postId: this.state.id,
            optionId
        }
        const res = await deletePostVote(data)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        const content = this.state.content;
        content.forEach((ans) => {
            if (ans.id === optionId) {
                ans.my_vote = null
                --ans.count;
            }
        })
        this.setState({ content: content })
        this.props.createMessage('You deleted vote from post')
    }

    componentDidMount() {
        console.log('post is mounted')
        !this.props.post && this.getPostHandler()
    }

    render() {
        return (
            (this.state.id && !this.state.archived) ?
                <PostContent
                    {...this.props}
                    post={this.state}
                    isFullAccess={
                        this.props.isAuthenticated &&
                        (this.state.author_id == this.props.userId)
                    }
                    searchQuery={this.props.path[1] === 'search' ? this.props.path[2] : ''}
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
                /> :
                <div />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    post: ownProps.post || null,
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