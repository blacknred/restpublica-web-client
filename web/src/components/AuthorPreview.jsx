import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    tile: {
        minWidth: '15.8em',
        margin: '10px',
        textDecoration: 'none',
        textAlign: 'center',
        //overflow: 'inherit'
    },
    tile2: {
        width: '47%',
        margin: '1%',
        textDecoration: 'none',
        textAlign: 'center',
    },
    avatar: {
        width: '4em',
        height: '4em',
        margin: '0 auto'
    },
    action: {
        justifyContent: 'center'
    }
}

const AuthorPreview = ({
    author, classes, isAuthenticated, removeSubscription, createSubscription
}) => {

    const content = (
        <CardContent>
            <Avatar
                src={`data:image/png;base64, ${author.avatar}`}
                alt={author.username}
                className={classes.avatar}
            />
            <br />
            <Typography variant='subheading'>
                {author.fullname}
            </Typography>
            <Typography
                paragraph
                noWrap
                color='textSecondary'
            >
                {author.description}
            </Typography>
            <Typography
                variant='caption'
                paragraph
                noWrap
                color='primary'
            >
                {author.followers_cnt} followers
                    </Typography>
        </CardContent>
    )

    const action = (
        isAuthenticated &&
        <CardActions className={classes.action}>
            {
                author.my_subscription ?
                    <Button
                        color='primary'
                        onClick={(e) => {
                            e.preventDefault()
                            removeSubscription({
                                id: author.id,
                                username: author.fullname
                            })
                        }}
                    >
                        Unfollow
                                </Button>
                    :
                    <Button
                        color='primary'
                        onClick={(e) => {
                            e.preventDefault()
                            createSubscription({
                                id: author.id,
                                username: author.fullname
                            })
                        }}
                    >
                        Follow
                                 </Button>
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
                    to={`/${author.username}`}
                >
                    {content}
                    {action}
                </Card>
            </Hidden>
            <Hidden mdUp>
                <Card
                    elevation={1}
                    className={classes.tile2}
                    component={Link}
                    to={`/${author.username}`}
                >
                    {content}
                    {action}
                </Card>
            </Hidden>
        </Fragment>
    )
}

AuthorPreview.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        my_subscription: PropTypes.number,
        followers_cnt: PropTypes.any
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default withStyles(styles)(AuthorPreview)