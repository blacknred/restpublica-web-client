/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';

import { getUserProfile, createUserSubscription, removeUserSubscription } from '../api'
import { setUserStats } from '../actions'
import AuthorContent from '../components/AuthorContent';
import AuthorTabs from '../components/AuthorTabs'

class Author extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: {
                id: null,
                username: null,
                fullname: null,
                description: null,
                avatar: null,
                mySubscriptionId: null
            },
            counts: {
                posts: 0,
                followers: 0,
                followin: 0
            }
        };
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        isMine: PropTypes.bool.isRequired,
        path: PropTypes.string.isRequired,
        isNightMode: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        stats: PropTypes.shape({
            posts: PropTypes.number.isRequired,
            followers: PropTypes.number.isRequired,
            followin: PropTypes.number.isRequired
        }).isRequired
    }
    getUserDataHandler = async () => {
        let _res, res
        const name = this.props.name
        _res = await getUserProfile(name)
        res = _res.data.data
        if (!res) return
        const counts = {
            posts: parseInt(res.posts_count, 10),
            followers: parseInt(res.followers_count, 10),
            followin: parseInt(res.followin_count, 10)
        }
        this.setState({
            author: {
                id: res.user_id,
                username: res.username,
                fullname: res.fullname,
                description: res.description,
                avatar: `data:image/png;base64, ${res.avatar}`,
                mySubscriptionId: res.my_subscription_id
            },
            counts
        })
        if (this.props.isMine) this.props.setUserStats(counts)
    }
    createSubscriptionHandler = async (id, name) => {
        let _res, res
        _res = await createUserSubscription(id)
        res = _res.data.data
        if (!res) return
        this.setState({
            author: {
                ...this.state.author,
                mySubscriptionId: parseInt(res, 10),
            },
            counts: {
                ...this.state.counts,
                followers: this.state.counts.followers + 1
            }
        })
    }
    removeSubscriptionHandler = async (id, name) => {
        let _res, res
        _res = await removeUserSubscription(id)
        res = _res.data.data
        if (!res && parseInt(res, 10) !== this.state.my_subscription_id) return
        this.setState({
            author: {
                ...this.state.author,
                mySubscriptionId: null,
            },
            counts: {
                ...this.state.counts,
                followers: this.state.counts.followers - 1
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isMine && nextProps.stats !== this.state.counts) {
            this.setState({ counts: nextProps.stats })
        }
    }
    componentDidMount() {
        console.log('authorpage is mounted')
        this.getUserDataHandler();
    }

    render() {
        const { path, isMine } = this.props
        return (
            !this.state.author.username ?
                <CircularProgress /> :
                <div>
                    <AuthorContent
                        {...this.state}
                        {...this.props}
                        removeSubscription={this.removeSubscriptionHandler}
                        createSubscription={this.createSubscriptionHandler}
                    />
                    <AuthorTabs
                        path={path}
                        showActivity={isMine ? true : false}
                    />
                </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        isMine: ownProps.match.params.username ? false : true,
        isNightMode: state.uiSwitchers.isNightMode,
        name: ownProps.match.params.username || state.authentication.user.name,
        stats: state.authentication.stats,
        path: ownProps.match.url.substring(0, ownProps.match.url.lastIndexOf('/'))
    }
}
const mapDispatchToProps = dispatch => ({
    setUserStats: (counts) => dispatch(setUserStats(counts))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Author))
