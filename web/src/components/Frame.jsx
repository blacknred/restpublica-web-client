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
        backgroundColor: 'transparent'
    },
    left: {
        '@media (min-width: 800px)': {
            paddingLeft: '220px',
        }
    },
    top: {
        paddingTop: '5em',
    }
}

const Frame = ({ isAuthenticated, isDrawer, classes, children }) => {
    return (
        <Paper
            elevation={0}
            className={classes.frame}
            classes={{
                root: isAuthenticated && isDrawer ? classes.left : null,
                elevation0: isAuthenticated ? classes.top : null,                
            }}
        >
            {children}
        </Paper>
    )
}

Frame.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isDrawer: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Frame)
