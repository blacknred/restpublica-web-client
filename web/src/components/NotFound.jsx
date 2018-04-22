import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import grey from 'material-ui/colors/grey';

const styles = {
    container: {
        color: grey[500],
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh'
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
