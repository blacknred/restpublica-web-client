import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
    tile: {
        width: '290px',
        margin: '0.6em',
        textDecoration: 'none',
        borderRadius: '1.5%'
    },

    headerContent: {
        '&> *': {
            display: 'inline-block',
        },
        paddingTop: 0,
        '&> :nth-child(2):before': {
            content: '"\\1f892"',
            margin: '0 0.5em',
            fontSize: '1.3em'
        },
    },
    headerAvatar: {
        backgroundColor: theme.palette.primary.light,
        width: '30px',
        height: '30px'
    },
})

const PostPreview = ({ post, classes }) => {

    const postHeader = (
        <CardHeader
            color='default'
            classes={{ content: classes.headerContent }}
            avatar={
                <Avatar
                    className={classes.headerAvatar}
                    srcSet={`data:image/png;base64,${post.author.avatar}`}
                    aria-label={post.author.username}
                />
            }
            title={post.author.username}
            subheader={post.community_name}
        />
    )

    const postDescription = (
        <CardContent className={classes.description}>
            <Typography variant='body1'>
                {
                    post.description.trim().split(' ').map((word) => {
                        if (word.charAt(0) !== '#') return `${word} `;
                        return <span>{ word } &nbsp;</span>
                    })
                }
            </Typography>
        </CardContent>
    )

    const postFilesContent = (
        <CardMedia
            component={
                post.content[0].mime === 'video/mp4' ? 'video' : 'img'
            }
            src={
                post.content[0].mime === 'image/gif' ?
                    post.content[0].thumb :
                    post.content[0].file
            }
        />
    )

    const postLinkContent = (
        <div></div>
    )

    return (
        <Card
            elevation={1}
            className={classes.tile}
            component={Link}
            to={`/post/${post.slug}`}
        >
            {post.type === 'file' && postFilesContent}
            {post.type === 'link' && postLinkContent}

            {postDescription}
            {postHeader}
        </Card>
    )
}

PostPreview.propTypes = {
    post: PropTypes.shape({
        archived: PropTypes.bool.isRequired,
        post: PropTypes.shape({
            username: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired
        }),
        id: PropTypes.number.isRequired,
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
    }),

    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostPreview)