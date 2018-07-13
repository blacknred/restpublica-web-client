import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({
    root: {
        maxWidth: '550px',
        width: '100vw',
    },
    selectField: {
        width: '6em',
        marginRight: '1em'
    }
})

const SettingsApp = ({
    isNightMode, isNotify, isAutoGifs, isFeedMultiColumn, classes, updateValue,
    switchNotify, switchNightMode, switchAutoGifs, switchFeedOneColumn, ...props
}) => {

    const uiList = (
        <List>
            <ListSubheader>Ui</ListSubheader>
            <ListItem>
                <ListItemText
                    primary="Night mode"
                    secondary="Switch to dark theme"
                />
                <ListItemSecondaryAction>
                    <Switch
                        color='primary'
                        checked={isNightMode}
                        onChange={() => switchNightMode(!isNightMode)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    )

    const feedList = (
        <List>
            <ListSubheader>Feed</ListSubheader>
            <ListItem>
                <ListItemText
                    primary="Optimize columns"
                    secondary="Adjust the number of columns based on the width of the screen"
                />
                <ListItemSecondaryAction>
                    <Switch
                        color='primary'
                        checked={isFeedMultiColumn}
                        onChange={() => switchFeedOneColumn(!isFeedMultiColumn)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
                <ListItemText primary="Autoload gifs" />
                <ListItemSecondaryAction>
                    <Switch
                        color='primary'
                        checked={isAutoGifs}
                        onChange={() => switchAutoGifs(!isAutoGifs)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Randomize feed"
                    secondary="Number of trending entries in feed"
                />
                <ListItemSecondaryAction>
                    <Select
                        className={classes.selectField}
                        value={parseInt(props.feed_rand, 10)}
                        onChange={(event) => updateValue('feed_rand', event.target.value)} >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>Small</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={3}>A lot</MenuItem>
                    </Select>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    )

    const notificationsList = (
        <List>
            <ListSubheader>Notifications</ListSubheader>
            <ListItem>
                <ListItemText primary="Allow push notifications" />
                <ListItemSecondaryAction>
                    <Switch
                        color='primary'
                        checked={isNotify}
                        onChange={() => switchNotify(!isNotify)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Allow email notifications"
                    secondary="Uses default registration email address"
                />
                <ListItemSecondaryAction>
                    <Switch
                        color='primary'
                        checked={props.email_notify}
                        onChange={(event) =>
                            updateValue('email_notify', !props.email_notify)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    )

    return (
        <Paper
            elevation={1}
            className={classes.root}
        >
            {uiList}
            <Divider />
            {feedList}
            <Divider />
            {notificationsList}
            <Divider />
        </Paper>
    );
}

SettingsApp.propTypes = {
    isNotify: PropTypes.bool.isRequired,
    isNightMode: PropTypes.bool.isRequired,
    isAutoGifs: PropTypes.bool.isRequired,
    isFeedMultiColumn: PropTypes.bool.isRequired,
    feed_rand: PropTypes.any.isRequired,
    email_notify: PropTypes.bool.isRequired,
    updateValue: PropTypes.func.isRequired,
    switchNotify: PropTypes.func.isRequired,
    switchNightMode: PropTypes.func.isRequired,
    switchAutoGifs: PropTypes.func.isRequired,
    switchFeedOneColumn: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SettingsApp);