import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    getTrendingProfiles,
    getSearchedProfiles,
    getSubscriptionsProfiles,
    createUserSubscription,
    removeUserSubscription
} from '../api'
import {
    createFlashMessage,
    switchLoader
} from '../actions'
import AuthorsList from '../components/AuthorsList';
import PreviewList from '../components/PreviewList';
import EmptyContentMessage from '../components/EmptyContentMessage'

class Authors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.path[1],
            empty: false,
            hasMore: true,
            authors: []
        };
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        path: PropTypes.array.isRequired,
        userId: PropTypes.any,
    }

    getAuthorsHandler = async (page) => {
        let res
        const { mode, authors } = this.state
        const { path, userId, isPreview, switchLoader, createMessage } = this.props
        switch (mode) {
            case 'search': res = await getSearchedProfiles({ query: path[2], page })
                break
            case 'followers':
            case 'followin': res = await getSubscriptionsProfiles({ userId, mode, page })
                break
            default: res = await getTrendingProfiles(page)
        }
        switchLoader(false)
        if (!res) {
            this.setState({ hasMore: false });
            createMessage('Server error. Try later.')
            return
        }
        // if there are no requested authors at all view empty page 
        if (res.data.count === '0') {
            this.setState({
                hasMore: false,
                empty: true
            })
        }
        // enlarge authors arr if there are, block loading if there are not
        if (res.data.profiles.length) {
            this.setState({ authors: authors.concat(...res.data.profiles) });
            if (isPreview) this.setState({ hasMore: false });
        } else {
            this.setState({ hasMore: false });
        }
        console.log(`page:${page}, ${this.state.authors.length} from ${res.data.count}`)
    }

    createSubscriptionHandler = async ({ id, username }) => {
        const { authors } = this.state
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
        authors.forEach((author) => {
            if (author.id === id) {
                author.followers_cnt = parseInt(author.followers_cnt, 10) + 1
                author.my_subscription = parseInt(res.data, 10)
            }
        })
        this.setState({ authors })
        createMessage(`You are read ${username} from now`)
    }

    removeSubscriptionHandler = async ({ id, username }) => {
        const { authors } = this.state
        const { createMessage } = this.props
        const data = {
            userId: id,
            subscriptionId: authors.find(a => a.id === id).my_subscription
        }
        const res = await removeUserSubscription(data)
        if (!res) {
            createMessage('Server error. Try later.')
            return
        }
        authors.forEach((author) => {
            if (author.id === id) {
                author.followers_cnt = parseInt(author.followers_cnt, 10) - 1
                author.my_subscription = null
            }
        })
        this.setState({ authors })
        createMessage(`You are not read ${username} from now`)
    }

    componentDidMount() {
        const { isPreview, switchLoader } = this.props
        switchLoader(true)
        if (isPreview) this.getAuthorsHandler(1)
        console.log('authors are mounted:', this.state.mode)
    }

    componentWillUnmount() {
        this.setState({ hasMore: false })
    }

    render() {
        const { empty, authors, hasMore } = this.state
        const { isAuthenticated, path, isPreview } = this.props
        return (
            isPreview ?
                <PreviewList
                    mode='authors'
                    isAuthenticated={isAuthenticated}
                    datas={authors}
                    hasMore={hasMore}
                    path={path}
                    createSubscription={this.createSubscriptionHandler}
                    removeSubscription={this.removeSubscriptionHandler}
                /> :
                empty ?
                    <EmptyContentMessage mode={path[1]} /> :
                    <AuthorsList
                        {...this.state}
                        isAuthenticated={isAuthenticated}
                        getAuthors={this.getAuthorsHandler}
                        createSubscription={this.createSubscriptionHandler}
                        removeSubscription={this.removeSubscriptionHandler}
                    />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    path: ownProps.location.pathname.split('/'),
    userId: state.authentication.id,
})

const mapDispatchToProps = dispatch => ({
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    createMessage: (message) => dispatch(createFlashMessage(message))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authors))
