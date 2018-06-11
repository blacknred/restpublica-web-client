import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import GridList from '@material-ui/core/GridList';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ListItemText from '@material-ui/core/ListItemText';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = {
    root: {
        maxWidth: '1000px',
        margin: '0 auto',
        '& a': {
            textDecoration: 'none'
        }
    },
    content: {
        alignItems: 'flex-start'
    },
    avatar: {
        height: '5em',
        width: '5em'
    },
    text: {
        maxWidth: '76%'
    },

    subheader: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    communitiesAvatar: {
        width: '230px',
        height: '150px'
    },
    communitiesText: {
        height: '85px'
    }
}

const AuthorContent = ({
    avatar, username, fullname, description, isMine, classes, posts_cnt,
    followers_cnt, followin_cnt, communities_cnt, my_subscription,
    preview_communities, createSubscription, removeSubscription
}) => {
    const previewCommunities = (
        <div>
            <ListSubheader className={classes.subheader}>
                {`Communities ${communities_cnt}`}
                {
                    communities_cnt > 0 &&
                    <Button
                        color='primary'
                        component={Link}
                        to={`/${username}/communities`}
                    >
                        View all
                </Button>
                }
            </ListSubheader>
            <ListItem>

            <GridList
                cellHeight='auto'
                spacing={15}
                cols={communities_cnt > 1 ? 2 : 1}
            >
                {
                    preview_communities.map((com, i) =>
                        <GridListTile key={com.title}>
                            <Link to={`/community/${com.name}`}>
                            <Card>
                                <CardMedia
                                    image={`data:image/png;base64,${com.avatar}`}
                                    className={classes.communitiesAvatar}
                                />
                                <CardContent className={classes.communitiesText}>
                                    <Typography variant='subheading'>
                                        {com.title}
                                    </Typography>
                                    <Typography variant='caption'>
                                        {`${followers_cnt} members`}
                                    </Typography>
                                </CardContent>
                                <CardActions >
                                    {
                                        com.my_subscription ?
                                            <Button disabled>Member</Button> :
                                            <Button
                                                color='primary'
                                                onClick={createSubscription}
                                            >
                                                Subscribe
                                 </Button>
                                    }
                                </CardActions>
                            </Card>
                            </Link>
                        </GridListTile>
                    )
                }
            </GridList>
            </ListItem>
        </div>
    )

    return (
        <List className={classes.root}>
            <ListItem className={classes.content}>
                <Avatar
                    srcSet={`data:image/png;base64,${avatar}`}
                    className={classes.avatar}
                />
                <ListItemText className={classes.text} >
                    <Typography
                        variant='title'
                        paragraph
                    >
                        {fullname}
                        <small>{` @${username}`}</small>
                    </Typography>
                    <Typography
                        variant='body2'
                        color='primary'
                    >
                        {followers_cnt + ' Followers'}&nbsp;
                        {followin_cnt + ' Followin'}
                    </Typography>
                    <Typography variant='body1'>
                        {description}
                    </Typography>
                </ListItemText>
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
            </ListItem>

            {parseInt(communities_cnt, 10) > 0 && previewCommunities}

            <ListSubheader>
                {`Posts ${posts_cnt}`}
            </ListSubheader>
        </List>
    )
}

AuthorContent.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
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