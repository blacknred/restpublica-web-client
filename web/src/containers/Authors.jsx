import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    getTrendingProfiles, 
    getSearchedProfiles,
    createUserSubscription, 
    removeUserSubscription
} from '../api'
import { createFlashMessage } from '../actions'
import AuthorsList from '../components/AuthorsList';

class Authors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            empty: false,
            hasMore: true,
            authors: []
        };
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        isNightMode: PropTypes.bool.isRequired,
        mode: PropTypes.oneOf(['trending', 'search']),
        query: PropTypes.string
    }
    getAuthorsHandler = async (page) => {
        let _res, res
        const { mode, query } = this.props
        switch (mode) {
            case 'trending': _res = await getTrendingProfiles({ page, filter: false })
                break
            case 'search': _res = await getSearchedProfiles({ query, page, filter: false })
                break
            default: ;
        }
        res = _res.data.data
        if (!res) {
            this.setState({ hasMore: false });
            return
        }
        // if there are no requested authors at all view empty page 
        if (parseInt(res.count, 10) === 0) {
            this.setState({ empty: true, hasMore: false })
        }
        // enlarge authors arr if there are, block loading if there are not
        if (res.users.length > 0) {
            this.setState({
                authors: this.state.authors.concat(res.users)
            })
        } else {
            this.setState({ hasMore: false });
        }
        console.log(`Authors - page:${page}, count:${res.count}, length:${this.state.authors.length}`)
    }
    createSubscriptionHandler = async (id, name) => {
        let _res, res, authors
        _res = await createUserSubscription(id)
        res = _res.data.data
        if (!res) return
        authors = this.state.authors
        authors.forEach((u) => {
            if (u.user_id === id) u.my_subscription_id = res
        })
        this.setState({ authors })
        this.props.createFlashMessage(`You are reading ${name} from now`)
    }
    removeSubscriptionHandler = async (id, name) => {
        let _res, res, authors
        _res = await removeUserSubscription(id)
        res = _res.data.data
        if (!res) return
        authors = this.state.authors
        authors.forEach((u) => {
            if (u.my_subscription_id === id) u.my_subscription_id = null
        })
        this.setState({ authors })
        this.props.createFlashMessage(`You are not reading ${name} from now`)
    }
    emptyMessage = () => {
        switch (this.props.mode) {
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
            default:
                return (
                    <p>
                        There is no any post yet.
                        </p>
                );
        }
    }
    componentDidMount() {
        console.log('authors are mounted')
    }

    render() {
        return (
            <AuthorsList
                {...this.state}
                {...this.props}
                getAuthors={this.getAuthorsHandler}
                removeSubscription={this.removeSubscriptionHandler}
                createSubscription={this.createSubscriptionHandler}
                emptyMessage={this.emptyMessage}
            />
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    isNightMode: state.uiSwitchers.isNightMode,
    mode: ownProps.location.pathname.split('/')[1],
    query: ownProps.match.params.query || ''
})
const mapDispatchToProps = dispatch => ({
    createFlashMessage: (message) => dispatch(createFlashMessage(message))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authors))
