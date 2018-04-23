import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller'

// import PostItem from './PostItem'
import PostItem from './PostItem2'
import ListRightPanel from './ListRightPanel'
import NewPostButton from '../components/NewPostButton'
import CircularProgress from 'material-ui/Progress/CircularProgress';

const styles = {
    loader: {
        textAlign: 'center',
        display: 'block',
        //width: '100%'
    },
    postsContainer: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    postsGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        boxSizing: 'border-box'
    }
}

const PostList = ({ mode, postable, isFullAccess, empty, hasMore, deletePost,
    expandPost, updatePost, posts, getPosts, emptyMessage, isAutoGifs,
    isFeedOneColumn }) => {
    const items = posts.map((post, index) =>
        mode === 'feed' ?
            <PostItem
                key={index}
                post={post}
                isFullAccess={isFullAccess}
                expandPost={expandPost}
                updatePost={updatePost}
                deletePost={deletePost}
                isAutoGifs={isAutoGifs}
            /> :
            // <PostItem
            //     key={index}
            //     post={post}
            //     index={index}
            //     isFullAccess={isFullAccess}
            //     isAuthenticated={isAuthenticated}
            // />)
            < div > {index}</div>
    )
    return (
        <div >
            {postable && <NewPostButton />}
            {empty && emptyMessage()}
            {
                !empty && 
                    <InfiniteScroll
                        // key={reload}
                        // ref={(scroll) => { this.scroll = scroll; }}
                        pageStart={0}
                        initialLoad={true}
                        loadMore={getPosts}
                        hasMore={hasMore}
                        loader={
                            posts.length ?
                                <CircularProgress
                                    key={'loader'}
                                    style={styles.loader} />
                                : null
                        }
                        threshold={400}
                    >
                        <div style={styles.postsContainer}>
                            <div style={{ ...styles.postsGrid, flexDirection: isFeedOneColumn ? 'row' : 'column' }} >
                                {items}
                            </div>
                            {posts.length > 20 && <ListRightPanel />}
                        </div>
                    </InfiniteScroll>
            }
        </div>
    )
}

PostList.propTypes = {
    isFullAccess: PropTypes.bool.isRequired,
    isAutoGifs: PropTypes.bool.isRequired,
    isFeedOneColumn: PropTypes.bool.isRequired,
    empty: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    getPosts: PropTypes.func.isRequired,
    expandPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    emptyMessage: PropTypes.func.isRequired,
}

export default PostList