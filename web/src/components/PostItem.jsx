import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import CommentsList from './CommentsList'

import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import LinkIcon from '@material-ui/icons/Link';
import ShareIcon from '@material-ui/icons/Share';
import ImageIcon from '@material-ui/icons/Image';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import CardMedia from '@material-ui/core/CardMedia';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
    card: {
        maxWidth: '530px',
        minWidth: '140px',
        width: '100%',
        margin: '0.6em',
        '@media (max-width: 600px)': {
            margin: '0.6em 0'
        },
    },
    headerAvatar: {
        backgroundColor: theme.palette.primary.light,
    },
    headerContent: {
        '&> *': {
            display: 'inline-block',
        },
        '&> :nth-child(2)': {
            color: theme.palette.primary.main
        },
        '&> :nth-child(2):before': {
            content: '"\\203A"',
            margin: '0 0.5em'
        }
    },
    headerAction: {
        '@media (max-width: 750px)': {
            marginRight: 0
        },
    },
    headerPostLinkIcon: {
        position: 'fixed',
        color: 'transparent'
    },
    headerShiftOnHover: {
        '&:hover > *': {
            color: theme.palette.text.secondary
        },
        '&:hover > :nth-child(1)': {
            color: 'transparent'
        },
    },
    content: {
        paddingTop: 0,
        '& a': {
            color: theme.palette.primary.main
        }
    },
    media: {
        width: '100%',
    },


    comments: {
        flexDirection: 'column',
        alignItems: 'start'
    },


    actions: {
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.02)'
    },
    actionsToolbar: {
        display: 'flex',
        alignItems: 'center',
        flex: 1
    },
    actionsFullWidth: {
        flex: 1
    },
    commentAvatar: {
        width: '32px',
        height: '32px',
        marginRight: '0.5em'
    },
})


