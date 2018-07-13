import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller2';

import Post from '../containers/Post'
import PostPreview from '../components/PostPreview'

import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    loader: {
        textAlign: 'center',
        padding: '2em',
        flexBasis: '100%'
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        boxSizing: 'border-box'
    },
    newPostLink: {
        maxWidth: '530px',
        minWidth: '140px',
        background: theme.palette.background.paper,
        margin: '0.6em auto',
        boxShadow: theme.shadows[1]
    },
    morePostsLink: {
        width: '100%',
        margin: '2em 0'
    },
})

const PostsList = ({
    mode, isFeedMultiColumn, classes, hasMore, isPreview, posts, userAvatar, getPosts,
}) => {

    const loader = (
        <div
            className={classes.loader}
            key='postsLoader'
        >
            {posts.length > 0 && <CircularProgress />}
        </div>
    )

    const newPostLink = (
        posts.length > 0 && mode === 'feed' &&
        <ListItem
            className={classes.newPostLink}
            component={Link}
            to={{
                pathname: '/post',
                state: {
                    modal: true,
                    from: 'up'
                }
            }}
        >
            <Avatar srcSet={`data:image/png;base64,${userAvatar}`} />
            <ListItemText secondary="What's up?" />
            <ListItemIcon>
                <PhotoCameraIcon />
            </ListItemIcon>
        </ListItem>
    )

    const morePostsLink = (
        posts.length > 0 && mode === 'feed' && !hasMore &&
        <Button
            className={classes.morePostsLink}
            color='primary'
            component={Link}
            to="/trending"
        >
            More posts
                    </Button>
    )

    const postsArr = (
        posts.map((post, index) =>
            isPreview ?
                <PostPreview
                    key={index * 2}
                    post={post}
                /> :
                <Post
                    key={index}
                    post={post}
                />
        )
    )

    return (
        <Fragment>
            {newPostLink}
            <Slide
                direction='up'
                in={posts.length > 0}
                timeout={400}
            >
                <InfiniteScroll
                    pageStart={0}
                    loadMore={getPosts}
                    hasMore={hasMore}
                    loader={loader}
                    className={classes.grid}
                    style={{
                        alignItems: isFeedMultiColumn ? 'flex-start' : 'center',
                        flexDirection: isPreview ? 'row' : isFeedMultiColumn ? 'row' : 'column'
                    }}
                // ref={(scroll) => { this.scroll = scroll; }}
                // threshold={200}
                // key={reload}
                // initialLoad={false}
                // useWindow={false}
                >

                    {postsArr}
                </InfiniteScroll>
            </Slide>
            {morePostsLink}
        </Fragment>
    )
}

PostsList.propTypes = {
    mode: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    hasMore: PropTypes.bool.isRequired,
    userAvatar: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    isPreview: PropTypes.bool.isRequired,
    isFeedMultiColumn: PropTypes.bool.isRequired,
    getPosts: PropTypes.func.isRequired,
}

export default withStyles(styles)(PostsList)