import React from 'react';
import PropTypes from 'prop-types';

import List, { 
    ListItem, 
    ListItemText, 
    ListItemSecondaryAction 
} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import Switch from 'material-ui/Switch';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/Menu/MenuItem';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';

const styles = theme => ({
    list: {
        width: '550px',
        margin: '1em 0',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    selectField: {
        width: '6em',
        marginRight: '1em'
    }
})

const SettingsApp = ({
    isNightMode, isNotify, isAutoGifs, isFeedOneColumn, classes, updateValue,
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
                        checked={isFeedOneColumn}
                        onChange={() => switchFeedOneColumn(!isFeedOneColumn)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
                <ListItemText primary="Autoload gifs" />
                <ListItemSecondaryAction>
                    <Switch
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
                        disableUnderline={true}
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
                        checked={props.email_notify}
                        onChange={(event) =>
                            updateValue('email_notify', !props.email_notify)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    )

    return (
        <Paper className={classes.list}>
            {uiList}
            <Divider />
            {feedList}
            <Divider />
            {notificationsList}
        </Paper>
    );
}

SettingsApp.propTypes = {
    isNotify: PropTypes.bool.isRequired,
    isNightMode: PropTypes.bool.isRequired,
    isAutoGifs: PropTypes.bool.isRequired,
    isFeedOneColumn: PropTypes.bool.isRequired,
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