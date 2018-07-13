import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FileDownloadIcon from '@material-ui/icons/FileDownload';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';

const styles = theme => ({
    dialog: {
        background: theme.palette.common.black,
        // color: theme.palette.common.white
    },
    toolbar: {
        justifyContent: 'space-between',
        '& p': {
            margin: '0 0.5em'
        }
    },
    author: {
        display: 'flex',
        alignItems: 'center',
        color: 'inherit',
        textDecoration: 'none'
    },
    media: {
        width: 'auto',
        height: 'auto',
        maxHeight: '90%',
        maxWidth: '80%',
        top: '50%',
        left: '50%',
        position: 'absolute',
        margin: 0,
        transform: 'translate(-50%, -50%)'
    },
    iconMini: {
        fontSize: '20px'
    },
    iconLeft: {
        position: 'fixed',
        left: '0.5em',
        top: '50%'
    },
    iconRight: {
        position: 'fixed',
        right: '0.5em',
        top: '50%'
    }
})

const GrowTransition = props => <Grow {...props} />

const AlbumContent = ({
    isOpen, classes, index, files, showControls, postStats, author, postId,
    close, closeDialog, changeSrc, toggleShowControls
}) =>
    <Dialog
        keepMounted
        open={isOpen}
        onExited={close}
        onEscapeKeyDown={closeDialog}
        fullScreen
        TransitionComponent={GrowTransition}
        classes={{ paper: classes.dialog }}
        onClick={toggleShowControls}
    >
        {
            showControls &&
            <Toolbar
                className={classes.toolbar}
                disableGutters
            >
                <Toolbar disableGutters>
                    <IconButton
                        onClick={closeDialog}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Link
                        className={classes.author}
                        to={`/${author.username}/posts`}
                    >
                        <Avatar
                            srcSet={`data:image/png;base64,${author.avatar}`}
                            aria-label={author.username}
                        />
                        <Typography
                            variant='body1'
                        >
                            <b>{author.username}</b>
                        </Typography>
                    </Link>
                </Toolbar>

                <Toolbar disableGutters>
                    <Button
                        variant='fab'
                        mini
                    //color={post.my_like_id ? 'primary' : 'default'}
                    // onClick={post.my_like_id === null ? createLike : deleteLike}
                    >
                        <ThumbUpIcon className={classes.iconMini} />
                    </Button>
                    <Typography>
                        &nbsp;{postStats.likes_cnt}&nbsp;
                        </Typography>
                    <Button
                        variant='fab'
                        mini
                    >
                        <CommentIcon className={classes.iconMini} />
                    </Button>
                    <Typography color='inherit'>
                        &nbsp;{postStats.comments_cnt}&nbsp;
                        </Typography>
                    <Button
                        variant='fab'
                        mini
                        component={Link}
                        to={{
                            pathname: '/post',
                            state: {
                                modal: true,
                                repost: {
                                    id: postId,
                                    author: author
                                }
                            }
                        }}
                    >
                        <ShareIcon className={classes.iconMini} />
                    </Button>
                    <Typography color='inherit'>
                        &nbsp;{postStats.reposts_cnt}&nbsp;
                    </Typography>
                    <IconButton
                        component='a'
                        color='inherit'
                        href={files[index].file}
                        download
                    >
                        <FileDownloadIcon />
                    </IconButton>
                </Toolbar>


                <IconButton
                    disabled={index === 0}
                    className={classes.iconLeft}
                    color='inherit'
                    size='large'
                    onClick={e => changeSrc(e, 'left')}
                >
                    <ChevronLeftIcon size='large' />
                </IconButton>
                <IconButton
                    disabled={files.length === index + 1}
                    className={classes.iconRight}
                    color='inherit'
                    onClick={e => changeSrc(e, 'right')}
                >
                    <ChevronRightIcon />
                </IconButton>
            </Toolbar>
        }
        <CardMedia
            component='img' //video, audio, picture, iframe, img
            src={files[index].file}
            className={classes.media}
        />
    </Dialog>

AlbumContent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    showControls: PropTypes.bool.isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            file: PropTypes.string.isRequired,

        })
    ).isRequired,
    close: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    changeSrc: PropTypes.func.isRequired,
    toggleShowControls: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired,
    author: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
    postStats: PropTypes.shape({
        likes_cnt: PropTypes.string.isRequired,
        comments_cnt: PropTypes.string.isRequired,
    }).isRequired,
}

export default withStyles(styles)(AlbumContent);