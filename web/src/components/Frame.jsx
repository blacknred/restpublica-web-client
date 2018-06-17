import React from 'react';
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = {
    frame: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'padding-left 300ms',
        backgroundColor: 'transparent',
        margin: '1em 0',
    },
    left: {
        '@media (min-width: 960px)': {
            paddingLeft: '220px',
        }
    },
}

const Frame = ({ isDrawer, classes, children }) => {
    return (
        <Paper
            elevation={0}
            className={classes.frame}
            classes={{
                root: isDrawer ? classes.left : null,
            }}
        >
            {children}
        </Paper>
    )
}

Frame.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Frame)
