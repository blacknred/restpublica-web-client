import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    list: {
        width: '550px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    selectField: { 
        width: '10em' 
    }
}
const SettingsApp = ({ isNightMode, isNotify, isAutoGifs, feed_rand, email_notify,
    updateValue, isFeedOneColumn, toggleNotify, toggleNightMode, toggleAutoGifs,
    toggleFeedOneColumn }) => {
    return (
        <div className='container'>
            <Paper style={styles.list}>
                <List>
                    <Subheader><b>App</b></Subheader>
                    <ListItem
                        disabled={true}
                        primaryText="Night mode"
                        secondaryText="Use dark theme"
                        rightToggle={
                            <Toggle
                                defaultToggled={isNightMode}
                                toggled={isNightMode}
                                onToggle={() => toggleNightMode(!isNightMode)}
                            />
                        }
                    />
                </List>
                <Divider />
                <List>
                    <Subheader><b>Feed</b></Subheader>
                    <ListItem
                        disabled={true}
                        primaryText="Optimize columns"
                        secondaryText="Adjust the number of columns based on the width of the screen"
                        rightToggle={
                            <Toggle
                                defaultToggled={isFeedOneColumn}
                                toggled={isFeedOneColumn}
                                onToggle={() => toggleFeedOneColumn(!isFeedOneColumn)}
                            />
                        }
                    />
                    <ListItem
                        disabled={true}
                        primaryText="Autoload gifs"
                        rightToggle={
                            <Toggle
                                defaultToggled={isAutoGifs}
                                toggled={isAutoGifs}
                                onToggle={() => toggleAutoGifs(!isAutoGifs)}
                            />
                        }
                    />
                    <ListItem
                        disabled={true}
                        primaryText="Randomize feed"
                        secondaryText="Number of trending entries in feed"
                        rightAvatar={
                            <SelectField
                                value={parseInt(feed_rand, 10)}
                                style={styles.selectField}
                                onChange={(event, key, payload) => updateValue('feed_rand', payload)} >
                                <MenuItem value={0} primaryText="None" />
                                <MenuItem value={1} primaryText="Small" />
                                <MenuItem value={2} primaryText="Medium" />
                                <MenuItem value={3} primaryText="A lot" />
                            </SelectField>
                        }
                    />
                </List>
                <Divider />
                <List>
                    <Subheader><b>Notifications</b></Subheader>
                    <ListItem
                        disabled={true}
                        primaryText="Allow push notifications"
                        rightToggle={
                            <Toggle
                                defaultToggled={isNotify}
                                toggled={isNotify}
                                onToggle={() => toggleNotify(!isNotify)} />
                        }
                    />
                    <ListItem
                        disabled={true}
                        primaryText="Allow email notifications"
                        secondaryText='Uses default registration email address'
                        rightToggle={
                            <Toggle
                                name='email_notify'
                                defaultToggled={email_notify}
                                toggled={email_notify}
                                onToggle={(event, isInputChecked) =>
                                    updateValue('email_notify', isInputChecked)} />
                        }
                    />
                </List>
            </Paper>
        </div>
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
    toggleNotify: PropTypes.func.isRequired,
    toggleNightMode: PropTypes.func.isRequired,
    toggleAutoGifs: PropTypes.func.isRequired,
    toggleFeedOneColumn: PropTypes.func.isRequired,
}

export default SettingsApp