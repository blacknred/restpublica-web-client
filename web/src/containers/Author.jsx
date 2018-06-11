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
        loggedUserId: PropTypes.string.isRequired,
        loggedUsername: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        switchNotFound: PropTypes.func.isRequired
    }

    getUserDataHandler = async () => {
        const author = this.props.author
        const res = await getProfile(author)
        if (!res) {
            this.props.switchNotFound(true)
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({ ...res.data })
    }

    createSubscriptionHandler = async () => {
        const { loggedUserId } = this.props
        const data = {
            userId: this.state.id,
            data: { userId: loggedUserId }
        }
        const res = await createUserSubscription(data)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({
            followers_cnt: parseInt(this.state.followers_cnt, 10) + 1,
            my_subscription: parseInt(res.data, 10)
        })
    }

    removeSubscriptionHandler = async () => {
        const data = {
            userId: this.state.id,
            subscriptionId: this.state.my_subscription
        }
        const res = await removeUserSubscription(data)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        this.setState({
            followers_cnt: this.state.followers_cnt - 1,
            my_subscription: null
        })
    }

    componentDidMount() {
        console.log(`${this.props.author} page is mounted`)
        this.getUserDataHandler();
    }

    render() {
        const { isAuthenticated, loggedUsername, author } = this.props
        return (
            this.state.username ?
                <AuthorContent
                    {...this.state}
                    {...this.props}
                    isMine={isAuthenticated && loggedUsername === author}
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
        loggedUsername: state.authentication.username,
        loggedUserId: state.authentication.id,
        author: ownProps.match.params.username
        //author: ownProps.match.url.substring(0, ownProps.match.url.lastIndexOf('/'))
    }
}

const mapDispatchToProps = dispatch => ({
    createMessage: (text) => dispatch(createFlashMessage(text)),
    switchNotFound: (mode) => dispatch(switchNotFound(mode)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Author))
