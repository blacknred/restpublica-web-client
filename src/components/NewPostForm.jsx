import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller2';

import compose from 'recompose/compose';
import Menu from '@material-ui/core/Menu';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Zoom from '@material-ui/core/Zoom';
import Input from '@material-ui/core/Input';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import PollIcon from '@material-ui/icons/Poll';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import TimerIcon from '@material-ui/icons/Timer';
import ImageIcon from '@material-ui/icons/Image';
import GridList from '@material-ui/core/GridList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ListItemText from '@material-ui/core/ListItemText';
import GridListTile from '@material-ui/core/GridListTile';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContentText from '@material-ui/core/DialogContentText';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({
    hidden: {
        display: 'none'
    },
    form: {
        width: '530px',
    },
    fullForm: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    headerContent: {
        '&> *': {
            display: 'inline-block',
        },
        '&> :nth-child(2)': {
            color: 'grey'
        },
        '&> :nth-child(2):before': {
            content: '"\\203A"',
            margin: '0 0.5em'
        },
        '& a': {
            cursor: 'pointer'
        }
    },
    availableCommunitiesForm: {
        minWidth: '350px'
    },
    availableCommunitiesLoader: {
        flexBasis: '100%',
        width: '100%',
        textAlign: 'center'
    },
    content: {
        overflowY: 'auto',
        flex: 1,
        maxHeight: '500px',
        paddingTop: 0,
    },
    contentDescription: {
        minHeight: '90px',
    },
    contentRemoveButton: {
        position: 'absolute',
        right: '1%',
        marginTop: '1%',
        zIndex: 1
    },
    contentCenterActionButton: {
        top: '50%',
        left: '50%',
        margin: 0,
        zIndex: 1,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
    },
    contentBigIcon: {
        fontSize: '2em',
        '& :hover': {
            color: '#eee'
        }
    },
    contentFile: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    contentFileMedia: {
        width: '100%',
        height: '100%!important'
    },
    contentFileThumb: {
        height: '100%',
        width: 'auto'
    },

    contentLink: {
        borderColor: theme.palette.divider,
        borderWidth: '1px',
        borderStyle: 'solid',
        position: 'relative'
    },
    contentLinkThumb: {
        width: '100%',
        height: '250px'
    },

    contentPoll: {
        width: '400px'
    },
    contentPollItems: {
        borderColor: theme.palette.divider,
        borderWidth: '1px',
        borderStyle: 'solid',
        marginBottom: '-1px',
    },
    contentPollListImg: {
        width: '80px',
        height: '80px',
        display: 'flex',
        position: 'relative',
        backgroundColor: theme.palette.action.hover,
        borderColor: theme.palette.divider,
        borderWidth: '0 1px 0 0',
        borderStyle: 'solid',
    },
    contentPollGridImg: {
        height: '200px',
        display: 'flex',
        backgroundColor: theme.palette.action.hover,
        position: 'relative',
    },
    repostAvatar: {
        width: '28px',
        height: '28px',
        marginRight: '0.5em',
        borderRadius: '10%'
    },
})

const SlideTransition = props => <Slide direction='up' {...props} />

const ZoomTransition = props => <Zoom {...props} />

