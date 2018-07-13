import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        marginBottom: '0.5em',
        backgroundColor: theme.palette.background.paper
    }
})

const NotificationContent = ({ note, classes, formateDate }) =>
    <ListItem className={classes.root}>
        <ListItemText primary={note.text} />
        <Typography variant='caption'>
            {formateDate(note.date)}
        </Typography>
    </ListItem>

NotificationContent.propTypes = {
    note: PropTypes.shape({
        date: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    formateDate: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotificationContent);