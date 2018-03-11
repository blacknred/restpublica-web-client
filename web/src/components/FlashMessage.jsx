import React from 'react';
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar';

const styles = {
    error: { background: 'red' },
    notice: { background: 'black' },
    success: { background: 'green' },
    snackbar: { 
        left: '11%',
        bottom: '2%'
    }
};

const FlashMessage = ({ message, closeHandler }) => {
    return (
        <Snackbar
            bodyStyle={styles[message.status]}
            style={styles.snackbar}
            open={true}
            message={message.text}
            autoHideDuration={3000}
            action="Close"
            // onActionClick={() => closeHandler(index)}
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
