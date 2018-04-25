import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller2'

import PostItem from './PostItem'
import { withStyles } from 'material-ui/styles';
import CircularProgress from 'material-ui/Progress/CircularProgress';

const styles = {
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
    }
}

const PostList = ({
    mode, isFullAccess, isAutoGifs, isFeedOneColumn, classes, hasMore, posts,
    getPosts, expandPost, updatePost, deletePost,
}) => {

    const loader = (
        <div
            className={classes.loader}
            key={'loader'}>
            <CircularProgress />
            <br />
        </div>
    )

    const items = posts.map((post, index) =>
        mode === 'trending' ?
            <div> {index}</div> :
            <PostItem
                key={index}
                post={post}
                isFullAccess={isFullAccess}
                isAutoGifs={isAutoGifs}
                expandPost={expandPost}
                updatePost={updatePost}
                deletePost={deletePost}
            />
    )

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={getPosts}
            hasMore={hasMore}
            loader={loader}
            className={classes.grid}
            style={{ flexDirection: isFeedOneColumn ? 'row' : 'column' }}
            // ref={(scroll) => { this.scroll = scroll; }}
            // threshold={200}
            // key={reload}
            // initialLoad={false}
            // useWindow={false}
        >
            {items}
        </InfiniteScroll>
    )
}

PostList.propTypes = {
    isFullAccess: PropTypes.bool.isRequired,
    isAutoGifs: PropTypes.bool.isRequired,
    isFeedOneColumn: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    getPosts: PropTypes.func.isRequired,
    expandPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostList)