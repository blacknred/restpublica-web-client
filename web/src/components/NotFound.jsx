import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

const styles = {
    container: {
        color: grey[500],
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        left: 0,
        right: 0,
        position: 'fixed',
    },
    icon: {
        width: '6em',
        height: '6em',
        color: grey[300]
    }
}

const NotFound = ({ classes }) => (
    <div className={classes.container}>
        <SentimentDissatisfiedIcon className={classes.icon} />
        <br /><br />
        <Typography variant="display1">
            404 Page Not Found
        </Typography>
        <br />
        <Typography variant="subheading">
            There is something wrong with your url.
        </Typography>
        <br />
        <Button color="inherit" href='/' >Return Home</Button>
    </div>
)

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound)
