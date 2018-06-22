import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    action: {
        position: 'fixed',
        bottom: '5%',
        right: '30px',
    }
}

const NewPostButton = ({ community, classes }) =>
    <Button
        variant="fab"
        color="primary"
        className={classes.action}
        component={Link}
        to={{
            pathname: '/post',
            state: {
                modal: true,
                isSlide: true,
                community
            }
        }}
    >
        <EditIcon />
    </Button>

NewPostButton.propTypes = {
    classes: PropTypes.object.isRequired,
    community: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })
};

export default withStyles(styles)(NewPostButton)