import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller'
import { GridList } from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';

import AuthorPreviewItem from './AuthorPreviewItem';

const styles = {
    loader: {
        textAlign: 'center',
        display: 'block',
        width: '100%'
    }
}

const SubscriptionList = ({ mode, empty, hasMore, subscriptions,
    getSubscriptions, removeSubscription, createSubscription }) => {
    return (
        <div className='container'>
            {
                empty ?
                    <p style={styles.loader}> <br />There are no {mode}.</p> :
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={true}
                        loadMore={getSubscriptions}
                        hasMore={hasMore}
                        loader={<CircularProgress style={styles.loader} />}
                        useWindow={true}
                        threshold={100} >
                        <GridList
                            cellHeight={190}
                            cols={6}
                            padding={12}>{
                                subscriptions.map((sub, index) => (
                                    <AuthorPreviewItem
                                        key={sub.user_id}
                                        author={sub}
                                        isSubscriptionAllowed={true}
                                        removeSubscription={removeSubscription}
                                        createSubscription={createSubscription}
                                    />
                                ))
                            }
                        </GridList>
                    </InfiniteScroll>
            }
        </div>
    )
}

SubscriptionList.propTypes = {
    mode: PropTypes.oneOf(['followers', 'followin']),
    empty: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    subscriptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    getSubscriptions: PropTypes.func.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default SubscriptionList