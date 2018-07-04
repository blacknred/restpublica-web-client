import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemText from '@material-ui/core/ListItemText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DialogContentText from '@material-ui/core/DialogContentText';

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
    avatar: {
        height: '3.2em',
        width: '3.2em',
        border: `2px solid ${theme.palette.background.default}`
    },
    avatar2: {
        height: '5em',
        width: '5em',
        marginBottom: '10px',
        border: `2px solid ${theme.palette.background.default}`
    },

})

const CommunityContent = ({
    avatar, banner, restricted, posts_moderation, name, title, last_members,
    description, isAdmin, classes, last_post_at, admin, followers_cnt,
    my_subscription, createSubscription, removeSubscription,
    isRemoveSubscriptionOpen, toggleContextDialog,
}) => {

    const communityContent = (
        <List disablePadding>
            <ListItem>
                <Typography variant='display1'>
                    {title}
                </Typography>
            </ListItem>
            <ListItem
                component={Link}
                to={`/communities/${name}/participants`}
            >
                {
                    last_members.map((member, i) =>
                        <ListItemAvatar key={i}>
                            <Avatar
                                className={classes.contentAvatar}
                                srcSet={`data:image/png;base64,${member.avatar}`}
                            />
                        </ListItemAvatar>
                    )
                }
            </ListItem>
            <ListItem>
                <ListItemText secondary={
                    `${followers_cnt} PARTICIPANTS -
                    ${restricted ? 'RESTRICTED ' : 'FREE ACCESS '} -
                    ${posts_moderation ? 'POSTS MODERATION ' : 'FREE POSTING '}`
                } />
            </ListItem>
            <ListItem>
                <ListItemText secondary={description} />
            </ListItem>
        </List>
    )

    const communityAction = (
        <CardActions>
            {
                !isAdmin ?
                    <Button
                        variant='raised'
                        color='primary'
                        component={Link}
                        to={`/community/${name}/moderation`}
                    >
                        Moderation
                         </Button>
                    :
                    my_subscription ?
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={() => toggleContextDialog('isRemoveSubscriptionOpen')}
                        >
                            Participant
                                </Button>
                        :
                        <Button
                            variant='raised'
                            color='primary'
                            onClick={createSubscription}
                        >
                            {restricted ? 'Request to join' : 'Join'}
                        </Button>
            }
            <Dialog
                key='isRemoveCommunitySubscription'
                open={isRemoveSubscriptionOpen}
                onClose={() => toggleContextDialog('isRemoveSubscriptionOpen')}
            >
                <DialogTitle>Leave community?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your posts will be available
                        untill you delete them directly
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => toggleContextDialog('isRemoveSubscriptionOpen')}>
                        Cancel
                        </Button>
                    <Button
                        color='primary'
                        onClick={() => {
                            toggleContextDialog('isRemoveSubscriptionOpen')
                            removeSubscription()
                        }}>
                        Leave
                        </Button>
                </DialogActions>
            </Dialog>
        </CardActions>
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
                />
                <CardActions className={classes.content}>
                    <Avatar
                        srcSet={`data:image/png;base64,${avatar}`}
                        className={classes.avatar}
                    />
                    {communityContent}
                    {communityAction}
                </CardActions>
            </Hidden>
            <Hidden mdUp>
                <CardMedia
                    image={`data:image/png;base64,${banner}`}
                    className={classes.rootBackgroung2}
                />
                <CardContent className={classes.content2}>
                    <Avatar
                        srcSet={`data:image/png;base64,${avatar}`}
                        className={classes.avatar2}
                    />
                    {communityContent}
                    {communityAction}
                </CardContent>
            </Hidden>
        </Card>
    )
}

CommunityContent.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    banner: PropTypes.string,
    last_post_at: PropTypes.any.isRequired,
    restricted: PropTypes.bool.isRequired,
    posts_moderation: PropTypes.bool.isRequired,
    followers_cnt: PropTypes.any.isRequired,
    description: PropTypes.string.isRequired,
    admin: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
    last_members: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        })
    ).isRequired,
    my_subscription: PropTypes.number,
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isRemoveSubscriptionOpen: PropTypes.bool.isRequired,
    toggleContextDialog: PropTypes.func.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default withStyles(styles)(CommunityContent);