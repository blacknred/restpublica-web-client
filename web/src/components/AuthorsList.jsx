import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller'
import { List } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';

import AuthorsItem from './AuthorsItem';

const styles = {
    loader: {
        textAlign: 'center',
        display: 'block',
        width: '100%'
    }
}

const AuthorsList = ({ isAuthenticated, isNightMode, empty, hasMore, authors,
    getAuthors, removeSubscription, createSubscription, emptyMessage}) => {
    return (
        <div className='container'>
            {
                empty ? emptyMessage() :                    
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={true}
                        loadMore={getAuthors}
                        hasMore={hasMore}
                        loader={<CircularProgress style={styles.loader} />}
                        useWindow={true}
                        threshold={100} >
                        <List>
                            {
                                authors.map((author, index) => (
                                    <AuthorsItem
                                        key={author.user_id}
                                        author={author}
                                        isNightMode={isNightMode}
                                        isAuthenticated={isAuthenticated}
                                        removeSubscription={removeSubscription}
                                        createSubscription={createSubscription}
                                    />
                                ))
                            }
                        </List>
                    </InfiniteScroll>
            }
        </div>
    )
}

AuthorsList.propTypes = {
    isNightMode: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    empty: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAuthors: PropTypes.func.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired,
    emptyMessage: PropTypes.func.isRequired
}

export default AuthorsList