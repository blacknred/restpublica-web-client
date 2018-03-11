import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller'
import { GridList } from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';

import PostItem from './PostItem'
import ListRightPanel from './ListRightPanel'

const styles = {
    loader: {
        textAlign: 'center',
        display: 'block',
        width: '100%'
    }
}

const PostList = ({ mode, isFullAccess, isAuthenticated, empty, hasMore,
    posts, getPosts, emptyMessage }) => {
    return (
        <div className='container'>
            {
                empty ? emptyMessage() :
                    <div>
                        {
                            posts.length < 30 ? null : <ListRightPanel />
                        }
                        <InfiniteScroll
                            // key={reload}
                            // ref={(scroll) => { this.scroll = scroll; }}
                            pageStart={0}
                            initialLoad={true}
                            loadMore={getPosts}
                            hasMore={hasMore}
                            loader={<CircularProgress style={styles.loader} />}
                            useWindow={true}
                            threshold={500} >
                            <GridList
                                cellHeight={'auto'}
                                cols={6}
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
                            </GridList>
                        </InfiniteScroll>
                    </div>
            }
        </div>
    )
}

PostList.propTypes = {
    isFullAccess: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    empty: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    getPosts: PropTypes.func.isRequired,
    emptyMessage: PropTypes.func.isRequired
}

export default PostList