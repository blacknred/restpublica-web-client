import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller2'

import Post from '../containers/Post'

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
        flexBasis: '100%',
        width: '100%',
        textAlign: 'center'
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        boxSizing: 'border-box'
    },
    newPostLink: {
        maxWidth: '530px',
        minWidth: '140px',
        background: theme.palette.background.paper,
        margin: '0.6em auto',
        boxShadow: theme.shadows[1]
    }
})

const PostList = ({
    mode, isFeedOneColumn, classes, hasMore, isPreview,
    posts, userAvatar, getPosts,
}) => {
    return (
        <div>
            {
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
            }

            <InfiniteScroll
                pageStart={0}
                loadMore={getPosts}
                hasMore={hasMore}
                loader={
                    <div
                        className={classes.loader}
                        key={'postsLoader'}>
                        {posts.length > 0 && <CircularProgress />}
                        <br />
                    </div>
                }
                className={classes.grid}
                style={{ flexDirection: isFeedOneColumn ? 'row' : 'column' }}
            // ref={(scroll) => { this.scroll = scroll; }}
            // threshold={200}
            // key={reload}
            // initialLoad={false}
            // useWindow={false}
            >
                {
                    posts.map((post, index) =>
                        isPreview ?
                            <div>{index}</div> :
                            <Post
                                key={index}
                                post={post}
                            />
                    )
                }
            </InfiniteScroll>

            {
                posts.length > 0 && mode === 'feed' &&
                <Button
                    color='primary'
                    component={Link}
                    to="/trending">
                    More posts
                    </Button>
            }
        </div >
    )
}

PostList.propTypes = {
    mode: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    hasMore: PropTypes.bool.isRequired,
    userAvatar: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    isPreview: PropTypes.bool.isRequired,
    isFeedOneColumn: PropTypes.bool.isRequired,
    getPosts: PropTypes.func.isRequired,
}

export default withStyles(styles)(PostList)