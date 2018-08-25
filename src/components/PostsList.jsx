import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroller2';

import Post from '../containers/Post';
import PostPreview from '../components/PostPreview';

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
    },
    gridColumn: {
        margin: '10px',
        backgroundClip: 'padding-box',
        '@media (max-width: 600px)': {
            margin: '0'
        },
    },
    newPostLink: {
        maxWidth: '530px',
        minWidth: '140px',
        margin: '10px',
        background: theme.palette.background.paper,
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.14)', //theme.shadows[1]
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
                    index={index}
                    key={index * 2}
                    post={post}
                /> :
                <Post
                    key={index}
                    post={post}
                />
        )
    )

    const masonryColsObj = {
        default: isPreview ? 4 : (isFeedMultiColumn ? 3 : 1),
        1400: isPreview ? 3 : (isFeedMultiColumn ? 2 : 1),
        1100: isPreview ? 2 : 1
    };

    return (
        <Fragment>
            {!isFeedMultiColumn && newPostLink}
            <InfiniteScroll
                pageStart={0}
                loadMore={getPosts}
                hasMore={hasMore}
                loader={loader}
            // ref={(scroll) => { this.scroll = scroll; }}
            // threshold={200}
            // key={reload}
            // initialLoad={false}
            // useWindow={false}
            >
                <Masonry
                    breakpointCols={masonryColsObj}
                    className={classes.grid}
                    columnClassName={classes.gridColumn}
                >
                    {postsArr}
                </Masonry>
            </InfiniteScroll>
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