import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
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
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '1300px',
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
        width: '68px',
        height: '68px',
        position: 'relative',
    },
    avatar2: {
        height: '100px',
        width: '100px',
        marginBottom: '10px',
        position: 'relative',
    },
    avatarImg: {
        width: '100%',
        height: '100%',
        border: `2px solid ${theme.palette.background.paper}`
    },
    avatarIcon: {
        position: 'absolute',
        bottom: '0.9em',
        left: '0.9em',
        color: 'white',
        cursor: 'pointer'
    },
    avatarIcon2: {
        position: 'absolute',
        bottom: '1.5em',
        left: '1.5em',
        color: 'white',
        cursor: 'pointer'
    },
    bannerIcon: {
        cursor: 'pointer',
        position: 'absolute',
        right: theme.spacing.unit * 5,
        top: theme.spacing.unit * 4,
    },
    fileInput: {
        display: 'none'
    },
})

const AuthorContent = ({
    avatar, username, fullname, description, isMine, classes, posts_cnt,
    followers_cnt, followin_cnt, my_subscription, banner, createSubscription,
    removeSubscription, updateImg, isBannerLoading, isAvatarLoading
}) => {

    const progress = () => <CircularProgress size={65} />

    const progress2 = () => <CircularProgress size={100} />

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

    const changeBannerButton = (
        isMine &&
        <Avatar
            className={classes.bannerIcon}
            component={isBannerLoading ? CircularProgress : 'label'}
        >
            <PhotoCameraIcon />
            <input
                className={classes.fileInput}
                key='avatar'
                type='file'
                name='avatar'
                accept='.jpg, .jpeg, .png'
                onChange={e => updateImg(e, 'banner')}
            />
        </Avatar>
    )

    const authorAvatar = (
        <Fragment>
            <Hidden smDown>
                <label className={classes.avatar}>
                    <Avatar
                        className={classes.avatarImg}
                        srcSet={`data:image/png;base64,${avatar}`}
                        component={isAvatarLoading ? progress : 'div'}
                    />
                    {
                        isMine &&
                        <Fragment>
                            <PhotoCameraIcon className={classes.avatarIcon} />
                            <input
                                className={classes.fileInput}
                                key='avatar'
                                type='file'
                                name='avatar'
                                accept='.jpg, .jpeg, .png'
                                onChange={e => updateImg(e, 'avatar')}
                            />
                        </Fragment>
                    }
                </label>
            </Hidden>
            <Hidden mdUp>
                <label className={classes.avatar2}>
                    <Avatar
                        className={classes.avatarImg}
                        srcSet={`data:image/png;base64,${avatar}`}
                        component={isAvatarLoading ? progress2 : 'div'}
                    />
                    {
                        isMine &&
                        <Fragment>
                            <PhotoCameraIcon className={classes.avatarIcon2} />
                            <input
                                className={classes.fileInput}
                                key='avatar'
                                type='file'
                                name='avatar'
                                accept='.jpg, .jpeg, .png'
                                onChange={e => updateImg(e, 'avatar')}
                            />
                        </Fragment>
                    }
                </label>
            </Hidden>
        </Fragment>
    )

    return (
        <Card
            className={classes.root}
            elevation={0}
        >
            <Hidden smDown>
                <CardMedia
                    image={`data:image/png;base64,${banner}`}
                    className={classes.rootBackgroung}
                >
                    {changeBannerButton}
                </CardMedia>
                <CardActions className={classes.content}>
                    {authorAvatar}
                    {authorContent}
                    {authorAction}
                </CardActions>
            </Hidden>
            <Hidden mdUp>
                <CardMedia
                    image={`data:image/png;base64,${banner || avatar}`}
                    className={classes.rootBackgroung2}
                >
                    {changeBannerButton}
                </CardMedia>
                <CardContent className={classes.content2}>
                    {authorAvatar}
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
    my_subscription: PropTypes.number,
    isMine: PropTypes.bool.isRequired,
    isAvatarLoading: PropTypes.bool.isRequired,
    isBannerLoading: PropTypes.bool.isRequired,
    updateImg: PropTypes.func.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default withStyles(styles)(AuthorContent);