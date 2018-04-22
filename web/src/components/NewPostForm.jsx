import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = {
    form: {
        width: '530px',
        height: '600px',
    }
}

const NewPostForm = ({ open, modalOpen }) => {
    return (
        <Dialog
            open={open}
            transition={Transition}
            keepMounted
            onClose={() => modalOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => modalOpen(false)} color="primary">
                    Cancel
            </Button>
                <Button onClick={() => modalOpen(false)} color="primary">
                    Create
            </Button>
            </DialogActions>
        </Dialog>
    )
}

NewPostForm.propTypes = {
    open: PropTypes.bool.isRequired,
    modalOpen: PropTypes.func.isRequired,
}

export default NewPostForm 