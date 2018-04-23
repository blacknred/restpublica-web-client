import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import ContentAddIcon from '@material-ui/icons/Add';

const styles = {
    button: {
        position: 'fixed',
        bottom: '6%',
        right: '3%',
    }
}

const NewCommunityButton = ({ classes }) => {
    return (
        <Link to={{
            pathname: '/community',
            state: { modal: true }
        }} >
            <Button
                className={classes.button}
                variant="fab"
                color="primary">
                <ContentAddIcon />
            </Button>
        </Link>
    )
}

NewCommunityButton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewCommunityButton);


