import React from 'react';
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar';

const styles = {
    snackbar: { 
        left: '2%',
        bottom: '2%',
        transform: null
    }
};

const FlashMessage = ({ message, closeHandler }) => {
    return (
        <Snackbar
            style={styles.snackbar}
            open={true}
            message={message.text}
            autoHideDuration={6000}
            action="Close"
            onActionClick={closeHandler}
            onRequestClose={closeHandler}
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
