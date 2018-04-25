import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import Card, {
    CardHeader,
    CardMedia,
    CardContent,
    CardActions
} from 'material-ui/Card';
import Menu from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Fade from 'material-ui/transitions/Fade';
import MenuItem from 'material-ui/Menu/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import Collapse from 'material-ui/transitions/Collapse';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    card: {
        maxWidth: '530px',
        //width: '530px',
        margin: '0.8em',
        flex: '1 0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    actionsToolbar: {
        minHeight: 'auto',
        paddingRight: 0,
        flex: 1,
        flexDirection: 'row-reverse',
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
        // fontWeight: '800',
        // opacity: '0.5',
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
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar
                        component={Link}
                        to={`/${post.author.username}/posts`}
                        className={classes.avatar}
                        srcSet={`data:image/png;base64,${post.author.avatar}`}
                        aria-label={post.author.username}
                    />
                }
                title={
                    <Link to={`/${post.author.username}/posts`} >
                        {post.author.username}
                    </Link>
                }
                subheader={
                    <Link to={`/community/${post.community_name}/posts`}>
                        {post.community_name}
                    </Link>
                }
                action={
                    [
                        <Typography>{countDate(post.created_at)}</Typography>,
                        // <IconButton aria-label="Share">
                        //     <OpenInNewIcon />
                        // </IconButton>
                    ]
                    // <Link to={`/post/${post.slug}`}>
                    //     {/* <Button> */}
                    //     {countDate(post.created_at)}
                    //     {/* </Button> */}
                    // </Link>
                }
            />
            <CardContent>
                <Typography paragraph={post.tags.length}>
                    {post.description}
                </Typography>
                <Typography
                    variant='body2'
                    color='textSecondary'
                >
                    {
                        post.tags.map(tag =>
                            <Link
                                to={`/search/${tag}/tags`}
                                key={tag} >
                                #{tag}&nbsp;&nbsp;
                            </Link>
                        )
                    }
                </Typography>
            </CardContent>
            <CardMedia
                className={classes.media}
                component='img' //video, audio, picture, iframe, img
                src={post.content[0].file}
                title={post.content.file}
            />

            <CardActions>
                <Button
                    onClick={() => expandPost(post.id)}
                    aria-expanded={post.isExpanded}
                >
                    {post.commentable &&
                        (`${post.isExpanded ? 'Hide' : 'Join'}
                            discussion ${post.comments_cnt}`)}
                </Button>

                <Toolbar className={classes.actionsToolbar}>
                    <IconButton aria-label="Options">
                        <MoreHorizIcon />
                    </IconButton>

                    <Typography variant='body1'>
                        &nbsp;{post.views_cnt}&nbsp;
                    </Typography>

                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>

                    <Typography variant='body1'>
                        &nbsp;{post.likes_cnt}&nbsp;
                    </Typography>

                    <IconButton color={post.my_like_id ? 'primary' : 'default'}>
                        <ThumbUpIcon />
                    </IconButton>

                    {
                        // isFullAccess &&
                        // <Menu
                        //     iconButtonElement={
                        //         <Button
                        //             mini={true}
                        //             backgroundColor={muiTheme.palette.clockCircleColor}
                        //             zDepth={0}
                        //             onClick={() => { }}>
                        //             <SettingsIcon />
                        //         </Button>
                        //     }
                        //     anchorOrigin={styles.postActionsEditAnchorOrigin}
                        //     targetOrigin={styles.postActionsTargetOrigin} >
                        //     <MenuItem
                        //         primaryText="Make archive"
                        //         onClick={() => updatePost(post.id, { archive: true })}
                        //     />
                        //     <MenuItem
                        //         primaryText={`Make ${post.commentable && 'non'} commentable`}
                        //         onClick={() => updatePost(post.id, { commentable: !post.commentable })}
                        //     />
                        //     <MenuItem
                        //         primaryText="Edit description"
                        //         onClick={() => updatePost(post.id, { archive: true })}
                        //     />
                        //     <MenuItem
                        //         primaryText="Delete post"
                        //         onClick={() => deletePost(post.id)}
                        //     />
                        // </Menu>
                    }
                </Toolbar>
            </CardActions>

            <Collapse in={post.isExpanded}>
                <CardContent>
                    {post.comments}
                    {post.content[0].file}
                </CardContent>
            </Collapse>
        </Card >
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