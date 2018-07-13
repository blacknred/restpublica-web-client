import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit * 3,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    chip: {
        margin: theme.spacing.unit,
        fontSize: '0.75rem'
    }
})

const TagsContent = ({ classes, trendingTags }) => (
    trendingTags.length > 0 &&
    <Fade in={true}>
        <div className={classes.root}>
            {
                trendingTags.map(tag =>
                    <Button
                        variant='extendedFab'
                        key={tag.title}
                        className={classes.chip}
                        component={Link}
                        to={`/tags/${tag.title}`}
                        color='primary'
                    >
                        {tag.title}
                    </Button>
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