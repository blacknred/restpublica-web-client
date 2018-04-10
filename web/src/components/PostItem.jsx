import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import moment from 'moment'

import { GridTile } from 'material-ui/GridList';
import { ListItem } from 'material-ui/List';
import { grey600 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

let countDate = (dateObj => {
    let date = moment.parseZone(dateObj)
    let now = moment().parseZone()
    let res
    if (now.year() > date.year()) res = `${now.year() - date.year()} year`
    else if (now.month() > date.month()) res = `${now.month() - date.month()} month`
    else if (now.date() > date.date() + 7) res = `${(now.date() - date.date()) / 7} week`
    else if (now.date() > date.date()) res = `${now.date() - date.date()} day`
    else if (now.hour() > date.hour()) res = `${date.hour()} hour`
    else if (now.minute() > date.minute()) res = `${date.minute()} min`
    else res = `${date.secounds} sec`
    return res
})

const styles = {
    post: {
        padding: '8px 20px 8px 2px',
        fontSize: '14px'
    },
    postSecondary: {
        lineHeight: '22px',
        height: 'auto',
        paddingTop: '8px'
    },
    postIconButton: {
        padding: '5px 0',
        width: '14px',
        height: 'auto'
    }
}

const PostItem = ({ post, index, isFullAccess, isAuthenticated }) => {
    const iconButtonElement = (
        <IconButton
            touch={true}
            style={styles.postIconButton} >
            <MoreVertIcon color={grey600} />
        </IconButton>
    );
    const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
            {
                !isFullAccess ?
                    <MenuItem>Repost</MenuItem>
                    :
                    <div>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </div>
            }
        </IconMenu>
    );
    return (
        <GridTile
            //className='element'
            cols={index !== 0 && index % 6 === 0 ? 2 : 1}
            rows={1} >
            <Link to={{ pathname: `/p/${post.slug}`, state: { modal: true } }}>
                {
                    post.content.map((content, i) => {
                        return <img src={content.thumb} key={i} alt="" width='100%' height='160' style={{ opacity: '0.8' }} />
                    })
                }
            </Link>
            <ListItem
                style={styles.post}
                disabled={true}
                rightIconButton={!isAuthenticated ? null : rightIconMenu}
                primaryText={<b>{post.description}</b>}
                secondaryText={
                    <p style={styles.postSecondary}>
                        {
                            post.author &&
                                <Link to={`/u/${post.author.username}/posts`}>
                                    <b>{post.author.username}</b><br />
                                </Link>
                        }
                        <span>
                            <span>{post.views_cnt} views &#8226; </span>
                            <span>{post.likes_cnt} likes &#8226; </span>
                            <span>{countDate(post.created_at)}</span>
                        </span>
                    </p>
                }
                secondaryTextLines={2}
            />
        </GridTile>
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

    }).isRequired,
    index: PropTypes.number.isRequired,
    isFullAccess: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

export default PostItem