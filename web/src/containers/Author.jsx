import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    getProfile,
    updateUser,
    createUserSubscription,
    removeUserSubscription,
} from '../api'
import {
    updateLoggedUser,
    createFlashMessage,
    switchNotFound
} from '../actions'
import AuthorContent from '../components/AuthorContent';

class Author extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAvatarLoading: false,
            isBannerLoading: false
        };
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        userId: PropTypes.string,
        username: PropTypes.string,
        author: PropTypes.string.isRequired,
        switchNotFound: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired,
    }

    getUserDataHandler = async () => {
        const { author } = this.props
        const res = await getProfile(author)
        if (!res) {
            this.props.switchNotFound(true)
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({ ...res.data })
    }

    createSubscriptionHandler = async () => {
        const { id, username, followers_cnt } = this.state
        const { userId, createMessage } = this.props
        const data = {
            userId: id,
            data: { userId }
        }
        const res = await createUserSubscription(data)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        this.setState({
            followers_cnt: parseInt(followers_cnt, 10) + 1,
            my_subscription: parseInt(res.data, 10)
        })
        createMessage(`You are reading ${username} from now`)
    }

    removeSubscriptionHandler = async () => {
        const { id, username, my_subscription, followers_cnt } = this.state
        const { createMessage } = this.props
        const data = {
            userId: id,
            subscriptionId: my_subscription
        }
        const res = await removeUserSubscription(data)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        this.setState({
            followers_cnt: followers_cnt - 1,
            my_subscription: null
        })
        createMessage(`You are not reading ${username} from now`)
    }

    updateProfileImgHandler = async (event, target) => {
        event.preventDefault();
        let img = event.target.files[0];
        if (!img) return
        if (img.size > 2000000) {
            this.props.createMessage('Maximum size is 2 mB')
            return
        }
        this.setState({
            isAvatarLoading: target === 'avatar' ? true :
                this.state.isAvatarLoading,
            isBannerLoading: target === 'banner' ? true :
                this.state.isBannerLoading,
        })
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = async () => {
            img = reader.result.split(',')[1].trim();
            const updatedData = {
                option: target,
                value: img
            }
            const res = await updateUser(updatedData)
            this.setState({
                isAvatarLoading: target === 'avatar' ? false :
                    this.state.isAvatarLoading,
                isBannerLoading: target === 'banner' ? false :
                    this.state.isBannerLoading
            })
            if (!res) {
                this.props.createMessage('Server error. Try later.')
                return
            }
            this.setState({ ...res.data })
            if (target === 'avatar') this.props.update(res.data);
            this.props.createMessage(`${target} is updated`)
        }
    }

    componentDidMount() {
        console.log(`author page is mounted: ${this.props.author} `)
        this.getUserDataHandler();
    }

    render() {
        const { isAuthenticated, username, author } = this.props
        return (
            this.state.username ?
                <AuthorContent
                    {...this.state}
                    {...this.props}
                    isMine={isAuthenticated && username === author}
                    removeSubscription={this.removeSubscriptionHandler}
                    createSubscription={this.createSubscriptionHandler}
                    updateImg={this.updateProfileImgHandler}
                /> :
                <div />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        username: state.authentication.username,
        userId: state.authentication.id,
        author: ownProps.match.params.username
    }
}

const mapDispatchToProps = dispatch => ({
    update: (profileData) => dispatch(updateLoggedUser(profileData)),
    createMessage: (text) => dispatch(createFlashMessage(text)),
    switchNotFound: (mode) => dispatch(switchNotFound(mode)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Author))