const PostItem = ({
    post, isAutoGifs, isFullAccess, userAvatar, classes,
    getComments, toggleComments, toggleNewCommentForm, changeNewComment, postNewComment,
    createLike, deleteLike, updatePost, deletePost, formateDate
}) => {

    const actionsButtons = (
        <span className={classes.actionsToolbar}>
            <IconButton
                color={post.my_like_id ? 'primary' : 'default'}
                onClick={post.my_like_id === null ? createLike : deleteLike}
            >
                <ThumbUpIcon />
            </IconButton>
            <Typography variant='body1'>
                &nbsp;{post.likes_cnt}&nbsp;
                        </Typography>
            <IconButton
                component={Link}
                to={{
                    pathname: '/post',
                    state: {
                        modal: true,
                        repost: {
                            id: post.id,
                            author: post.author
                        }
                    }
                }}
            >
                <ShareIcon />
            </IconButton>
            <Typography variant='body1'>
                &nbsp;{post.reposts_cnt}&nbsp;
                        </Typography>
            <IconButton aria-label="Options">
                <MoreHorizIcon />
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
                //         onClick={() => updatePost(, { archive: true })}
                //     />
                //     <MenuItem
                //         primaryText={`Make ${post.commentable && 'non'} commentable`}
                //         onClick={() => updatePost(, { commentable: !post.commentable })}
                //     />
                //     <MenuItem
                //         primaryText="Edit description"
                //         onClick={() => updatePost(, { archive: true })}
                //     />
                //     <MenuItem
                //         primaryText="Delete post"
                //         onClick={() => deletePost()}
                //     />
                // </Menu>
            }
        </span>
    )




    return (
        <Card
            elevation={1}
            className={classes.card}
        >
            {/* header */}
            <CardHeader
                classes={{
                    action: classes.headerAction,
                    content: classes.headerContent
                }}
                avatar={
                    <Avatar
                        component={Link}
                        to={`/${post.author.username}/posts`}
                        className={classes.headerAvatar}
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
                    post.community_name &&
                    <Link to={`/community/${post.community_name}/posts`}>
                        {post.community_name}
                    </Link>
                }
                action={
                    <IconButton
                        component={Link}
                        to={`/post/${post.slug}`}
                        aria-label="Share"
                        classes={{ label: classes.headerShiftOnHover }}
                    >
                        <Typography
                            variant='body2'
                            color='textSecondary'
                        >
                            {formateDate(post.created_at)}
                        </Typography>
                        <OpenInNewIcon className={classes.headerPostLinkIcon} />
                    </IconButton>
                }
            />

            {/* description */}
            <CardContent className={classes.content}>
                <Typography variant='body2'>
                    {
                        post.description.trim().split(' ').map((word) => {
                            if (word[0] !== '#') return `${word} `;
                            return (
                                <Link
                                    to={`/search/${word}/tags`}
                                    key={word} >
                                    {word}&nbsp;
                                </Link>
                            )
                        })
                    }
                </Typography>
            </CardContent>

            {/* <div className="ez-player ez-domain-youtube_com ez-block" data-placeholder="&lt;iframe class=&quot;ez-player-frame&quot; src=&quot;https://www.youtube.com/embed/JrZSfMiVC88?feature=oembed&amp;amp;autoplay=1&quot; allowfullscreen&gt;&lt;/iframe&gt;">
                <div className="ez-player-container" style={{ paddingBottom: '74.9455%'}}>
                    <a className="ez-player-placeholder" target="_blank" href="https://www.youtube.com/watch?v=JrZSfMiVC88" rel="nofollow">
                        <div className="ez-player-picture" style={{ backgroundImage: 'url("https://i.ytimg.com/vi/JrZSfMiVC88/hqdefault.jpg")' }}></div>

                        <div className="ez-player-header">
                            <div className="ez-player-title">
                                The   Mamas  &amp;  The  Papas   --   California  Dreaming  [[  Official  Live   Video  ]]  HD
           </div>
                        </div>

                        <div className="ez-player-button"></div>
                        <div className="ez-player-logo"></div>

                    </a>
                </div>
            </div> */}

            {/* media */}
            <CardMedia
                className={classes.media}
                component='img' //video, audio, picture, iframe, img
                src={post.content[0].file}
                title={post.content.file}
            />


            {/* comments */}
            {
                post.commentable &&
                post.comments_cnt > 0 &&
                <Hidden
                    only={post.listMode ? 'xs' : null}
                    className={classes.comments}
                >
                    <CardActions className={classes.actions}>
                        {
                            post.listMode &&
                            post.comments_cnt > 0 &&
                            <Button
                                onClick={() => toggleComments()}
                                color='primary'
                            >
                                {`${post.toggleComments ? 'Hide' : 'Show'}
                                        all comments ${post.comments_cnt}`}
                            </Button>
                        }
                        {!post.listMode && actionsButtons}
                    </CardActions>
                    <LinearProgress />
                    <CommentsList
                        comments={post.comments}
                        comments_cnt={parseInt(post.comments_cnt, 10)}
                        showComments={post.showComments}
                        hasMoreComments={post.hasMoreComments}
                        getComments={getComments}
                        formateDate={formateDate}
                    />
                </Hidden>
            }



            {/* actions */}
            <CardActions className={classes.actions}>
                <Collapse
                    in={post.commentable}
                    className={classes.actionsFullWidth}
                >
                    <Hidden only={[!post.listMode ? 'xs' : null, 'sm', 'md', 'lg', 'xl']}>
                        <span className={classes.actionsToolbar}>
                            <IconButton
                                aria-label="Discussion"
                                component={Link}
                                to={`/post/${post.slug}`}
                            >
                                <CommentIcon />
                            </IconButton>
                            <Typography>
                                &nbsp;{post.comments_cnt}&nbsp;
                            </Typography>
                        </span>
                    </Hidden>
                    <Hidden only={post.listMode ? 'xs' : null}>
                        <Input
                            fullWidth={true}
                            autoFocus={post.showCommentForm}
                            placeholder="Write a comment"
                            disableUnderline={true}
                            value={post.newComment}
                            multiline={post.showCommentForm}
                            startAdornment={
                                <InputAdornment position="start" >
                                    <Avatar
                                        className={classes.commentAvatar}
                                        srcSet={`data:image/png;base64,${userAvatar}`}
                                    />
                                </InputAdornment>
                            }
                            onClick={!post.showCommentForm ? toggleNewCommentForm : null}
                            onChange={(ev) => changeNewComment(ev.target.value)}
                        />
                    </Hidden>
                </Collapse>
                <Collapse
                    in={!post.showCommentForm && post.listMode}
                    style={{ width: post.showCommentForm ? 0 : 'auto' }}
                >
                    {actionsButtons}
                </Collapse>
            </CardActions>


            {/* comment form */}
            <Collapse in={post.showCommentForm}>
                <CardActions className={classes.actions}>
                    <span>
                        <IconButton>
                            <ImageIcon />
                        </IconButton>
                        <IconButton>
                            <LinkIcon />
                        </IconButton>
                    </span>
                    <span>
                        <Button onClick={toggleNewCommentForm}>
                            Cansel
                        </Button>
                        <Button
                            disabled={post.newComment.length === 0}
                            onClick={postNewComment}
                            color="primary"
                        >
                            Send
                        </Button>
                    </span>
                </CardActions>
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
        views_cnt: PropTypes.any.isRequired,
        comments_cnt: PropTypes.any.isRequired,
        likes_cnt: PropTypes.any.isRequired,
        my_like_id: PropTypes.any,
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
        showComments: PropTypes.bool.isRequired,
        showCommentForm: PropTypes.bool.isRequired,
        newComment: PropTypes.string.isRequired,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                user_id: PropTypes.number.isRequired,
                body: PropTypes.string.isRequired,
                created_at: PropTypes.string.isRequired,
            })
        )
    }).isRequired,

    classes: PropTypes.object.isRequired,
    userAvatar: PropTypes.string.isRequired,
    // isFullAccess: PropTypes.bool.isRequired,

    formateDate: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    toggleComments: PropTypes.func.isRequired,
    toggleNewCommentForm: PropTypes.func.isRequired,
    changeNewComment: PropTypes.func.isRequired,
    postNewComment: PropTypes.func.isRequired,

    createLike: PropTypes.func.isRequired,
    deleteLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
}

export default withStyles(styles)(PostItem);