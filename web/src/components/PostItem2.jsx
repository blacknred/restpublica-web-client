import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import moment from 'moment'

import { withStyles } from 'material-ui/styles';
import Fade from 'material-ui/transitions/Fade';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SettingsIcon from '@material-ui/icons/Settings';


import Button from 'material-ui/Button';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/Menu/MenuItem';



const styles = theme => ({
    card: {
        maxWidth: '530px',
        width: '530px',
        margin: '0.8em',
        flex: '1 0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
    },
    media: {
        //height: 0,
        //paddingTop: '56.25%', // 16:9
        //paddingTop: '86.25%',
    },
    actions: {
        display: 'flex',
    },
    activeButton: {
        color: '#eee'
    },




    postHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px',
        fontWeight: '800'
    },
    postHeaderLink: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row-reverse',
        fontSize: '13px',
    },
    postActions: {

        paddingBottom: '1em',
        paddingTop: '0',
        alignItems: 'center',
    },
    postActionsLeft: {
        flex: 1
    },
    postActionsEditAnchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom'
    },
    postActionsTargetOrigin: {
        horizontal: 'right',
        vertical: 'bottom'
    },
    tags: {
        padding: '1em 0 0 0',
        fontWeight: '800',
        opacity: '0.5',
    },


    secondaryText: {
        // width: 'auto',
        // display: 'inline-block',
        opacity: '0.5',
    },
    descriptionText: {
        lineHeight: '1.4em',
        fontSize: '14px'
    },

})

const countDate = dateObj => {
    let date = moment.parseZone(dateObj)
    let now = moment().parseZone()
    let res
    if (now.year() > date.year()) res = `${now.year() - date.year()} year`
    else if (now.month() > date.month()) res = `${now.month() - date.month()} month`
    else if (now.date() > date.date() + 7) res = `${(now.date() - date.date()) / 7} w.`
    else if (now.date() > date.date()) res = `${now.date() - date.date()} d.`
    else if (now.hour() > date.hour()) res = `${date.hour()} h.`
    else if (now.minute() > date.minute()) res = `${date.minute()} min.`
    else res = `${date.secounds} sec.`
    return res
}

