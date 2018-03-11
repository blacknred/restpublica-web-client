/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { GridList } from 'material-ui/GridList';
import { ListItem } from 'material-ui/List';
import { grey100 } from 'material-ui/styles/colors';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationChevronRightIcon from 'material-ui/svg-icons/navigation/chevron-right';

import PostItem from './PostItem'

const AuthorsItem = ({ author, isNightMode, isAuthenticated, removeSubscription, createSubscription }) => {
    const styles = {
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        headerLeft: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        headerLeftUsername: {
            margin: '0 10px '
        },
        headerLeftFollowers: {
            margin: '0 10px ',
            color: '#aaa'
        },
        showMore: {
            background: isNightMode ?
                `linear-gradient(to left, rgb(48, 48, 48), rgba(48, 48, 48, 0.05))` :
                `linear-gradient(to left, ${grey100}, rgba(245, 245, 245, 0.05))`,
            right: '0px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '5px',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '150px'
        },
    }

    return (
        <ListItem disabled={true}>
            <div style={styles.header}>
                <Link to={`/u/${author.username}`}>
                    <div style={styles.headerLeft}>
                        <Avatar
                            src={`data:image/png;base64, ${author.avatar}`}
                            alt={author.username}
                        />
                        <h4 style={styles.headerLeftUsername}>
                            <b>{author.username}</b>
                        </h4>
                        <span>
                            {author.fullname}
                        </span>
                        <span style={styles.headerLeftFollowers}>
                            {author.followers_count} followers
                        </span>
                    </div>
                </Link>

                {
                    !isAuthenticated ? null :
                        author.my_subscription_id !== null ?
                            <FlatButton
                                secondary={true}
                                label='Unfollow'
                                onClick={() => {
                                    removeSubscription(author.my_subscription_id, author.username)
                                }} />
                            :
                            <FlatButton
                                secondary={true}
                                label='Follow'
                                onClick={() => {
                                    createSubscription(author.user_id, author.username)
                                }} />
                }
            </div>
            <br />
            <GridList
                style={{ position: 'relative' }}
                cellHeight={'auto'}
                cols={6}
                padding={12}>
                {
                    author.posts.posts.map((post, index) =>
                        <PostItem
                            key={index}
                            post={post}
                            index={index}
                            isFullAccess={false}
                            isAuthenticated={isAuthenticated}
                        />)
                }
                <div style={styles.showMore}>
                    <Link to={`/u/${author.username}/posts`}>
                        <FloatingActionButton
                            mini={true}
                            style={{ color: '#aaa' }}
                            backgroundColor={grey100}
                        //iconStyle={{color: 'red'}}
                        >
                            <NavigationChevronRightIcon />
                        </FloatingActionButton>
                    </Link>
                </div>
            </GridList>
        </ListItem>
    )
}

AuthorsItem.propTypes = {
    author: PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        my_subscription_id: PropTypes.number,
        posts: PropTypes.shape({
            count: PropTypes.string.isRequired,
            posts: PropTypes.arrayOf(PropTypes.object).isRequired
        }).isRequired
    }).isRequired,
    isNightMode: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default AuthorsItem