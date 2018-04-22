/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip';
import { grey300, grey400, grey600, grey900 } from 'material-ui/colors';

const styles = {
    userBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    left: {
        display: 'flex',
        width: '60%',
        justifyContent: 'space-between'
    },
    leftInfo: {
        width: '82%',
    },
    leftInfoHeader: {
        fontSize: '1.6em',
    },
    leftInfoChips: {
        display: 'flex'
    },
    leftInfoChip: {
        marginRight: '1em'
    },
    button: {
        opacity: '0.6'
    }
}

const AuthorContent = ({ author, counts, isAuthenticated, isMine,
    isNightMode, removeSubscription, createSubscription }) => {

    const userBlockButton = (
        !isAuthenticated ? null :
            isMine ?
                <Button
                    primary={true}
                    style={styles.button}
                    label={<Link to='/settings/profile'>Edit profile</Link>} />
                :
                author.mySubscriptionId ?
                    <Button
                        secondary={true}
                        style={styles.button}
                        label='Unfollow'
                        onClick={() => removeSubscription(author.mySubscriptionId, author.username)} />
                    :
                    <Button
                        primary={true}
                        style={styles.button}
                        label='Follow'
                        onClick={() => createSubscription(author.id, author.username)} />
    );

    return (
        <div className='container'>
            <div style={styles.userBlock}>
                <div style={styles.left}>
                    <Avatar
                        size={90}
                        src={author.avatar}
                        alt={author.username}
                    />
                    <section style={
                        Object.assign({}, styles.leftInfo,
                            { color: isNightMode ? grey400 : grey600 })}>
                        <strong style={
                            Object.assign({}, styles.leftInfoHeader,
                                { color: isNightMode ? grey300 : grey900 })}>
                            {author.fullname}
                            <small><small>{' @' + author.username}</small></small>
                            <br /><br />
                        </strong>
                        <div style={styles.leftInfoChips}>
                            <Chip style={styles.leftInfoChip}>
                                Posts: {counts.posts}
                            </Chip>
                            <Chip style={styles.leftInfoChip}>
                                Followers: {counts.followers}
                            </Chip>
                            <Chip style={styles.leftInfoChip}>
                                Followin: {counts.followin}
                            </Chip>
                        </div>
                        <br />
                        {author.description}
                    </section>
                </div>
                <div>
                    {userBlockButton}
                </div>
            </div>
        </div>
    );
}

AuthorContent.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        mySubscriptionId: PropTypes.number
    }).isRequired,
    counts: PropTypes.shape({
        posts: PropTypes.number.isRequired,
        followers: PropTypes.number.isRequired,
        followin: PropTypes.number.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isMine: PropTypes.bool.isRequired,
    isNightMode: PropTypes.bool.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default AuthorContent;