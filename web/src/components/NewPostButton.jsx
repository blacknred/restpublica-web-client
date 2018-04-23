import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from 'material-ui/styles';

const styles = {
    button: {
        position: 'fixed',
        bottom: '6%',
        right: '3%',
    }
}

const NewPostButton = ({ classes }) => {
    return (
        <Link to={{
            pathname: '/post',
            state: { modal: true }
        }} >
            <Button
                className={classes.button}
                variant="fab"
                color="primary">
                <EditIcon />
            </Button>
        </Link>
    )
}

NewPostButton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewPostButton);


