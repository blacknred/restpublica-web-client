import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import grey from '@material-ui/core/colors/grey';
import Backdrop from '@material-ui/core/Backdrop';
import ExploreIcon from '@material-ui/icons/Explore';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = theme => ({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -(theme.spacing.unit * 20)
    },
    title: {
        fontFamily: 'Product Sans, Roboto,Helvetica, Arial, sans-serif',
        color: theme.palette.primary.main
    },
})

const DynamicBackdrop = ({ gifUrl, ...other }) =>
    <Backdrop
        {...other}
        style={{
            background: `url("${gifUrl}") no-repeat center / cover fixed ${grey[200]}`
        }}
    />

const LandingContent = ({ gifUrl, classes, children }) => {
    return (
        <Dialog
            open
            keepMounted
            classes={{ paper: classes.container }}
            BackdropComponent={DynamicBackdrop}
            BackdropProps={{ gifUrl }}
            transitionDuration={0}
        >
            <DialogTitle>
                <DialogContentText
                    variant='display1'
                    className={classes.title}
                >
                    {process.env.REACT_APP_TITLE || 'Publica'}
                </DialogContentText>
            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>

            <DialogContent>
                <Button
                    variant='raised'
                    size='small'
                    color='primary'
                    component={Link}
                    to="/explore"
                >
                    <ExploreIcon /> &nbsp;Explore
                </Button>
            </DialogContent>
        </Dialog >
    )
}

LandingContent.propTypes = {
    gifUrl: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LandingContent)
