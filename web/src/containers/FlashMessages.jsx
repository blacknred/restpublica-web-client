import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { deleteFlashMessage } from '../actions'
import FlashMessage from '../components/FlashMessage'

const FlashMessages = ({ messages, deleteMessage }) => {
    return (
        <div>
            {
                messages.map((message, index) => <FlashMessage
                    key={index}
                    message={message}
                    closeHandler={() => deleteMessage(index)}
                />)
            }
        </div>
    )
}
FlashMessages.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    deleteMessage: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    messages: state.flashMessages.messages
})
const mapDispatchToProps = dispatch => ({
    deleteMessage: (index) => dispatch(deleteFlashMessage(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessages)

