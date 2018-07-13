import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { deleteFlashMessage } from '../actions'
import FlashMessage from '../components/FlashMessage'

const FlashMessages = ({ messages, deleteMessage }) => {
    return (
        messages.map((message, index) =>
            <FlashMessage
                key={index}
                message={message}
                closeHandler={() => deleteMessage(index)}
            />
        )
    )
}
FlashMessages.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    deleteMessage: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    messages: state.flashMessages.messages,
    isNightMode: state.uiSwitchers.isNightMode
})
const mapDispatchToProps = dispatch => ({
    deleteMessage: (index) => dispatch(deleteFlashMessage(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessages)

