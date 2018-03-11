/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { ListItem } from 'material-ui/List';

const Subscription = ({ subscription, removeSubscription, createSubscription }) => {
    return (
        <ListItem
            primaryText={
                <Link to={`/u/${subscription.username}`}>{subscription.username}</Link>
            }
            secondaryText={subscription.fullname}
            leftAvatar={
                <Link to={`/u/${subscription.username}`}>
                    <Avatar
                        src={`data:image/png;base64, ${subscription.avatar}`}
                        alt={subscription.username}
                    />
                </Link>
            }
            rightIconButton={
                subscription.my_subscription_id !== null ?
                    <FlatButton
                        secondary={true}
                        label='Unfollow'
                        onClick={() => {
                            removeSubscription(subscription.my_subscription_id, subscription.username)
                        }} />
                    :
                    <FlatButton
                        secondary={true}
                        label='Follow'
                        onClick={() => {
                            createSubscription(subscription.user_id, subscription.username)
                        }} />
            }
        />
    )
}

Subscription.propTypes = {
    subscription: PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        my_subscription_id: PropTypes.number
    }).isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default Subscription