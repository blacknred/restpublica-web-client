import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = {
    root: {
        maxWidth: '1000px',
        margin: '0 auto'
    },
    avatar: {
        height: '4em',
        width: '4em'
    },
    description: {
        maxWidth: '80%'
    },
    chip: {
        marginRight: '1em'
    },
    subheader: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}

const AuthorContent = ({
    avatar, username, fullname, description, isMine, classes,
    posts_cnt, followers_cnt, followin_cnt, my_subscription,
    createSubscription, removeSubscription
}) =>
    <List className={classes.root}>
        <ListItem>
            <Avatar
                srcSet={`data:image/png;base64,${avatar}`}
                className={classes.avatar}
            />
            <ListItemText>
                <Typography
                    variant='title'
                    paragraph
                >
                    {fullname}
                    <small>{` @${username}`}</small>
                </Typography>
                <Typography
                    variant='body1'
                    className={classes.description}
                >
                    {description}
                </Typography>
            </ListItemText>
            <ListItemSecondaryAction>
                {
                    isMine ?
                        <Button
                            color='primary'
                            component={Link}
                            to='/settings/profile'
                        >
                            Edit profile
                         </Button>
                        :
                        my_subscription ?
                            <Button
                                color='primary'
                                onClick={removeSubscription}
                            >
                                Unfollow
                                </Button>
                            :
                            <Button
                                color='primary'
                                onClick={createSubscription}
                            >
                                Follow
                                 </Button>
                }
            </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
            <Chip
                className={classes.chip}
                label={posts_cnt + ' Posts'}
            />
            <Chip
                className={classes.chip}
                label={followers_cnt + ' Followers'}
            />
            <Chip
                className={classes.chip}
                label={followin_cnt + ' Followin'}
            />
        </ListItem>
        <ListSubheader className={classes.subheader}>
            Communities
            <Button
                color='primary'
                component={Link}
                to={`/${username}/communities`}
            >
                View all
            </Button>
        </ListSubheader>
        <br />
        <ListSubheader>Posts</ListSubheader>
    </List>

AuthorContent.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    posts_cnt: PropTypes.any.isRequired,
    followers_cnt: PropTypes.any.isRequired,
    followin_cnt: PropTypes.any.isRequired,
    my_subscription: PropTypes.number,

    isMine: PropTypes.bool.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default withStyles(styles)(AuthorContent);