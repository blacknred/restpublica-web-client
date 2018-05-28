import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

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
                    <Button
                        secondary={true}
                        label='Unfollow'
                        onClick={() => {
                            removeSubscription(subscription.my_subscription_id, subscription.username)
                        }} />
                    :
                    <Button
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