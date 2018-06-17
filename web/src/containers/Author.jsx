import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    getProfile,
    createUserSubscription,
    removeUserSubscription,
} from '../api'
import {
    createFlashMessage,
    switchNotFound
} from '../actions'
import AuthorContent from '../components/AuthorContent';

class Author extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        switchNotFound: PropTypes.func.isRequired
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
    createMessage: (text) => dispatch(createFlashMessage(text)),
    switchNotFound: (mode) => dispatch(switchNotFound(mode)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Author))