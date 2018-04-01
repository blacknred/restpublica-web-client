/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getUserSubscriptions, createUserSubscription, removeUserSubscription } from '../api'
import { createFlashMessage, increaseUserStats, decreaseUserStats } from '../actions'
import SubscriptionList from '../components/SubscriptionList'

class Subscriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            empty: false,
            hasMore: true,
            subscriptions: []
        };
    }
    static propTypes = {
        mode: PropTypes.oneOf(['followers', 'followin']),
        name: PropTypes.string.isRequired
    }
    getSubscriptions = async (page) => {
        let _res, res
        if (this.state.userId === null) {
            _res = await getUserId(this.props.name)
            res = _res.data.data
            if (!res) {
                this.setState({ hasMore: false });
                return
            }
            this.setState({ userId: res })
        }
        _res = await getSubscriptions({ mode: this.props.mode, id: this.state.userId, page })
        res = _res.data.data
        if (!res) {
            this.setState({ hasMore: false });
            return
        }
        // if there are no requested subscriptions at all view empty page 
        if (parseInt(res.count, 10) === 0) {
            this.setState({ empty: true, hasMore: false })
        }
        // enlarge subscriptions arr if there are, block loading if there are not
        if (res.subscriptions.length > 0) {
            this.setState({
                subscriptions: this.state.subscriptions.concat(res.subscriptions)
            })
        } else {
            this.setState({ hasMore: false });
        }
        console.log(`Subscriptions - page:${page}, count:${res.count}, length:${this.state.subscriptions.length}`)
    }
    createSubscriptionHandler = async (id, name) => {
        let _res, res, subscriptions
        _res = await createSubscription(id, name)
        res = _res.data.data
        if (!res) return
        subscriptions = this.state.subscriptions
        subscriptions.forEach((sub) => {
            if (sub.user_id === id) sub.my_subscription_id = res
        })
        this.setState({ subscriptions })
        this.props.increaseUserStats()
        this.props.createFlashMessage(`You are reading ${name} from now`)
    }
    removeSubscriptionHandler = async (id, name) => {
        let _res, res, subscriptions
        _res = await removeSubscription(id, name)
        res = _res.data.data
        if (!res) return
        subscriptions = this.state.subscriptions
        subscriptions.forEach((sub) => {
            if (sub.my_subscription_id === id) sub.my_subscription_id = null
        })
        this.setState({ subscriptions })
        this.props.decreaseUserStats()
        this.props.createFlashMessage(`You are not reading ${name} from now`)
    }
    componentDidMount() {
        console.log('subscriptions are mounted')
    }
    render() {
        return <SubscriptionList
            {...this.state}
            mode={this.props.mode}
            getSubscriptions={this.getSubscriptions}
            removeSubscription={this.removeSubscriptionHandler}
            createSubscription={this.createSubscriptionHandler}
        />
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        name: ownProps.match.params.username || state.authentication.user.name,
        mode: ownProps.match.params.mode
    }
}
const mapDispatchToProps = dispatch => ({
    createFlashMessage: (message) => dispatch(createFlashMessage(message)),
    increaseUserStats: () => dispatch(increaseUserStats()),
    decreaseUserStats: () => dispatch(decreaseUserStats())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscriptions))