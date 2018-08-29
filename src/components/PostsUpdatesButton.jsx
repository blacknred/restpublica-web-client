import React from 'react';
import PropTypes from 'prop-types';

import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    action: {}
}

const PostsUpdatesButton = ({ newPostsCnt, addNewPosts, classes }) =>
    <Zoom in={true}>
        <Button
            variant="extendedFab"
            color="primary"
            className={classes.action}
            onClick={addNewPosts}
        >
            {newPostsCnt} new posts
        </Button>
    </Zoom>

PostsUpdatesButton.propTypes = {
    classes: PropTypes.object.isRequired,
    newPostsCnt: PropTypes.number.isRequired,
    addNewPosts: PropTypes.func.isRequired
};

export default withStyles(styles)(PostsUpdatesButton)