const NewPostForm = ({
    classes, width, isSlide, username, avatar, close, isOpen, isCloseConfirmOpen,
    isCommunitiesDialogOpen, isOptionsMenuOpen, isAddLinkDialogOpen, isPublishing,
    isAddPollDialogOpen, isPollEndDateDialogOpen, availableCommunities,
    commentable, archived, description, content,
    toggleContextDialog, toggleForm, getProfileCommunities, setCommunity,
    toggleCommentable, toggleArchived, changeDescription, addFile, removeFile,
    playFile, addLink, changeContentLink, removeLink, addPoll, removePoll,
    addPollAnswer, removePollAnswer, changePollAnswerText, changePollAnswerImg,
    changePollEndDate, removePollAnswerImg, createPost
}) => {

    const availableCommunitiesDialog = (
        <Dialog
            key='isCommunitiesDialogOpen'
            open={isCommunitiesDialogOpen}
            onClose={() => toggleContextDialog('isCommunitiesDialogOpen')}
        >
            <List className={classes.availableCommunitiesForm}>
                <ListItem>
                    <IconButton
                        onClick={() => toggleContextDialog('isCommunitiesDialogOpen')}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <ListItemText>
                        <Typography variant='button'>Choose one</Typography>
                    </ListItemText>
                </ListItem>
                <Divider />
                <ListItem>
                    <Input
                        fullWidth
                        disableUnderline
                        //value={ans.text}
                        placeholder='Search community'
                    />
                </ListItem>
                <Divider />
                <ListItem
                    button
                    key={'availableCommunity'}
                    onClick={() => {
                        setCommunity({ id: null, name: null })
                        toggleContextDialog('isCommunitiesDialogOpen')
                    }}
                >
                    <Avatar
                        srcSet={`data:image/png;base64,${avatar}`}
                    />
                    <ListItemText primary='Available for all' />
                </ListItem>
                {
                    !availableCommunities.empty &&
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={getProfileCommunities}
                        hasMore={availableCommunities.hasMore}
                        loader={<LinearProgress key='availableCommunitiesLinearProgress' />}
                        useWindow={false}
                    >
                        {
                            availableCommunities.list.map((com, i) =>
                                <ListItem
                                    button
                                    key={'availableCommunity' + com.id}
                                    onClick={() => {
                                        setCommunity({ id: com.id, name: com.title })
                                        toggleContextDialog('isCommunitiesDialogOpen')
                                    }}
                                >
                                    <Avatar
                                        srcSet={`data:image/png;base64,${com.avatar}`}
                                    />
                                    <ListItemText
                                        primary={com.title}
                                        secondary={
                                            `available for ${com.followers_cnt} users`
                                        }
                                    />
                                </ListItem>
                            )
                        }
                    </InfiniteScroll>
                }
            </List>
            <br />
        </Dialog>
    )

    const addLinkDialog = (
        <Dialog
            key='isAddLinkDialogOpen'
            open={isAddLinkDialogOpen}
            onClose={() => toggleContextDialog('isAddLinkDialogOpen')}
        >
            <DialogTitle>
                <Typography variant='button'>Paste link</Typography>
            </DialogTitle>
            <DialogContent>
                <Input
                    fullWidth
                    autoFocus
                    value={content.link}
                    onChange={(ev) => changeContentLink(ev.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleContextDialog('isAddLinkDialogOpen')}>
                    Cansel
                        </Button>
                <Button
                    color='primary'
                    disabled={content.link.length === 0}
                    onClick={() => {
                        addLink()
                        toggleContextDialog('isAddLinkDialogOpen')
                    }}
                >
                    Ok
                    </Button>
            </DialogActions>
        </Dialog>
    )

    const postOptionsMenu = (
        <Menu
            key='newPostOptionsMenu'
            id="newPostOptionsMenu"
            anchorEl={document.getElementById('newPostOptionsMenuButton')}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isOptionsMenuOpen}
            onClose={() => toggleContextDialog('isOptionsMenuOpen')}
        >
            <MenuItem onClick={() => {
                toggleContextDialog('isOptionsMenuOpen')
                toggleCommentable()
            }} >
                <ListItemText
                    primary={`Turn ${commentable ? 'off' : 'on'} comments`}
                />
            </MenuItem>
            <MenuItem onClick={() => {
                toggleContextDialog('isOptionsMenuOpen')
                toggleArchived()
            }} >
                <ListItemText
                    primary={`${archived ? 'Show' : 'Dont show'} post in other feeds`}
                />
            </MenuItem>
        </Menu>
    )

    const setPollEndDateDialog = (
        <Dialog
            key='isPollEndDateDialogOpen'
            open={isPollEndDateDialogOpen}
            onClose={() => toggleContextDialog('isPollEndDateDialogOpen')}
        >
            <DialogTitle>
                <Typography variant='button'>
                    Poll ends at
                </Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    type="date"
                    defaultValue={content.pollEndsAt}
                    onChange={(ev) => changePollEndDate(ev.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    onClick={() => toggleContextDialog('isPollEndDateDialogOpen')}
                >
                    Ok
                        </Button>
            </DialogActions>
        </Dialog>
    )

    const formPollGridContent = (
        <GridList cellHeight='auto'>
            {
                content.pollAnswers.map((ans, i) =>
                    <GridListTile
                        key={'poll_answer_' + i}
                        classes={{ tile: classes.contentPollItems }}
                    >
                        <div className={classes.contentPollGridImg}>
                            {
                                ans.thumb ?
                                    <CardMedia
                                        image={ans.thumb}
                                        className={classes.contentFileMedia}
                                    /> :
                                    <IconButton
                                        component='label'
                                        className={classes.contentCenterActionButton}
                                    >
                                        <input
                                            accept='image/*'
                                            type="file"
                                            className={classes.hidden}
                                            onChange={(e) => changePollAnswerImg(i, e)}
                                        />
                                        <AddAPhotoIcon />
                                    </IconButton>
                            }
                            {
                                ans.thumb && isAddPollDialogOpen &&
                                <IconButton
                                    className={classes.contentRemoveButton}
                                    onClick={() => removePollAnswerImg(i)}
                                >
                                    <RemoveCircleIcon color='secondary' />
                                </IconButton>
                            }
                        </div>
                        <Divider />
                        {
                            !(!isAddPollDialogOpen && !ans.text) &&
                            <CardActions>
                                <Input
                                    fullWidth
                                    disableUnderline
                                    disabled={!isAddPollDialogOpen}
                                    value={ans.text}
                                    placeholder={
                                        isAddPollDialogOpen ? 'Add new answer variant' : null
                                    }
                                    onChange={
                                        (ev) => changePollAnswerText(i, ev.target.value)
                                    }
                                />
                            </CardActions>
                        }
                    </GridListTile>
                )
            }
        </GridList>
    )

    const formPollListContent = (
        <List>
            {
                content.pollAnswers.map((ans, i) =>
                    <ListItem
                        key={'poll_answer_' + i}
                        disableGutters={isAddPollDialogOpen}
                        className={classes.contentPollItems}
                        style={isAddPollDialogOpen ? { padding: '0' } : null}
                    >
                        {
                            !isAddPollDialogOpen && !ans.thumb ? null :
                                <div className={classes.contentPollListImg}>
                                    {
                                        ans.thumb ?
                                            <CardMedia
                                                image={ans.thumb}
                                                className={classes.contentFileMedia}
                                            />
                                            :
                                            <IconButton
                                                component='label'
                                                className={classes.contentCenterActionButton}
                                            >
                                                <input
                                                    accept='image/*'
                                                    type="file"
                                                    className={classes.hidden}
                                                    onChange={
                                                        (e) => changePollAnswerImg(i, e)
                                                    }
                                                />
                                                <AddAPhotoIcon />
                                            </IconButton>
                                    }
                                    {
                                        ans.thumb && isAddPollDialogOpen &&
                                        <IconButton
                                            className={classes.contentCenterActionButton}
                                            onClick={() => removePollAnswerImg(i)}
                                        >
                                            <RemoveCircleIcon color='secondary' />
                                        </IconButton>
                                    }
                                </div>
                        }
                        <ListItemText>
                            <Input
                                fullWidth
                                disableUnderline
                                value={ans.text}
                                disabled={!isAddPollDialogOpen}
                                placeholder='Add new answer variant'
                                onChange={(ev) => changePollAnswerText(i, ev.target.value)}
                            />
                        </ListItemText>
                        {
                            i > 1 && isAddPollDialogOpen &&
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => removePollAnswer(i)}>
                                    <RemoveCircleIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        }

                    </ListItem>
                )
            }
        </List >
    )

    const addPollDialog = (
        <Dialog
            key='isAddPollDialogOpen'
            open={isAddPollDialogOpen}
            onClose={() => toggleContextDialog('isAddPollDialogOpen')}
        >
            <CardHeader
                title={
                    <Typography variant='button'>
                        New poll
                        </Typography>
                }
                action={
                    <IconButton
                        color={content.pollEndsAt ? 'primary' : 'default'}
                        onClick={() => toggleContextDialog('isPollEndDateDialogOpen')}
                    >
                        <TimerIcon />
                    </IconButton>
                }
            />
            {setPollEndDateDialog}
            <DialogContent className={classes.contentPoll}>
                {
                    content.pollAnswers.length > 2 ?
                        formPollListContent :
                        formPollGridContent
                }
                <DialogActions>
                    <Button onClick={addPollAnswer}>
                        Add new answer variant
                    </Button>
                </DialogActions>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleContextDialog('isAddPollDialogOpen')}>
                    Cansel
                </Button>
                <Button
                    color='primary'
                    disabled={
                        (
                            //content.pollMode === 'text' &&
                            content.pollAnswers.some(ans => ans.text === '')) ||
                        (content.pollMode === 'img' &&
                            content.pollAnswers.some(ans => ans.img === null))
                    }
                    onClick={() => {
                        addPoll()
                        toggleContextDialog('isAddPollDialogOpen')
                    }}
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )


    const formHeader = (
        <CardHeader
            classes={{ content: classes.headerContent }}
            avatar={<Avatar srcSet={`data:image/png;base64,${avatar}`} />}
            title={username}
            subheader={[
                <a
                    key='isCommunitiesDialogOpenLink'
                    onClick={() => toggleContextDialog('isCommunitiesDialogOpen')}
                >
                    {availableCommunities.selected ?
                        availableCommunities.selected.name :
                        'available for all'}
                </a>,
                availableCommunitiesDialog
            ]}
            action={
                [
                    <IconButton
                        key='newPostOptionsMenuButton'
                        id="newPostOptionsMenuButton"
                        aria-owns={'newPostOptionsMenu'}
                        aria-haspopup="true"
                        onClick={() => toggleContextDialog('isOptionsMenuOpen')}
                    >
                        <MoreVertIcon />
                    </IconButton>,
                    postOptionsMenu
                ]}
        />
    )

    const formDescription = (
        <Input
            className={classes.contentDescription}
            classes={{ input: classes.contentDescription }}
            fullWidth
            placeholder={
                content.type === 'text' ?
                    "What's up" :
                    content.type === 'poll' ?
                        'Ask question' :
                        'Add description'
            }
            disableUnderline
            multiline
            autoFocus
            value={description}
            onChange={(ev) => changeDescription(ev.target.value)}
        />
    )

    const formFileContent = (
        <GridList
            className={classes.contentFile}
            cols={0}
        >
            {
                content.thumbFiles.map((file, i) =>
                    <GridListTile
                        key={'content_file_' + i}
                        className={
                            content.thumbFiles.length === 1 ? classes.contentFileMedia : null
                        }
                    >
                        <IconButton
                            className={classes.contentRemoveButton}
                            onClick={() => removeFile(i)}
                        >
                            <RemoveCircleIcon color='secondary' />
                        </IconButton>
                        {
                            content.filesType === 'video' &&
                            <IconButton
                                className={classes.contentCenterActionButton}
                                onClick={playFile}
                            >
                                {
                                    !content.isVideoFilePlay ?
                                        <PlayCircleFilledIcon
                                            color='primary'
                                            className={classes.contentBigIcon}
                                        /> :
                                        <PauseCircleFilledIcon className={classes.contentBigIcon} />
                                }
                            </IconButton>
                        }

                        <CardMedia
                            className={
                                content.thumbFiles.length > 1 ? classes.contentFileThumb : null
                            }
                            component={content.filesType}
                            src={file || i}
                            onMouseEnter={(e) => {
                                content.filesType === 'video' &&
                                    (content.isVideoFilePlay ?
                                        e.target.play() :
                                        e.target.pause())
                            }}
                        // onClick={(e) => {
                        //     content.filesType === 'video' &&
                        //         e.target.paused ? e.target.play() : e.target.pause()
                        // }}
                        />
                    </GridListTile>
                )
            }
        </GridList>
    )

    const formLinkContent = (
        <Card
            elevation={0}
            className={classes.contentLink}
        >
            <div style={{ position: 'relative' }}>
                <IconButton
                    className={classes.contentRemoveButton}
                    onClick={removeLink}
                >
                    <RemoveCircleIcon color='secondary' />
                </IconButton>
                {
                    content.linkEmbed &&
                    <IconButton
                        disabled
                        className={classes.contentCenterActionButton}
                    >
                        <PlayCircleFilledIcon
                            color='primary'
                            className={classes.contentBigIcon}
                        />
                    </IconButton>
                }
                {
                    content.linkImg &&
                    <CardMedia
                        image={content.linkImg}
                        className={classes.contentLinkThumb}
                    />
                }
            </div>
            <CardContent>
                <Typography variant='body1'>
                    {content.linkTitle}
                </Typography>
                <Typography variant='body2'>
                    {content.linkSrc}
                </Typography>
                <Typography variant='caption'>
                    {content.linkDescription}
                </Typography>
            </CardContent>
        </Card>
    )

    const formPollContent = (
        <List>
            <ListItem disableGutters>
                <ListItemText primary={
                    'Ends: ' + (content.pollEndsAt ? content.pollEndsAt : 'never')
                } />
                <ListItemSecondaryAction>
                    <IconButton
                        size='small'
                        key='newPollDialogOpenButton'
                        onClick={() => toggleContextDialog('isAddPollDialogOpen')}
                    >
                        <EditIcon />
                    </IconButton>
                    {addPollDialog}
                    <IconButton
                        size='small'
                        key='newPollContentRemoveButton'
                        onClick={removePoll}
                    >
                        <RemoveCircleIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            {
                !isAddPollDialogOpen &&
                (content.pollAnswers.length === 2 && content.pollMode === 'img' ?
                    formPollGridContent :
                    formPollListContent)
            }
        </List>
    )

    const formRepostContent = (
        content.repost &&
        <ListItem disableGutters>
            <Avatar
                className={classes.repostAvatar}
                srcSet={`data:image/png;base64,${content.repost.author.avatar}`}
            />
            <Typography variant='button'>
                {content.repost.author.username}&nbsp;&nbsp;
            </Typography>
            <Typography variant='button' color='textSecondary'>
                published this entry first
            </Typography>
        </ListItem>
    )

    const contentActions = (
        <CardActions>
            <Tooltip title="Add file">
                <IconButton component='label' >
                    <input
                        accept='image/*,.mp4,.webm'
                        multiple
                        type="file"
                        className={classes.hidden}
                        onChange={addFile}
                    />
                    <ImageIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Add link">
                <IconButton onClick={
                    () => toggleContextDialog('isAddLinkDialogOpen')
                }>
                    <LinkIcon />
                </IconButton>
            </Tooltip>
            {addLinkDialog}
            <Tooltip title="Add poll">
                <IconButton onClick={
                    () => toggleContextDialog('isAddPollDialogOpen')
                }>
                    <PollIcon />
                </IconButton>
            </Tooltip>
            {addPollDialog}
        </CardActions>
    )

    const formActions = (
        <DialogActions>
            <Button onClick={toggleForm}>
                Cancel
                </Button>
            <Button
                color="primary"
                disabled={
                    (description.length === 0 && content.type === 'text') ||
                    isPublishing
                }
                onClick={createPost}
                variant='raised'
            >
                {isPublishing ? <CircularProgress size={20} /> : 'Publish'}
            </Button>
            <Dialog
                key='isCloseConfirmOpen'
                open={isCloseConfirmOpen}
                onClose={() => toggleContextDialog('isCloseConfirmOpen')}
            >
                <DialogContent>
                    <DialogContentText>Delete post?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => toggleContextDialog('isCloseConfirmOpen')}>
                        Save
                        </Button>
                    <Button
                        color='primary'
                        onClick={toggleForm}
                    >
                        Delete
                        </Button>
                </DialogActions>
            </Dialog>
        </DialogActions>
    )

    return (
        <Dialog
            keepMounted
            open={isOpen}
            onClose={toggleForm}
            onExited={close}
            fullScreen={width === 'xs' ? true : false}
            TransitionComponent={isSlide ? SlideTransition : ZoomTransition}
        >
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
                {formActions}
                <Divider />
                {content.isLoading && <LinearProgress />}
            </Hidden>
            <Card
                elevation={0}
                className={width === 'xs' ? classes.fullForm : classes.form}
            >
                {formHeader}
                <CardContent
                    className={classes.content}
                    style={width === 'xs' ? { maxHeight: '100%' } : null}
                >
                    {formDescription}
                    <Collapse in={!content.isLoading} unmountOnExit>
                        {
                            (content.type === 'file' && formFileContent) ||
                            (content.type === 'link' && formLinkContent) ||
                            (content.type === 'poll' && formPollContent) ||
                            (content.type === 'repost' && formRepostContent)
                        }
                    </Collapse>
                </CardContent>
                {content.type === 'text' && !content.isLoading && contentActions}
            </Card >
            <Hidden only='xs'>
                {content.isLoading && <LinearProgress />}
                <Divider />
                {formActions}
            </Hidden>
        </Dialog >
    )
}

NewPostForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isOptionsMenuOpen: PropTypes.bool.isRequired,
    isPublishing: PropTypes.bool.isRequired,
    isCommunitiesDialogOpen: PropTypes.bool.isRequired,
    isAddLinkDialogOpen: PropTypes.bool.isRequired,
    isAddPollDialogOpen: PropTypes.bool.isRequired,
    isPollEndDateDialogOpen: PropTypes.bool.isRequired,
    isCloseConfirmOpen: PropTypes.bool.isRequired,
    isSlide: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    availableCommunities: PropTypes.shape({
        hasMore: PropTypes.bool.isRequired,
        empty: PropTypes.bool.isRequired,
        list: PropTypes.array.isRequired,
        selected: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    }).isRequired,
    description: PropTypes.string.isRequired,
    commentable: PropTypes.bool.isRequired,
    archived: PropTypes.bool.isRequired,
    content: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        type: PropTypes.oneOf(['text', 'file', 'link', 'poll', 'repost']),
        repost: PropTypes.object,
        thumbFiles: PropTypes.array.isRequired,
        isVideoFilePlay: PropTypes.bool.isRequired,
        link: PropTypes.string.isRequired,
        linkImg: PropTypes.string,
        linkTitle: PropTypes.string,
        linkSrc: PropTypes.string,
        linkDescription: PropTypes.string,
        linkEmbed: PropTypes.string,
        pollMode: PropTypes.string.isRequired,
        pollEndsAt: PropTypes.string,
        pollAnswers: PropTypes.array.isRequired
    }).isRequired,
    close: PropTypes.func.isRequired,
    toggleContextDialog: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
    setCommunity: PropTypes.func.isRequired,
    getProfileCommunities: PropTypes.func.isRequired,
    toggleCommentable: PropTypes.func.isRequired,
    toggleArchived: PropTypes.func.isRequired,
    changeDescription: PropTypes.func.isRequired,
    changeContentLink: PropTypes.func.isRequired,
    addFile: PropTypes.func.isRequired,
    removeFile: PropTypes.func.isRequired,
    playFile: PropTypes.func.isRequired,
    addLink: PropTypes.func.isRequired,
    removeLink: PropTypes.func.isRequired,
    addPoll: PropTypes.func.isRequired,
    removePoll: PropTypes.func.isRequired,
    addPollAnswer: PropTypes.func.isRequired,
    removePollAnswer: PropTypes.func.isRequired,
    changePollAnswerText: PropTypes.func.isRequired,
    changePollAnswerImg: PropTypes.func.isRequired,
    removePollAnswerImg: PropTypes.func.isRequired,
    changePollEndDate: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired
}

export default compose(withStyles(styles), withWidth())(NewPostForm);