import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const styles = {
    modal: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: '1302',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100vh',
        background: '#6f7b82',
        opacity: '0.6'
    },
    content: {
        position: 'absolute',
        zIndex: '1302'
    }

}

const Modal = (PassedModalForm) => ({ isModalOpen, toggleModalOpen, close }) => {
    return (
        <div style={styles.modal}>
            <span
                style={{
                    ...styles.overlay,
                   animation: isModalOpen ? 'fadeIn 100ms' : null
                }}
                onClick={() => {
                    toggleModalOpen(false)
                    close()
                }}
            />
            <span style={{
                ...styles.content,
                animation: isModalOpen ? 'fadeInUp 400ms' : 'fadeOutUp 250ms'
            }}>
                <PassedModalForm />
            </span>
        </div>
    )
}

Modal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    toggleModalOpen: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
}

export default Modal