const PostItem = ({ post, isFullAccess, classes, expandPost, updatePost, deletePost }) => {

    return (
        //<Fade in={true}>
            <Card className={classes.card}>

                {/* <CardHeader style={styles.postHeader}
                    avatar={
                        <Link to={`/${post.author.username}/posts`} >
                            <Avatar src={`data:image/png;base64, ${post.author.avatar}`} />
                        </Link>
                    }
                    title={
                        <span>
                            <Link to={`/${post.author.username}/posts`} >
                                {post.author.username}
                            </Link>
                            {
                                post.community_name &&
                                <Link to={`/community/${post.community_name}/posts`}
                                    style={styles.secondaryText}>
                                    &nbsp;&nbsp;&nbsp;&#8226;&nbsp;&nbsp;&nbsp;
                                    {post.community_name}
                                </Link>
                            }
                        </span>
                    }
                /> */}

                <CardHeader
                    avatar={
                        <Link to={`/${post.author.username}/posts`} >
                            <Avatar
                                className={classes.avatar}
                                src={`data:image/png;base64, ${post.author.avatar}`}
                                aria-label={post.author.username} >
                                {!post.author.avatar && post.author.username[0].toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={
                        <Link to={`/${post.author.username}/posts`} >
                            {post.author.username}
                        </Link>
                    }
                    subheader={
                        post.community_name &&
                        <Link to={`/community/${post.community_name}/posts`}>
                            &nbsp;&nbsp;&nbsp;&#8226;&nbsp;&nbsp;&nbsp;
                                    {post.community_name}
                        </Link>
                    }
                    action={
                        // <IconButton>
                        //     <MoreVertIcon />
                        // </IconButton>
                        <Link to={`/post/${post.slug}`}>
                            {countDate(post.created_at)}
                        </Link>
                    }
                />
                <CardMedia
                    className={classes.media}
                    src={post.content[0].file}
                    title={post.content.file}
                />
                {/* <img src={post.content[0].file} alt=""/>
                </CardMedia> */}
                <CardContent>
                    <Typography component="p">{post.description}</Typography>
                    {
                        post.tags.length > 0 &&
                        <div style={styles.tags}>
                            {
                                post.tags.map(tag =>
                                    <Link
                                        to={`/search/${tag}/tags`}
                                        key={tag} >
                                        #{tag}&nbsp;&nbsp;
                                </Link>
                                )
                            }
                        </div>
                    }
                </CardContent>
                <CardActions
                    className={classes.actions}
                    disableActionSpacing>
                    <Button
                        onClick={() => expandPost(post.id)}
                        aria-expanded={post.isExpanded}
                        aria-label="Discussion" >
                        {post.commentable &&
                            (`${post.isExpanded ? 'Hide' : 'Join'}
                            discussion ${post.comments_cnt}`)}
                    </Button>
                    <IconButton aria-label="Add to favorites">
                        <ThumbUpIcon className={post.my_like_id ? classes.activeButton : null} />
                        {post.likes_cnt}
                    </IconButton>
                    {
                        !isFullAccess &&
                        <IconButton aria-label="Share">
                            <ShareIcon />
                            {post.views_cnt}
                        </IconButton>
                    }
                    {/* {
                        isFullAccess &&
                        <Menu
                            iconButtonElement={
                                <Button
                                    mini={true}
                                    backgroundColor={muiTheme.palette.clockCircleColor}
                                    zDepth={0}
                                    onClick={() => { }}>
                                    <SettingsIcon />
                                </Button>
                            }
                            anchorOrigin={styles.postActionsEditAnchorOrigin}
                            targetOrigin={styles.postActionsTargetOrigin} >
                            <MenuItem
                                primaryText="Make archive"
                                onClick={() => updatePost(post.id, { archive: true })}
                            />
                            <MenuItem
                                primaryText={`Make ${post.commentable && 'non'} commentable`}
                                onClick={() => updatePost(post.id, { commentable: !post.commentable })}
                            />
                            <MenuItem
                                primaryText="Edit description"
                                onClick={() => updatePost(post.id, { archive: true })}
                            />
                            <MenuItem
                                primaryText="Delete post"
                                onClick={() => deletePost(post.id)}
                            />
                        </Menu>
                    } */}
                </CardActions>

                <Collapse in={post.isExpanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {post.comments}
                    </CardContent>
                </Collapse>
            </Card >
        //</Fade>
    )
}

PostItem.propTypes = {
    post: PropTypes.shape({
        archived: PropTypes.bool.isRequired,
        author: PropTypes.shape({
            username: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired
        }),
        author_id: PropTypes.number.isRequired,
        commentable: PropTypes.bool.isRequired,
        community_id: PropTypes.number,
        community_name: PropTypes.string,
        views_cnt: PropTypes.number.isRequired,
        comments_cnt: PropTypes.string.isRequired,
        likes_cnt: PropTypes.string.isRequired,
        my_like_id: PropTypes.number,
        type: PropTypes.string.isRequired,
        content: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                post_id: PropTypes.number.isRequired,
                file: PropTypes.string,
                thumb: PropTypes.string,
                mime: PropTypes.string,
                type: PropTypes.string,
                link: PropTypes.string,
                title: PropTypes.string,
                subject: PropTypes.string,
                ends_at: PropTypes.string,
                votes_cnt: PropTypes.string,
                options: PropTypes.arrayOf(PropTypes.string),
                myVotedOptionId: PropTypes.number
            })
        ),
        slug: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        created_at: PropTypes.any.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
        isExpanded: PropTypes.bool.isRequired,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
            })
        )
    }).isRequired,
    isFullAccess: PropTypes.bool.isRequired,
    expandPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
}

export default withStyles(styles)(PostItem);