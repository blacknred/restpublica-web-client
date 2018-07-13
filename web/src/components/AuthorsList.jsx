import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller2';

import AuthorPreview from './AuthorPreview';

import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    loader: {
        textAlign: 'center',
        padding: '2em',
        flexBasis: '100%'
    },
    grid: {
        maxWidth: '1100px',
        justifyContent: 'center'
    }
}

const AuthorsList = ({
    isAuthenticated, hasMore, authors, getAuthors,
    createSubscription, removeSubscription, classes
}) => {

    const loader = (
        <div
            className={classes.loader}
            key={'postsLoader'}
        >
            {authors.length > 0 && <CircularProgress />}
        </div>
    )

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={getAuthors}
            hasMore={hasMore}
            loader={loader}
        >
            <GridList className={classes.grid}
                //style={{ flexWrap: authors.length < 5 ? 'nowrap' : 'wrap' }}
            >
                {
                    authors.map((author, index) => (
                        <AuthorPreview
                            key={index}
                            author={author}
                            isAuthenticated={isAuthenticated}
                            removeSubscription={removeSubscription}
                            createSubscription={createSubscription}
                        />
                    ))
                }
            </GridList>
        </InfiniteScroll>
    )
}

AuthorsList.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAuthors: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired,
    removeSubscription: PropTypes.func.isRequired,
}

export default withStyles(styles)(AuthorsList)