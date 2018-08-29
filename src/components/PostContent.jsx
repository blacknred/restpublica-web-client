import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CommentsList from './CommentsList';

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
import ArchiveIcon from '@material-ui/icons/Archive';
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
        minWidth: '140px',
        width: '100%',
        borderRadius: 0,
        marginBottom: '20px',
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.14)',
        '& a': {
            textDecoration: 'none',
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
    index, isAutoGifs, isFullAccess, userAvatar, classes, togglePostValue,
    getComments, toggleNewCommentForm, changeNewComment, changePostDescription,
    postNewComment, createVote, deleteVote, createLike, deleteLike, updatePost,
    deletePost, formateDate, searchQuery, ...props
}) => {

    const postOptionsMenu = (
        <Menu
            key='postOptionsMenu'
            id="postOptionsMenu"
            anchorEl={document.getElementById(`post${props.post.id}OptionsMenuButton`)}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={props.post.isOptionsMenuOpen}
            onClose={() => togglePostValue('isOptionsMenuOpen')}
        >
            <MenuItem onClick={deletePost}>
                <ListItemText primary="Delete post" />
            </MenuItem>
            <MenuItem onClick={() => togglePostValue('isEditingModeOn')}>
                <ListItemText primary="Edit description" />
            </MenuItem>
            <MenuItem onClick={() => updatePost('commentable', !props.post.commentable)}>
                <ListItemText
                    primary={`Turn ${props.post.commentable ? 'off' : 'on'} comments`}
                />
            </MenuItem>
            <MenuItem onClick={() => updatePost('archived', !props.post.archived)}>
                <ListItemText
                    primary={`${props.post.archived ? 'Don\'t archive' : 'Archive'} post`}
                />
            </MenuItem>
        </Menu>
    )

    const actionsButtons = (
        <span className={classes.actionsToolbar}>
            <IconButton
                color={props.post.my_like_id ? 'primary' : 'default'}
                onClick={props.post.my_like_id === null ? createLike : deleteLike}
            >
                <ThumbUpIcon />
            </IconButton>
            <Typography variant='body1'>{props.post.likes_cnt}</Typography>
            <IconButton
                component={Link}
                to={{
                    pathname: '/post',
                    state: {
                        modal: true,
                        repost: {
                            id: props.post.id,
                            author: props.post.author
                        }
                    }
                }}
            >
                <ShareIcon />
            </IconButton>
            <Typography variant='body1'>{props.post.reposts_cnt}</Typography>
            {
                isFullAccess &&
                <IconButton
                    onClick={() => togglePostValue('isOptionsMenuOpen')}
                    id={`post${props.post.id}OptionsMenuButton`}
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
                    to={`/${props.post.author.username}`}
                    className={classes.headerAvatar}
                    srcSet={`data:image/png;base64,${props.post.author.avatar}`}
                    aria-label={props.post.author.username}
                />
            }
            title={
                <Link to={`/${props.post.author.username}`} >
                    {props.post.author.username}
                </Link>
            }
            subheader={
                props.post.community_name &&
                <Link to={`/communities/${props.post.community_name}`}>
                    {props.post.community_name}
                </Link>
            }
            action={
                <IconButton
                    component={Link}
                    to={`/post/${props.post.slug}`}
                    aria-label="Share"
                    classes={{ label: classes.headerShiftOnHover }}
                >
                    {
                        props.post.archived ?
                            <ArchiveIcon /> :
                            <Typography
                                variant='caption'
                                color='textSecondary'
                            >
                                {formateDate(props.post.created_at)}
                            </Typography>
                    }
                    <OpenInNewIcon className={classes.headerPostLinkIcon} />
                </IconButton>
            }
        />
    )

    const postDescription = (
        <Collapse in={!props.post.isEditingModeOn && props.post.description.length > 0}>
            <CardContent className={classes.description}>
                <Typography variant='body2'>
                    {
                        props.post.description.trim().split(' ').map((word, index) => {

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
        <Collapse in={props.post.isEditingModeOn}>
            <CardContent className={classes.description}>
                <DialogActions>
                    <Button onClick={() => togglePostValue('isEditingModeOn')}>
                        Cansel
                                    </Button>
                    <Button
                        onClick={() => {
                            updatePost('description', props.post.newDescription)
                            togglePostValue('isEditingModeOn')
                        }}
                        color="primary"
                    >
                        Save
                                    </Button>
                </DialogActions>
                <Input
                    autoFocus={props.post.isEditingModeOn}
                    fullWidth
                    placeholder='Add description'
                    disableUnderline
                    color='secondary'
                    multiline
                    value={props.post.newDescription}
                    onChange={(ev) => changePostDescription(ev.target.value)}
                />
            </CardContent>
        </Collapse>
    )

    const postFilesContent = (
        !props.post.content ? null :
            props.post.content.length === 1 ?
                <div className={classes.content}>
                    <Link to={{
                        pathname: '/album',
                        state: {
                            modal: true,
                            currentIndex: 0,
                            files: props.post.content,
                            postId: props.post.id,
                            author: props.post.author,
                            postStats: {
                                likes_cnt: props.post.likes_cnt,
                                comments_cnt: props.post.comments_cnt,
                                reposts_cnt: props.post.reposts_cnt
                            }
                        }
                    }}>
                        <CardMedia
                            component={
                                props.post.content[0].mime === 'video/mp4' ? 'video' : 'img'
                            }
                            src={
                                props.post.content[0].mime === 'image/gif' && !isAutoGifs ?
                                    props.post.content[0].thumb :
                                    props.post.content[0].file
                            }
                        />
                    </Link>
                    {
                        props.post.content[0].mime === 'image/gif' &&
                        <IconButton className={classes.mediaCenterActionButton}>
                            <PlayCircleFilledIcon />
                        </IconButton>
                    }
                    {
                        props.post.content[0].mime === 'image/gif' &&
                        <GifIcon className={classes.mediaMimeIcon} />
                    }
                </div> :
                <GridList /* cellHeight='auto' */>
                    {
                        props.post.content.map((file, i) =>
                            <GridListTile
                                key={file.thumb}
                                cols={
                                    props.post.content.length === 2 ? 1 :
                                        i === 0 ? 2 : 2 / (props.post.content.length - 1)
                                }
                                rows={
                                    props.post.content.length === 2 ? 1.8 :
                                        i === 0 ? 2 : props.post.content.length > 3 ? 0.5 : 1
                                }
                            >
                                <Link to={{
                                    pathname: '/album',
                                    state: {
                                        modal: true,
                                        currentIndex: i,
                                        files: props.post.content,
                                        postId: props.post.id,
                                        author: props.post.author,
                                        postStats: {
                                            likes_cnt: props.post.likes_cnt,
                                            comments_cnt: props.post.comments_cnt,
                                            reposts_cnt: props.post.reposts_cnt
                                        }
                                    }
                                }}>
                                    <CardMedia
                                        className={classes.mediaFile}
                                        component='picture'
                                        src={file.thumb}
                                    />
                                </Link>
                            </GridListTile>
                        )
                    }
                </GridList>
    )

    const postLinkContent = (
        props.post.content &&
        <div className={classes.content}>
            <Divider />
            {
                props.post.content[0].type !== 'embed' &&
                <a
                    href={props.post.content[0].link}
                    target='_blank'
                >
                    {
                        props.post.content[0].type === 'file' &&
                        !props.post.content[0].img &&
                        <CardContent>
                            <Typography
                                variant='subheading'
                                color='secondary'
                                paragraph
                            >
                                {props.post.content[0].link}
                            </Typography>
                            <Typography variant='body1'>
                                {props.post.content[0].src}
                            </Typography>
                        </CardContent>
                    }
                    {
                        props.post.content[0].type === 'page' &&
                        <CardContent>
                            <Typography
                                variant='body1'
                                paragraph={!props.post.content[0].img}
                            >
                                {
                                    props.post.content[0].description ||
                                    props.post.content[0].title
                                }
                            </Typography>
                            {
                                !props.post.content[0].img &&
                                <Typography variant='body1'>
                                    {props.post.content[0].src}
                                </Typography>
                            }
                        </CardContent>
                    }
                    {
                        props.post.content[0].img &&
                        <div>
                            {
                                props.post.content[0].type === 'page' &&
                                <CardMedia
                                    className={classes.mediaLinkImg}
                                    image={props.post.content[0].img}
                                />
                            }
                            {
                                props.post.content[0].type === 'file' &&
                                <CardMedia
                                    component='img'
                                    src={props.post.content[0].img}
                                />
                            }
                            <Chip
                                className={classes.mediaLinkSrc}
                                label={props.post.content[0].src}
                            />
                        </div>
                    }
                </a>
            }
            {
                props.post.content[0].type === 'embed' &&
                <CardMedia
                    className={classes.mediaLinkImg}
                    component='iframe'
                    src={props.post.content[0].link}
                />
            }
        </div>
    )

    const postPollContent = (
        props.post.content &&
        <div>
            <CardContent className={classes.mediaPollStatus}>
                {
                    props.post.content.some(ans => parseInt(ans.count, 10)) ?
                        <Typography component='a' href='#'>
                            {props.post.content.reduce((a, b) =>
                                parseInt(a.count, 10) + parseInt(b.count, 10))}
                            &nbsp;voices
                                </Typography> :
                        <Typography color='textSecondary'>
                            No one voted yet
                        </Typography>
                }
                {
                    !props.post.content[0].ends_at ? null :
                        moment(Date.now()).isSameOrAfter(props.post.content[0].ends_at, 'days') ?
                            <Typography color='textSecondary'>
                                finished
                            </Typography> :
                            <Typography color='primary'>
                                ends after {formateDate(props.post.content[0].ends_at)}
                            </Typography>

                }
            </CardContent>
            {
                props.post.content.length === 2 && props.post.content[0].img ?
                    <GridList cellHeight='auto'>
                        {
                            props.post.content.map((ans, i) =>
                                <GridListTile key={ans.text}>
                                    <Link to={{
                                        pathname: '/album',
                                        state: {
                                            modal: true,
                                            currentIndex: i,
                                            files: props.post.content.map((post) => {
                                                return { file: props.post.img }
                                            }),
                                            postId: ans.post_id,
                                            author: props.post.author,
                                            postStats: {
                                                likes_cnt: props.post.likes_cnt,
                                                comments_cnt: props.post.comments_cnt,
                                                reposts_cnt: props.post.reposts_cnt
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
                            props.post.content.map((ans, i) =>
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
                                                files: props.post.content.map((post) => {
                                                    return { file: props.post.img }
                                                }),
                                                postId: ans.post_id,
                                                author: props.post.author,
                                                postStats: {
                                                    likes_cnt: props.post.likes_cnt,
                                                    comments_cnt: props.post.comments_cnt,
                                                    reposts_cnt: props.post.reposts_cnt
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
                                                (props.post.content.reduce((a, b) =>
                                                    parseInt(a.count, 10) + parseInt(b.count, 10)))
                                            }
                                        />
                                        <ListItemText
                                            classes={{ root: classes.mediaPollText }}
                                            onClick={() => {
                                                moment(Date.now())
                                                    .isSameOrAfter(props.post.content[0].ends_at, 'days')
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
                                                    .isSameOrAfter(props.post.content[0].ends_at, 'days') ?
                                                    (parseInt(ans.count, 10) * 100) /
                                                    (props.post.content.reduce((a, b) =>
                                                        parseInt(a.count, 10) + parseInt(b.count, 10)))
                                                    :
                                                    props.post.content.some(ans => parseInt(ans.my_vote, 10)) ?

                                                        (parseInt(ans.count, 10) * 100) /
                                                        (props.post.content.reduce((a, b) =>
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
                {props.post.type === 'file' && postFilesContent}
                {props.post.type === 'link' && postLinkContent}
                {props.post.type === 'poll' && postPollContent}
                {props.post.type === 'repost' && postRepostContent}


                {/* comments */}
                {
                    !props.post.commentable &&
                    props.post.comments_cnt > 0 &&
                    <Hidden
                        only={props.post.listMode ? 'xs' : null}
                        className={classes.comments}
                    >
                        <CardActions className={classes.actions}>
                            {
                                props.post.listMode &&
                                props.post.comments_cnt > 0 &&
                                <Button
                                    onClick={() => togglePostValue('showComments')}
                                    color='primary'
                                >
                                    {`${props.post.toggleComments ? 'Hide' : 'Show'}
                                        all comments ${props.post.comments_cnt}`}
                                </Button>
                            }
                            {!props.post.listMode && actionsButtons}
                        </CardActions>
                        <LinearProgress />
                        <CommentsList
                            comments={props.post.comments}
                            comments_cnt={parseInt(props.post.comments_cnt, 10)}
                            showComments={props.post.showComments}
                            hasMoreComments={props.post.hasMoreComments}
                            getComments={getComments}
                            formateDate={formateDate}
                        />
                    </Hidden>
                }

                {/* actions */}
                <Divider light />
                <CardActions className={classes.actions}>
                    {/* <Collapse
                    in={props.post.commentable}
                    className={classes.actionsFullWidth}
                >
                    <Hidden only={[!props.post.listMode ? 'xs' : null, 'sm', 'md', 'lg', 'xl']}>
                        <span className={classes.actionsToolbar}>
                            <IconButton
                                aria-label="Discussion"
                                component={Link}
                                to={`/post/${props.post.slug}`}
                            >
                                <CommentIcon />
                            </IconButton>
                            <Typography>
                                &nbsp;{props.post.comments_cnt}&nbsp;
                            </Typography>
                        </span>
                    </Hidden>
                    <Hidden only={props.post.listMode ? 'xs' : null}>
                        <Input
                            fullWidth={true}
                            autoFocus={props.post.showCommentForm}
                            placeholder="Write a comment"
                            disableUnderline={true}
                            value={props.post.newComment}
                            multiline={props.post.newComment.length > 50}
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
                            onClick={!props.post.showCommentForm ? toggleNewCommentForm : null}
                            onChange={(ev) => changeNewComment(ev.target.value)}
                        />
                    </Hidden>
                </Collapse> */}
                    <Collapse
                        in={!props.post.showCommentForm && props.post.listMode}
                        style={{ width: props.post.showCommentForm ? 0 : 'auto' }}
                    >
                        {actionsButtons}
                    </Collapse>
                </CardActions>

                {/* comment form */}
                <Collapse in={props.post.showCommentForm}>
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
                                disabled={props.post.newComment.length === 0}
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