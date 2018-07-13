import React from 'react';
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
    root: {
        zIndex: theme.zIndex.drawer + 2,
        backgroundColor: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%'
    }
})

const Loader = ({ classes }) => <LinearProgress className={classes.root} />

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader)
