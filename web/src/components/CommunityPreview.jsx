import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const styles = {
    tile: {
        width: '15.8em',
        margin: '1%',
        textDecoration: 'none',
    },
    avatar: {
        width: '100%',
        height: '8em',
    },
}

const CommunityPreviewItem = ({
    community, classes, isAuthenticated, removeSubscription, createSubscription
}) => {

    return (
        <Card
            elevation={1}
            className={classes.tile}
            component={Link}
            to={`/community/${community.name}`}
        >
            <CardMedia
                className={classes.avatar}
                image={`data:image/png;base64, ${community.avatar}`}
            />
            <CardContent>
                <Typography variant='subheading'>
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
            {
                isAuthenticated &&
                <CardActions>
                    {
                        community.my_subscription ?
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
                            :
                            <Button
                                color='primary'
                                onClick={(e) => {
                                    e.preventDefault()
                                    createSubscription({
                                        id: community.id,
                                        name: community.title
                                    })
                                }}
                            >
                                Join
                                 </Button>
                    }
                </CardActions>

            }

        </Card>
    )
}

CommunityPreviewItem.propTypes = {
    community: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        my_subscription: PropTypes.number,
        followers_cnt: PropTypes.any.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default withStyles(styles)(CommunityPreviewItem)