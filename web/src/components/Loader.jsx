import React from 'react';
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';
import LinearProgress from 'material-ui/Progress/LinearProgress';

const styles = theme => ({
    root: {
        zIndex: theme.zIndex.drawer + 2,
        backgroundColor: 'transparent'
    }
})

const Loader = ({ classes }) => <LinearProgress className={classes.root} />

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader)
