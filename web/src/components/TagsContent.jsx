import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme =>({
    root: {
        margin: '1em auto',
        textAlign: 'center'
    },
    chip: {
        margin: theme.spacing.unit,
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '1em',
    }
})

const TagsContent = ({ classes, trendingTags }) => (
    <div className={classes.root}>
        {
            trendingTags.map(tag =>
                <Chip
                    key={tag.title}
                    label={tag.title}
                    className={classes.chip}
                    component={Link}
                    to={`/search/#${tag.title}`}
                />
            )
        }
    </div>
    // <Fade in={trendingTags.length > 0}>
    //     <Paper className={classes.trendingMenu}>
    //         <List>
    //             <ListItem disabled>
    //                 <Typography variant='body2'>
    //                     TRENDING TAGS
    //                         </Typography>
    //             </ListItem>
    //             {
    //                 trendingTags.map(tag =>
    //                     // tag.title.includes(query) &&
    //                     <ListItem
    //                         key={tag.title}
    //                         component={Link}
    //                         button
    //                         to={`/search/${tag.title}/tags`}
    //                     >
    //                         <Typography variant='subheading'>
    //                             {`#${tag.title}`}
    //                         </Typography>
    //                         <Typography variant='caption'>
    //                             &nbsp;{` ${tag.posts_cnt} posts`}
    //                         </Typography>
    //                     </ListItem>
    //                 )
    //             }
    //         </List>
    //     </Paper>
    // </Fade>
)

TagsContent.propTypes = {
    trendingTags: PropTypes.arrayOf(
        PropTypes.shape({
            posts_cnt: PropTypes.any.isRequired,
            title: PropTypes.string.isRequired
        })
    ).isRequired,
    query: PropTypes.string,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TagsContent);