import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CommentsList from './CommentsList'

import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import GifIcon from '@material-ui/icons/Gif';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import LinkIcon from '@material-ui/icons/Link';
import Divider from '@material-ui/core/Divider';
import ShareIcon from '@material-ui/icons/Share';
import ImageIcon from '@material-ui/icons/Image';
import ListItem from '@material-ui/core/ListItem';
import GridList from '@material-ui/core/GridList';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import PersonIcon from '@material-ui/icons/Person';
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
import GridListTile from '@material-ui/core/GridListTile';
import ListItemText from '@material-ui/core/ListItemText';
import DialogActions from '@material-ui/core/DialogActions';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({
    card: {
        maxWidth: '530px',
        minWidth: '250px',
        width: '100%',
        margin: '0.6em',
        borderRadius: 0,
        '@media (max-width: 600px)': {
            margin: '0.6em 0'
        },
        '& a': {
            textDecoration: 'none',
        }
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
            content: '"\\1f892"',
            margin: '0 0.5em',
            fontSize: '1.3em'
        },
        '& a': {
            color: 'inherit'
        }
    },
    headerAction: {
        '@media (max-width: 600px)': {
            marginRight: 0
        },
    },
    headerPostLinkIcon: {
        position: 'absolute',
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
    description: {
        paddingTop: 0,
        '& a': {
            color: theme.palette.primary.main
        },
        '& span': {
            color: theme.palette.primary.main
        }
    },
    content: {
        position: 'relative'
    },
    mediaFile: {
        width: '100%',
        height: '100%'
    },
    mediaLinkImg: {
        width: '100%',
        height: '300px',
        border: 0
    },
    mediaLinkSrc: {
        position: 'absolute',
        bottom: '1em',
        left: '1em'
    },
    mediaCenterActionButton: {
        top: '50%',
        left: '50%',
        margin: 0,
        zIndex: 1,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
    },
    mediaMimeIcon: {
        position: 'absolute',
        bottom: '1em',
        right: '1em'
    },
    mediaPollImg: {
        height: '250px'
    },
    mediaPollText: {
        margin: '10px',
        background: theme.palette.primary.main,
        cursor: 'pointer',
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center',
        // '& :nth(1)': {
        //     paddingLeft: '16px'
        // }
    },
    mediaPollTextHeight: {
        lineheight: '48px'
    },
    mediaPollStatus: {
        paddingTop: 0,
        display: 'flex',
        justifyContent: 'space-between',
        '& a': {
            color: theme.palette.primary.main
        }
    },


    mediaPollListItems: {
        borderColor: theme.palette.divider,
        borderWidth: '1px',
        borderStyle: 'solid',
        marginBottom: '-1px',
    },
    mediaPollListImg: {
        width: '80px',
        height: '80px',
        display: 'flex',
        position: 'relative',
        backgroundColor: theme.palette.action.hover,
        borderColor: theme.palette.divider,
        borderWidth: '0 1px 0 0',
        borderStyle: 'solid',
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
        flex: 1,
        '& p': {
            margin: '0 5px'
        }
    },
    actionsFullWidth: {
        flex: 1
    },
    commentAvatar: {
        width: 30,
        height: 30,
        marginRight: '0.5em'
    },
})


const PostContent = ({
    post, isAutoGifs, isFullAccess, userAvatar, classes, togglePostValue,
    getComments, toggleNewCommentForm, changeNewComment, changePostDescription,
    postNewComment, createVote, deleteVote, createLike, deleteLike, updatePost,
    deletePost, formateDate, searchQuery
}) => {

    const postOptionsMenu = (
        <Menu
            key='postOptionsMenu'
            id="postOptionsMenu"
            anchorEl={document.getElementById(`post${post.id}OptionsMenuButton`)}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={post.isOptionsMenuOpen}
            onClose={() => togglePostValue('isOptionsMenuOpen')}
        >
            <MenuItem onClick={deletePost}>
                <ListItemText primary="Delete post" />
            </MenuItem>
            <MenuItem onClick={() => togglePostValue('isEditingModeOn')}>
                <ListItemText primary="Edit description" />
            </MenuItem>
            <MenuItem onClick={() => updatePost('commentable', !post.commentable)}>
                <ListItemText
                    primary={`Turn ${post.commentable ? 'off' : 'on'} comments`}
                />
            </MenuItem>
            <MenuItem onClick={() => updatePost('archived', !post.archived)}>
                <ListItemText
                    primary={`${post.archived ? 'Don\'t archive' : 'Archive'} post`}
                />
            </MenuItem>
        </Menu>
    )

    const actionsButtons = (
        <span className={classes.actionsToolbar}>
            <IconButton
                color={post.my_like_id ? 'primary' : 'default'}
                onClick={post.my_like_id === null ? createLike : deleteLike}
            >
                <ThumbUpIcon />
            </IconButton>
            <Typography variant='body1'>{post.likes_cnt}</Typography>
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
            <Typography variant='body1'>{post.reposts_cnt}</Typography>
            {
                isFullAccess &&
                <IconButton
                    onClick={() => togglePostValue('isOptionsMenuOpen')}
                    id={`post${post.id}OptionsMenuButton`}
                >
                    <MoreHorizIcon />
                    {postOptionsMenu}
                </IconButton>
            }
        </span>
    )


    const postHeader = (
        <CardHeader
            color='default'
            classes={{
                action: classes.headerAction,
                content: classes.headerContent
            }}
            avatar={
                <Avatar
                    component={Link}
                    to={`/${post.author.username}`}
                    className={classes.headerAvatar}
                    srcSet={`data:image/png;base64,${post.author.avatar}`}
                    aria-label={post.author.username}
                />
            }
            title={
                <Link to={`/${post.author.username}`} >
                    {post.author.username}
                </Link>
            }
            subheader={
                post.community_name &&
                <Link to={`/communities/${post.community_name}`}>
                    {post.community_name}
                </Link>
            }
            action={
                <IconButton
                    component={Link}
                    to={`/posts/${post.slug}`}
                    aria-label="Share"
                    classes={{ label: classes.headerShiftOnHover }}
                >
                    <Typography
                        variant='caption'
                        color='textSecondary'
                    >
                        {formateDate(post.created_at)}
                    </Typography>
                    <OpenInNewIcon className={classes.headerPostLinkIcon} />
                </IconButton>
            }
        />
    )

    const postDescription = (
        <Collapse in={!post.isEditingModeOn && post.description.length > 0}>
            <CardContent className={classes.description}>
                <Typography variant='body2'>
                    {
                        post.description.trim().split(' ').map((word, index) => {

                            if (word.charAt(0) !== '#') {
                                if (searchQuery !== word) return `${word} `
                                return 
                                <span key={word + index}>{`${word} `}</span>
                            }
                            return (
                                <Link
                                    to={`/tags/${word.substr(1)}`}
                                    key={word}
                                >
                                    {word}&nbsp;
                                </Link>
                            )
                        })
                    }
                </Typography>
            </CardContent>
        </Collapse>
    )

    const postDescriptionEditingForm = (
        <Collapse in={post.isEditingModeOn}>
            <CardContent className={classes.description}>
                <DialogActions>
                    <Button onClick={() => togglePostValue('isEditingModeOn')}>
                        Cansel
                                    </Button>
                    <Button
                        onClick={() => {
                            updatePost('description', post.newDescription)
                            togglePostValue('isEditingModeOn')
                        }}
                        color="primary"
                    >
                        Save
                                    </Button>
                </DialogActions>
                <Input
                    autoFocus={post.isEditingModeOn}
                    fullWidth
                    placeholder='Add description'
                    disableUnderline
                    color='secondary'
                    multiline
                    value={post.newDescription}
                    onChange={(ev) => changePostDescription(ev.target.value)}
                />
            </CardContent>
        </Collapse>
    )

    const postFilesContent = (
        !post.content ? null :
            post.content.length === 1 ?
                <div className={classes.content}>
                    <Link to={{
                        pathname: '/album',
                        state: {
                            modal: true,
                            currentIndex: 0,
                            files: post.content,
                            postId: post.id,
                            author: post.author,
                            postStats: {
                                likes_cnt: post.likes_cnt,
                                comments_cnt: post.comments_cnt,
                                reposts_cnt: post.reposts_cnt
                            }
                        }
                    }}>
                        <CardMedia
                            component={
                                post.content[0].mime === 'video/mp4' ? 'video' : 'img'
                            }
                            src={
                                post.content[0].mime === 'image/gif' && !isAutoGifs ?
                                    post.content[0].thumb :
                                    post.content[0].file
                            }
                        />
                    </Link>
                    {
                        post.content[0].mime === 'image/gif' &&
                        <IconButton className={classes.mediaCenterActionButton}>
                            <PlayCircleFilledIcon />
                        </IconButton>
                    }
                    {
                        post.content[0].mime === 'image/gif' &&
                        <GifIcon className={classes.mediaMimeIcon} />
                    }
                </div> :
                <GridList /* cellHeight='auto' */>
                    {
                        post.content.map((file, i) =>
                            <GridListTile
                                key={file.thumb}
                                cols={
                                    post.content.length === 2 ? 1 :
                                        i === 0 ? 2 : 2 / (post.content.length - 1)
                                }
                                rows={
                                    post.content.length === 2 ? 1.8 :
                                        i === 0 ? 2 : post.content.length > 3 ? 0.5 : 1
                                }
                            >
                                <Link to={{
                                    pathname: '/album',
                                    state: {
                                        modal: true,
                                        currentIndex: i,
                                        files: post.content,
                                        postId: post.id,
                                        author: post.author,
                                        postStats: {
                                            likes_cnt: post.likes_cnt,
                                            comments_cnt: post.comments_cnt,
                                            reposts_cnt: post.reposts_cnt
                                        }
                                    }
                                }}>
                                    <CardMedia
                                        className={classes.mediaFile}
                                        image={file.thumb}
                                    />
                                </Link>
                            </GridListTile>
                        )
                    }
                </GridList>
    )

    const postLinkContent = (
        post.content &&
        <div className={classes.content}>
            <Divider />
            {
                post.content[0].type !== 'embed' &&
                <a
                    href={post.content[0].link}
                    target='_blank'
                >
                    {
                        post.content[0].type === 'file' &&
                        !post.content[0].img &&
                        <CardContent>
                            <Typography
                                variant='subheading'
                                color='secondary'
                                paragraph
                            >
                                {post.content[0].link}
                            </Typography>
                            <Typography variant='body1'>
                                {post.content[0].src}
                            </Typography>
                        </CardContent>
                    }
                    {
                        post.content[0].type === 'page' &&
                        <CardContent>
                            <Typography
                                variant='body1'
                                paragraph={!post.content[0].img}
                            >
                                {
                                    post.content[0].description ||
                                    post.content[0].title
                                }
                            </Typography>
                            {
                                !post.content[0].img &&
                                <Typography variant='body1'>
                                    {post.content[0].src}
                                </Typography>
                            }
                        </CardContent>
                    }
                    {
                        post.content[0].img &&
                        <div>
                            {
                                post.content[0].type === 'page' &&
                                <CardMedia
                                    className={classes.mediaLinkImg}
                                    image={post.content[0].img}
                                />
                            }
                            {
                                post.content[0].type === 'file' &&
                                <CardMedia
                                    component='img'
                                    src={post.content[0].img}
                                />
                            }
                            <Chip
                                className={classes.mediaLinkSrc}
                                label={post.content[0].src}
                            />
                        </div>
                    }
                </a>
            }
            {
                post.content[0].type === 'embed' &&
                <CardMedia
                    className={classes.mediaLinkImg}
                    component='iframe'
                    src={post.content[0].link}
                />
            }
        </div>
    )

    const postPollContent = (
        post.content &&
        <div>
            <CardContent className={classes.mediaPollStatus}>
                {
                    post.content.some(ans => parseInt(ans.count, 10)) ?
                        <Typography component='a' href='#'>
                            {post.content.reduce((a, b) =>
                                parseInt(a.count, 10) + parseInt(b.count, 10))}
                            &nbsp;voices
                                </Typography> :
                        <Typography color='textSecondary'>
                            No one voted yet
                        </Typography>
                }
                {
                    !post.content[0].ends_at ? null :
                        moment(Date.now()).isSameOrAfter(post.content[0].ends_at, 'days') ?
                            <Typography color='textSecondary'>
                                finished
                            </Typography> :
                            <Typography color='primary'>
                                ends after {formateDate(post.content[0].ends_at)}
                            </Typography>

                }
            </CardContent>
            {
                post.content.length === 2 && post.content[0].img ?
                    <GridList cellHeight='auto'>
                        {
                            post.content.map((ans, i) =>
                                <GridListTile key={ans.text}>
                                    <Link to={{
                                        pathname: '/album',
                                        state: {
                                            modal: true,
                                            currentIndex: i,
                                            files: post.content.map((post) => {
                                                return { file: post.img }
                                            }),
                                            postId: ans.post_id,
                                            author: post.author,
                                            postStats: {
                                                likes_cnt: post.likes_cnt,
                                                comments_cnt: post.comments_cnt,
                                                reposts_cnt: post.reposts_cnt
                                            }
                                        }
                                    }}>
                                        <CardMedia
                                            image={ans.thumb}
                                            className={classes.mediaPollImg}
                                        />
                                    </Link>
                                    <GridListTileBar
                                        title={ans.text}
                                        classes={{ root: classes.mediaPollText }}
                                        onClick={() => {
                                            ans.my_vote ? deleteVote(ans.id) :
                                                createVote(ans.id)
                                        }}
                                        actionPosition='left'
                                        actionIcon={
                                            ans.my_vote &&
                                            <IconButton disabled>
                                                <CheckCircleIcon />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            )
                        }
                    </GridList>
                    :
                    <List>
                        {
                            post.content.map((ans, i) =>
                                <ListItem
                                    key={ans.id}//ans.img || ans.text
                                    disableGutters
                                    className={classes.mediaPollListItems}
                                    style={{ padding: '0' }}
                                >
                                    {
                                        ans.thumb &&
                                        <Link to={{
                                            pathname: '/album',
                                            state: {
                                                modal: true,
                                                currentIndex: i,
                                                files: post.content.map((post) => {
                                                    return { file: post.img }
                                                }),
                                                postId: ans.post_id,
                                                author: post.author,
                                                postStats: {
                                                    likes_cnt: post.likes_cnt,
                                                    comments_cnt: post.comments_cnt,
                                                    reposts_cnt: post.reposts_cnt
                                                }
                                            }
                                        }}>
                                            <CardMedia
                                                image={ans.thumb}
                                                className={classes.mediaPollListImg}
                                            />
                                        </Link>
                                    }
                                    <div style={{ width: '100%' }}>
                                        <LinearProgress
                                            color='secondary'
                                            variant="determinate"
                                            //style={{ position: 'absolute' }}
                                            value={
                                                (parseInt(ans.count, 10) * 100) /
                                                (post.content.reduce((a, b) =>
                                                    parseInt(a.count, 10) + parseInt(b.count, 10)))
                                            }
                                        />
                                        <ListItemText
                                            classes={{ root: classes.mediaPollText }}
                                            onClick={() => {
                                                moment(Date.now())
                                                    .isSameOrAfter(post.content[0].ends_at, 'days')
                                                    ? null : ans.my_vote ? deleteVote(ans.id) :
                                                        createVote(ans.id)
                                            }}
                                        >
                                            {
                                                ans.my_vote &&
                                                <IconButton disabled>
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            }
                                            {ans.text}
                                            {
                                                moment(Date.now())
                                                    .isSameOrAfter(post.content[0].ends_at, 'days') ?
                                                    (parseInt(ans.count, 10) * 100) /
                                                    (post.content.reduce((a, b) =>
                                                        parseInt(a.count, 10) + parseInt(b.count, 10)))
                                                    :
                                                    post.content.some(ans => parseInt(ans.my_vote, 10)) ?

                                                        (parseInt(ans.count, 10) * 100) /
                                                        (post.content.reduce((a, b) =>
                                                            parseInt(a.count, 10) + parseInt(b.count, 10)))
                                                        : null
                                            }
                                        </ListItemText>
                                    </div>

                                </ListItem>
                            )}
                    </List >
            }
        </div>
    )

    const postRepostContent = (
        <div>repost</div>
    )

    return (
        <Card
            elevation={1}
            className={classes.card}
        >
            {postHeader}

            {postDescription}
            {postDescriptionEditingForm}


            {/* media */}
            {post.type === 'file' && postFilesContent}
            {post.type === 'link' && postLinkContent}
            {post.type === 'poll' && postPollContent}
            {post.type === 'repost' && postRepostContent}


            {/* comments */}
            {
                !post.commentable &&
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
                                onClick={() => togglePostValue('showComments')}
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
            <Divider light />
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
                            multiline={post.newComment.length > 50}
                            startAdornment={
                                <InputAdornment position="start" >
                                    <Avatar
                                        className={classes.commentAvatar}
                                        srcSet={
                                            userAvatar &&
                                            `data:image/png;base64,${userAvatar}`
                                        }
                                        children={!userAvatar && <PersonIcon />}
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
                            Publish
                        </Button>
                    </span>
                </CardActions>
            </Collapse>

        </Card >
    )
}

PostContent.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
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
                count: PropTypes.any,
                text: PropTypes.string,
                my_vote: PropTypes.number
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
        ),
        isOptionsMenuOpen: PropTypes.bool.isRequired,
        isEditingModeOn: PropTypes.bool.isRequired
    }),

    classes: PropTypes.object.isRequired,
    userAvatar: PropTypes.string,
    isFullAccess: PropTypes.bool.isRequired,
    searchQuery: PropTypes.string.isRequired,

    formateDate: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    changePostDescription: PropTypes.func.isRequired,
    togglePostValue: PropTypes.func.isRequired,
    toggleNewCommentForm: PropTypes.func.isRequired,
    changeNewComment: PropTypes.func.isRequired,
    postNewComment: PropTypes.func.isRequired,

    createLike: PropTypes.func.isRequired,
    deleteLike: PropTypes.func.isRequired,
    createVote: PropTypes.func.isRequired,
    deleteVote: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
}

export default withStyles(styles)(PostContent);