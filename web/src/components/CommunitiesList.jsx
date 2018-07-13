import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller2';

import CommunityPreview from './CommunityPreview';

import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    loader: {
        textAlign: 'center',
        padding: '2em',
        flexBasis: '100%'
    },
    header: {
        maxWidth: '1100px',
    },
    grid: {
        maxWidth: '1100px',
        justifyContent: 'center'
    }
}

const CommunitiesList = ({
    isAuthenticated, isHome, userId, hasMore, classes, communities,
    getCommunities, createSubscription, removeSubscription,
}) => {

    const loader = (
        <div
            className={classes.loader}
            key={'postsLoader'}
        >
            {communities.length > 0 && <CircularProgress />}
        </div>
    )

    const subheader = (
        isHome &&
        <ListItem className={classes.header}>
            <ListItemText
                secondary='My communities'
                secondaryTypographyProps={{ variant: 'body2' }}
            />
            <Button
                color='primary'
                component={Link}
                to={{
                    pathname: '/community',
                    state: {
                        modal: true,
                    }
                }}
            >
                <AddCircleIcon /> &nbsp;Create community
                </Button>
        </ListItem>
    )

    const moreCommunitiesLink = (
        isHome && !hasMore &&
        <div className={classes.loader}>
            <Button
                variant='raised'
                color='primary'
                component={Link}
                to="/communities/recommended"
            >
                More communities
                    </Button>
        </div>
    )

    return (
        <div>
            {subheader}
            <InfiniteScroll
                pageStart={0}
                loadMore={getCommunities}
                hasMore={hasMore}
                loader={loader}
            >
                <GridList className={classes.grid}>
                    {
                        communities.map((community, index) => (
                            <CommunityPreview
                                key={index}
                                community={community}
                                userId={userId}
                                isAuthenticated={isAuthenticated}
                                removeSubscription={removeSubscription}
                                createSubscription={createSubscription}
                            />
                        ))
                    }
                </GridList>
            </InfiniteScroll>
            <br />
            {moreCommunitiesLink}
        </div>
    )
}

CommunitiesList.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isHome: PropTypes.bool,
    userId: PropTypes.any,
    hasMore: PropTypes.bool.isRequired,
    communities: PropTypes.arrayOf(PropTypes.object).isRequired,
    getCommunities: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired,
    removeSubscription: PropTypes.func.isRequired,
}

export default withStyles(styles)(CommunitiesList)