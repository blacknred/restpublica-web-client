import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import moment from 'moment'

// import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import muiThemeable from 'material-ui/styles/muiThemeable';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SocialShare from 'material-ui/svg-icons/social/share';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    post: {
        maxWidth: '530px',
        width: '530px',
        margin: '0.8em',
        flex: '1 0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        fontSize: '14px',
        animation: 'fadeIn 1s'
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
        display: 'flex',
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

}

const PostItem = ({ post, isFullAccess, expandPost, updatePost, deletePost, muiTheme }) => {
    const countDate = (dateObj => {
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
    })
    return (
        <Card
            style={styles.post}
            expanded={post.isExpanded} >
            <CardHeader style={styles.postHeader}
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
                children={
                    <span style={styles.postHeaderLink}>
                        <Link
                            to={{ pathname: `/p/${post.slug}`, state: { modal: true } }}
                            style={styles.secondaryText}>
                            {countDate(post.created_at)}
                        </Link>
                    </span>
                }
            />
            <CardMedia
            //overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
            >
                {
                    post.content.map((content, i) => {
                        return <img src={content.file} key={i}
                            alt="content.file" width='100%' />
                    })
                }
            </CardMedia>
            <CardTitle
                style={styles.descriptionText}
                titleColor={muiTheme.palette.secondaryTextColor} >
                {post.description}
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
            </CardTitle>

            <CardActions style={styles.postActions}>
                <span style={styles.postActionsLeft}>
                    {
                        post.commentable &&
                        <FlatButton
                            label={
                                `${post.isExpanded ? 'Hide' : 'Join'}
                        discussion ${post.comments_cnt}`
                            }
                            onClick={() => expandPost(post.id)}
                        />
                    }
                </span>
                <FloatingActionButton
                    mini={true}
                    backgroundColor={
                        post.my_like_id ?
                            muiTheme.palette.accentColor :
                            muiTheme.palette.clockCircleColor
                    }
                    zDepth={0}
                    onClick={() => { }}>
                    <ActionThumbUp color={muiTheme.palette.textColor} />
                </FloatingActionButton>
                <small>{post.views_cnt}</small>
                {
                    isFullAccess &&
                    <IconMenu
                        iconButtonElement={
                            <FloatingActionButton
                                mini={true}
                                backgroundColor={muiTheme.palette.clockCircleColor}
                                zDepth={0}
                                onClick={() => { }}>
                                <ActionSettings />
                            </FloatingActionButton>
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
                    </IconMenu>
                }
                {
                    !isFullAccess &&
                    <FloatingActionButton
                        mini={true}
                        backgroundColor={muiTheme.palette.clockCircleColor}
                        zDepth={0}
                        onClick={() => { }}>
                        <SocialShare />
                    </FloatingActionButton>
                }
                {
                    !isFullAccess &&
                    <small>{post.likes_cnt}</small>
                }
            </CardActions>
            <CardText expandable={true}>
                {post.comments}
            </CardText>
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

export default muiThemeable()(PostItem);