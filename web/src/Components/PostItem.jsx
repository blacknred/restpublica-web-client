import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

import { GridList, GridTile } from 'material-ui/GridList';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    card: {
        backgroundColor: 'transparent!important', boxShadow: 'null'
    },
    cardText: {
        padding: '16px 0px 10px 0px',
        display: 'flex', justifyContent: 'space-between'
    },
    cardTitle: {
        padding: '0px',
    },
    cardTitleTitle: {
        fontSize: '0.9em', color: 'grey', lineHeight: 'normal', paddingBottom: '5px'
    },
    iconButton: {
        height: '25px', width: '25px', padding: '0px'
    }
}

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

const PostCard = ({ post, index, isFullAccess }) => {
    console.log(index)
    const iconButtonElement = (
        <IconButton
            touch={true}
            style={styles.iconButton}>
            <MoreVertIcon color={grey400} />
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
            //title={tile.title}
            //actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            cols={index === 6 ? 6 : 1}
            rows={1}
        >
            {
                post.thumbs.map((thumb, i) => {
                    return <img src={thumb.url} key={i} alt="" width='100%' />
                })
            }
            <b>{post.description}</b>
            {
                !post.author ? null :
                    <Link to={`/u/${post.author.username}`}>
                        <b>{post.author.username}</b>
                    </Link>
            }
        </GridTile>
        <Card style={styles.card}  cols={6}>

            <Link to={{ pathname: `/p/${post.post_id}`, state: { modal: true } }}>
                <CardMedia>
                    {
                        post.thumbs.map((thumb, i) => {
                            return <img src={thumb.url} key={i} alt="" width='100%' />
                        })
                    }
                </CardMedia>
            </Link>
            <CardText style={styles.cardText}>
                <b>{post.description}</b>
                {rightIconMenu}
            </CardText>
            <CardTitle
                style={styles.cardTitle}
                title={
                    ! post.author ? null :
                        <Link to={`/u/${post.author.username}`}>
                            <b>{post.author.username}</b>
                        </Link>
                }
                titleStyle={styles.cardTitleTitle}
                subtitle={
                    <span>
                        <span>{post.views} views &#8226; </span>
                        <span>{post.likes_count} likes &#8226; </span>
                        <span>{countDate(post.created_at)}</span>
                    </span>
                }
            />
            <br/>
        </Card>
    )
}

export default PostCard;
