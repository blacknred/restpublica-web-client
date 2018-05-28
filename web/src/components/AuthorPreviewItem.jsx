import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import GridTile from '@material-ui/core/GridList';

const styles = {
    tile: {
        textAlign: 'center',
        width: '100%',
        minWidth: '200px',
        backgroundColor: 'rgba(225, 225, 225, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}

const AuthorPreviewItem = ({ author, isSubscriptionAllowed, removeSubscription, createSubscription }) => {
    return (
        <GridTile style={styles.tile}>
            <Link to={`/u/${author.username}/posts`}>
                <div>
                    <Avatar
                        src={`data:image/png;base64, ${author.avatar}`}
                        size={70}
                        alt={author.username}
                    />
                    <br /><br />
                    <div>
                        <b>{author.username}</b> <br />
                        {author.fullname}
                    </div>
                </div>
            </Link>
            {
                !isSubscriptionAllowed ? null :
                    author.my_subscription_id !== null ?
                        <Button
                            secondary={true}
                            label='Unfollow'
                            onClick={() => {
                                removeSubscription(author.my_subscription_id, author.username)
                            }} />
                        :
                        <Button
                            secondary={true}
                            label='Follow'
                            onClick={() => {
                                createSubscription(author.user_id, author.username)
                            }} />
            }
        </GridTile>
    )
}

AuthorPreviewItem.propTypes = {
    author: PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        my_subscription_id: PropTypes.number
    }).isRequired,
    isSubscriptionAllowed: PropTypes.bool.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default AuthorPreviewItem