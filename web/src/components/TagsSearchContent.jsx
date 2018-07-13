

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Fade } from '@material-ui/core';

const styles = {
    trendingMenu: {
        zIndex: 1,
        position: 'absolute',
        top: '50px',
        right: 0,
        left: 0,
        '& a': {
            textDecoration: 'none',
            color: 'inherit'
        },
    }
}

const TagsSearchContent = ({ classes, trendingTags }) => (
    <Fade in={trendingTags.length > 0}>
        <Paper className={classes.trendingMenu}>
            <List>
                <ListItem disabled>
                    <Typography variant='body2'>
                        TRENDING TAGS
                            </Typography>
                </ListItem>
                {
                    trendingTags.map(tag =>
                        // tag.title.includes(query) &&
                        <ListItem
                            key={tag.title}
                            component={Link}
                            button
                            to={`/tags/${tag.title}`}
                        >
                            <Typography
                                variant='body2'
                                color='primary'
                            >
                                {`#${tag.title}`}
                            </Typography>
                            <Typography variant='caption'>
                                &nbsp;{` ${tag.posts_cnt} posts`}
                            </Typography>
                        </ListItem>
                    )
                }
            </List>
        </Paper>
    </Fade>
)

TagsSearchContent.propTypes = {
    trendingTags: PropTypes.arrayOf(
        PropTypes.shape({
            posts_cnt: PropTypes.any.isRequired,
            title: PropTypes.string.isRequired
        })
    ).isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TagsSearchContent);