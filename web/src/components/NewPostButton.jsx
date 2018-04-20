import React from 'react';
import { Link } from 'react-router-dom';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
    button: {
        position: 'fixed',
        bottom: '2em',
        right: '2em',
        zIndex: 1
    }
}

const NewPostButton = ({ toggleModalOpen }) => {
    return (
        <Link to={{
            pathname: '/post',
            state: { modal: true }
        }} >
            <FloatingActionButton style={styles.button}>
                <ContentAdd onClick={() => toggleModalOpen(true)}/>
            </FloatingActionButton>
        </Link>
    )
}

export default NewPostButton


