import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const styles = {
    tile: {
        minWidth: '15.8em',
        margin: '10px',
        textDecoration: 'none',
        //overflow: 'inherit'
    },
    tile2: {
        width: '47%',
        margin: '1%',
        textDecoration: 'none',
    },
    avatar: {
        width: '100%',
        height: '8em',
    },
}

const CommunityPreview = ({
    community, classes, isAuthenticated, userId, removeSubscription, createSubscription
}) => {

    const content = (
        <Fragment>
            <CardMedia
                className={classes.avatar}
                image={`data:image/png;base64, ${community.avatar}`}
            />
            <CardContent>
                <Typography
                    variant='subheading'
                    noWrap
                >
                    {community.title}
                </Typography>
                <Typography
                    paragraph
                    variant='caption'
                    color='textSecondary'
                >
                    {community.followers_cnt} members
                </Typography>
            </CardContent>
        </Fragment>
    )

    const action = (
        isAuthenticated &&
        <CardActions>
            {
                community.admin_id == userId ?
                    <Typography variant='subheading'>
                        Owner
                            </Typography> :
                    community.my_subscription ?
                        (
                            removeSubscription &&
                            <Button
                                color='primary'
                                onClick={(e) => {
                                    e.preventDefault()
                                    removeSubscription({
                                        id: community.id,
                                        name: community.title
                                    })
                                }}
                            >
                                Leave
                                </Button>
                        ) :
                        (
                            createSubscription &&
                            < Button
                                color='primary'
                                onClick={(e) => {
                                    e.preventDefault()
                                    createSubscription({
                                        id: community.id,
                                        name: community.title
                                    })
                                }}
                            >
                                {community.restricted ? 'Request to join' : 'Join'}
                            </Button>
                        )
            }
        </CardActions>
    )

    return (
        <Fragment>
            <Hidden smDown>
                <Card
                    elevation={1}
                    className={classes.tile}
                    component={Link}
                    to={`/communities/${community.name}`}
                >
                    {content}
                    {action}
                </Card >
            </Hidden>
            <Hidden mdUp>
                <Card
                    elevation={1}
                    className={classes.tile2}
                    component={Link}
                    to={`/communities/${community.name}`}
                >
                    {content}
                    {action}
                </Card >
            </Hidden>
        </Fragment>
    )
}

CommunityPreview.propTypes = {
    community: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        my_subscription: PropTypes.number,
        restricted: PropTypes.bool.isRequired,
        followers_cnt: PropTypes.any.isRequired,
        admin_id: PropTypes.any.isRequired
    }).isRequired,
    userId: PropTypes.any,
    isAuthenticated: PropTypes.bool,
    removeSubscription: PropTypes.func,
    createSubscription: PropTypes.func
}

export default withStyles(styles)(CommunityPreview)