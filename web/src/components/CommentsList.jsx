import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller2'

import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = {
    item: {
        paddingLeft: '16px',
        paddingRight: '16px',
        alignItems: 'flex-start'
    },
    avatar: {
        width: '32px',
        height: '32px',
    },
    date: {
        fontSize: '14px'
    },
    loader: {
        flexBasis: '100%',
        width: '100%',
        textAlign: 'center'
    },
}

const CommentsList = ({
    comments, showComments, classes, comments_cnt, hasMoreComments, formateDate, getComments
}) => {
    const loader = (
        <div
            className={classes.loader}
            key={'loader'}>
            <CircularProgress />
            <br />
        </div>
    )

    //console.log(comments)

    const items = comments && comments.map(com =>
        <ListItem
            key={com.id}
            className={classes.item}
        >
            <Avatar
                component={Link}
                to={`/${com.author.username}/posts`}
                srcSet={`data:image/png;base64,${com.author.avatar}`}
                className={classes.avatar}
            />
            <ListItemText
                primary={
                    <Link to={`/${com.author.username}/posts`} >
                        {com.author.username}
                    </Link>
                }
                secondary={com.body
                    // <div>

                    //     <span>Answer</span>
                    //     {/* <br />
                    //                     <IconButton
                    //                         color='primary'
                    //                         onClick={() => { }}
                    //                     >
                    //                         <ThumbUpIcon/>
                    //                     </IconButton>
                    //                     <Button color='primary'>
                    //                         Answer
                    //                     </Button> */}
                    // </div>
                }
            />
            <span className={classes.date}>
                {formateDate(com.created_at)}
            </span>
        </ListItem>
    )

    return (
       
            <InfiniteScroll
                pageStart={0}
                loadMore={getComments}
                hasMore={hasMoreComments}
                loader={loader}
                // ref={(scroll) => { this.scroll = scroll; }}
                // threshold={200}
                // key={reload}
                initialLoad={false}
                useWindow={false}
            >
 <List>
                {items}
</List>
            </InfiniteScroll>
        
    )
}

CommentsList.propTypes = {
    classes: PropTypes.object.isRequired,
    comments_cnt: PropTypes.number.isRequired,
    showComments: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            user_id: PropTypes.number.isRequired,
            body: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
        })
    ),
    hasMoreComments: PropTypes.bool.isRequired,
    formateDate: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
};

export default withStyles(styles)(CommentsList)