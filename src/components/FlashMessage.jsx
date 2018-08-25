import React from 'react';
import PropTypes from 'prop-types'

// import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const FlashMessage = ({ message, closeHandler }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={typeof message === 'object'}
            autoHideDuration={3000}
            onClose={closeHandler}
            message={message.text}
            action={[
                // <Button
                //     key="undo"
                //     color="secondary"
                //     size="small"
                //     onClick={closeHandler}
                // >
                //     UNDO
                // </Button>,
                <IconButton
                    key="close"
                    color="inherit"
                    onClick={closeHandler}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    )
}
FlashMessage.propTypes = {
    message: PropTypes.shape({
        text: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    }).isRequired,
    closeHandler: PropTypes.func.isRequired
}

export default FlashMessage
