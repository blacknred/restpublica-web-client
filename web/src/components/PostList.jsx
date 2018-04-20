import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller'
import CircularProgress from 'material-ui/CircularProgress';
import NewPostButton from '../components/NewPostButton'
import { CSSTransitionGroup } from 'react-transition-group'
// import { GridList } from 'material-ui/GridList';
// import PostItem from './PostItem'
import PostItem2 from './PostItem2'
import ListRightPanel from './ListRightPanel'

const styles = {
    loader: {
        textAlign: 'center',
        display: 'block',
        width: '100%'
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
    isFeedOneColumn, toggleModalOpen }) => {
    const items = posts.map((post, index) =>
        mode === 'feed' && <PostItem2
            key={index}
            post={post}
            isFullAccess={isFullAccess}
            expandPost={expandPost}
            updatePost={updatePost}
            deletePost={deletePost}
            isAutoGifs={isAutoGifs}
        />)
    return (
        <span>
            {postable && <NewPostButton toggleModalOpen={toggleModalOpen} />}
            <div className='container'>

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
                            <CircularProgress key={798798} style={styles.loader} />
                            : null
                        }
                        threshold={400} >
                        <div style={styles.postsContainer}>
                            <CSSTransitionGroup
                                style={{ ...styles.postsGrid, flexDirection: isFeedOneColumn ? 'row' : 'column' }}
                                transitionName='fadeinup'
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={400} >
                                {items}
                            </CSSTransitionGroup>
                        </div>
                        {posts.length > 20 && <ListRightPanel />}

                        {/* <GridList
                                        cellHeight={'auto'}
                                        cols={1}
                                        padding={12}>
                                        {
                                            posts.map((post, index) =>
                                                <PostItem
                                                    key={index}
                                                    post={post}
                                                    index={index}
                                                    isFullAccess={isFullAccess}
                                                    isAuthenticated={isAuthenticated}
                                                />)
                                        }
                                    </GridList> */}
                    </InfiniteScroll>
                }
            </div>
        </span>
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
    toggleModalOpen: PropTypes.func.isRequired,
}

export default PostList