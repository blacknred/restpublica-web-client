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
        top: '60px',
        right: '1em',
        left: '1em',
        '& a': {
            textDecoration: 'none',
            color: 'inherit'
        },
    }
}

const SearchBlockContent = ({ classes, trendingTags }) => (
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
                            to={`/search/${tag.title}/tags`}
                        >
                            <Typography variant='subheading'>
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

SearchBlockContent.propTypes = {
    trendingTags: PropTypes.arrayOf(
        PropTypes.shape({
            posts_cnt: PropTypes.any.isRequired,
            title: PropTypes.string.isRequired
        })
    ).isRequired,
    query: PropTypes.string,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchBlockContent);