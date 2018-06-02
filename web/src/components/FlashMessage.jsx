import React from 'react';
import PropTypes from 'prop-types'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const FlashMessage = ({ message, closeHandler }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={typeof message === 'object'}
            autoHideDuration={2000}
            onClose={closeHandler}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message.text}</span>}
            action={[
                // <Button key="undo" color="secondary" size="small" onClick={closeHandler}>
                //   UNDO
                // </Button>,
                <IconButton
                    key="close"
                    aria-label="Close"
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
