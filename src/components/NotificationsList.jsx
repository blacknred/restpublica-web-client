import React from 'react';
import PropTypes from 'prop-types';

import NotificationContent from './NotificationContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 530,
    }
})

const NotificationsList = ({ notifications, classes, formateDate }) =>
    <List className={classes.root}>
        <ListItem dense>
            <ListItemText primary='Notifications' />
            <ListItemSecondaryAction>
                <IconButton  aria-label="DoneAll">
                    <DoneAllIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        <br/>
        {
            notifications.map((note, index) =>
                <NotificationContent
                    key={index}
                    note={note}
                    formateDate={formateDate}
                />
            )
        }
    </List>

NotificationsList.propTypes = {
    notifications: PropTypes.array.isRequired,
    formateDate: PropTypes.func.isRequired
}

export default withStyles(styles)(NotificationsList)