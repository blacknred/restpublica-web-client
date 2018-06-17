import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller2';

import CommunityPreview from './CommunityPreview';

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

const CommunitiesList = ({
    isAuthenticated, empty, hasMore, communities, getCommunities,
    createSubscription, removeSubscription, classes
}) => {

    const loader = (
        <div
            className={classes.loader}
            key={'postsLoader'}
        >
            {communities.length > 0 && <CircularProgress />}
        </div>
    )

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={getCommunities}
            hasMore={hasMore}
            loader={loader}
        >
            <GridList
                className={classes.grid}
                style={{ flexWrap: communities.length < 5 ? 'nowrap' : 'wrap' }}
            >
                {
                    communities.map((community, index) => (
                        <CommunityPreview
                            key={index}
                            community={community}
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

CommunitiesList.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    empty: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    communities: PropTypes.arrayOf(PropTypes.object).isRequired,
    getCommunities: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired,
    removeSubscription: PropTypes.func.isRequired,
}

export default withStyles(styles)(CommunitiesList)