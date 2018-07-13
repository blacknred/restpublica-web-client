import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = {
    form: {
        width: '530px',
        height: '600px',
    }
}

const NewCommunityForm = ({ close, isOpen, modalOpen, classes }) => {
    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => modalOpen(false)}
            onExited={close}
        >
            <Card
                elevation={0}
                className={classes.form}
            >
                <CardContent>
                    in dev
                </CardContent>
            </Card >
        </Dialog>
    )
}

NewCommunityForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    modalOpen: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(NewCommunityForm)