import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Zoom from '@material-ui/core/Zoom';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    tile: {
        borderRadius: '1%',
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.14)',
        '@media (min-width: 600px)': {
            width: '280px',
            marginBottom: '20px',
        },
        '@media (max-width: 600px)': {
            margin: '10px 5px',
        },
        '& a': {
            textDecoration: 'none',
        }
    },
    headerContent: {
        '&> *': {
            display: 'inline-block',
        },
        '&> :nth-child(2):before': {
            content: '"\\1f892"',
            margin: `0 ${theme.spacing.unit}px`,
            fontSize: '1.3em'
        },
    },
    headerAvatar: {
        backgroundColor: theme.palette.primary.light,
        width: 27,
        height: 27
    },
    description: {
        paddingBottom: 0,
        '& span': {
            color: theme.palette.primary.main
        }
    },

    mediaLinkImg: {
        width: '100%',
        height: '300px',
        border: 0
    },
})

const PostPreview = ({ index, post, classes }) => {

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
            {
                post.type === 'link' &&
                <Typography
                    component={Link}
                    to={post.content[0].link}
                    color='primary'
                    paragraph
                    noWrap
                >
                    {post.content[0].link}
                </Typography>
            }
            <Typography>
                {
                    post.description.trim().split(' ').map((word, index) => {
                        if (word.charAt(0) !== '#') return `${word} `;
                        return <span key={word + index}>{`${word} `}</span>
                    })
                }...
            </Typography>
        </CardContent>
    )

    const postFilesContent = (
        post.content &&
        <CardMedia
            component={post.content[0].mime === 'video/mp4' ? 'video' : 'img'}
            src={post.content[0].thumb}
        />
    )

    const postLinkContent = (
        post.content &&
        <a
            href={post.content[0].link}
            target='_blank'
        >
            <CardMedia
                className={classes.mediaLinkImg}
                //component='iframe'
                //src={post.content[0].link}
                image={post.content[0].img}
            />
        </a>
    )

    return (
        <Zoom in={true}>
            <Card
                elevation={1}
                className={classes.tile}
            >
                <Link to={`/post/${post.slug}`}>
                    {post.type === 'file' && postFilesContent}
                    {post.type === 'link' && postLinkContent}
                    {postDescription}
                    {postHeader}
                </Link>
            </Card>
        </Zoom>
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