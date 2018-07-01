import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        width: '90%',
        marginBottom: theme.spacing.unit * 5,
        position: 'relative',
        '& a': {
            textDecoration: 'none'
        }
    },
    rootBackgroung: {
        height: '400px',
    },
    rootBackgroung2: {
        height: '300px',
        width: '100vw',
    },
    content: {
        padding: theme.spacing.unit * 3,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        background: `linear-gradient(rgba(0,0,0,0),${theme.palette.background.default})`,
        '& a:last-child': {
            width: '9em'
        },
        '& li': {
            paddingTop: 0
        }
    },
    content2: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '-5em',
        background: `linear-gradient(rgba(0,0,0,0),${theme.palette.background.paper})`,
        '& li, & a': {
            paddingTop: 0,
            textAlign: 'center',
            justifyContent: 'center'
        }
    },
    contentAvatar: {
        width: '1.6em',
        height: '1.6em',
        marginRight: -theme.spacing.unit
    },
    contentText: {
        flex: 1
    },
    avatar: {
        height: '3.2em',
        width: '3.2em',
        border: `3px solid ${theme.palette.background.default}`
    },
    avatar2: {
        height: '5em',
        width: '5em',
        marginBottom: '10px',
        border: `3px solid ${theme.palette.background.default}`
    },

})

const AuthorContent = ({
    avatar, username, fullname, description, isMine, classes, posts_cnt,
    followers_cnt, followin_cnt, communities_cnt, my_subscription, banner,
    preview_communities, createSubscription, removeSubscription
}) => {

    const authorContent = (
        <List
            disablePadding
            className={classes.contentText}
        >
            <ListItem>
                <Typography variant='display1'>
                    {fullname}
                    <small><small>{` @${username}`}</small></small>
                </Typography>
            </ListItem>
            <ListItem>
                <ListItemText secondary={
                    `${followers_cnt} FOLLOWERS -
                    ${followin_cnt} FOLLOWIN -
                    ${posts_cnt} POSTS`
                } />
            </ListItem>
            <ListItem>
                <ListItemText secondary={description} />
            </ListItem>
        </List>
    )

    const authorAction = (
        <CardActions>
            {
                isMine ?
                    <Button
                        variant='raised'
                        color='primary'
                        component={Link}
                        to='/settings/profile'
                    >
                        Edit profile
                         </Button>
                    :
                    my_subscription ?
                        <Button
                            variant='raised'
                            color='primary'
                            onClick={removeSubscription}
                        >
                            Unfollow
                                </Button>
                        :
                        <Button
                            variant='raised'
                            color='primary'
                            onClick={createSubscription}
                        >
                            Follow
                                 </Button>
            }
        </CardActions>
    )

    return (
        <Card
            className={classes.root}
            elevation={0}
        >
            <Hidden smDown>
                <CardMedia
                    image={`data:image/png;base64,${banner || avatar}`}
                    className={classes.rootBackgroung}
                />
                <CardActions className={classes.content}>
                    <Avatar
                        srcSet={`data:image/png;base64,${avatar}`}
                        className={classes.avatar}
                    />
                    {authorContent}
                    {authorAction}
                </CardActions>
            </Hidden>
            <Hidden mdUp>
                <CardMedia
                    image={`data:image/png;base64,${banner || avatar}`}
                    className={classes.rootBackgroung2}
                />
                <CardContent className={classes.content2}>
                    <Avatar
                        srcSet={`data:image/png;base64,${avatar}`}
                        className={classes.avatar2}
                    />
                    {authorContent}
                    {authorAction}
                </CardContent>
            </Hidden>
        </Card>
    )
}

AuthorContent.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    banner: PropTypes.string,
    posts_cnt: PropTypes.any.isRequired,
    followers_cnt: PropTypes.any.isRequired,
    followin_cnt: PropTypes.any.isRequired,
    communities_cnt: PropTypes.any.isRequired,
    my_subscription: PropTypes.number,
    preview_communities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
            followers_cnt: PropTypes.any.isRequired,
            my_subscription: PropTypes.number,
        })
    ).isRequired,
    isMine: PropTypes.bool.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default withStyles(styles)(AuthorContent);