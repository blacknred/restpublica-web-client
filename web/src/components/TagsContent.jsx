import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
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
    <Fade in={trendingTags.length > 0}>
        <div className={classes.root}>
            {
                trendingTags.map(tag =>
                    <Chip
                        key={tag.title}
                        label={tag.title}
                        className={classes.chip}
                        component={Link}
                        to={`/tags/${tag.title}`}
                    />
                )
            }
        </div>
    </Fade>
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