import React from 'react';
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ActionDashboardIcon from 'material-ui/svg-icons/action/dashboard';
import ActionExploreIcon from 'material-ui/svg-icons/action/explore';
import SocialPersonIcon from 'material-ui/svg-icons/social/person';
import ActionSettingsIcon from 'material-ui/svg-icons/action/settings';
import ActionHelpIcon from 'material-ui/svg-icons/action/help';
import ActionFeedbackIcon from 'material-ui/svg-icons/action/feedback';
import ActionViewColumnIcon from 'material-ui/svg-icons/action/view-column';
import SocialNotificationsIcon from 'material-ui/svg-icons/social/notifications';

const styles = {
    drawer: {
        boxShadow: 'none',
        padding: '5em 0 1em 0',
        justifyContent: 'space-between',
        width: '220px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        fontWeight: 'bold',
        transition: 'all 400ms',
        animation: 'leftOff 0.5s',
    },
    listItem: {
        marginLeft: '5px',
        fontSize: '15px',
    },
    listItemSecondary: {
        marginLeft: '5px',
        fontSize: '14px',
        opacity: '0.4'
    },
    footer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column-reverse',
        padding: '1em 2em',
        fontSize: '13px',
        lineHeight: '18px',
        opacity: '0.6'
    }
}

const DrawerContent = ({ pathname, navigate, isDrawer, username, muiTheme }) => {
    return (
        <Drawer
            open={isDrawer}
            containerStyle={styles.drawer}>
            <List>
                <ListItem
                    key={1}
                    primaryText='Feed'
                    onClick={() => navigate('/')}
                    innerDivStyle={{
                        ...styles.listItem,
                        color: pathname === '/' ?
                            muiTheme.palette.primary1Color :
                            muiTheme.palette.secondaryTextColor
                    }}
                    leftIcon={
                        <ActionDashboardIcon
                            color={pathname === '/' ?
                                muiTheme.palette.primary1Color :
                                muiTheme.palette.secondaryTextColor}
                        />
                    }
                />
                <ListItem
                    key={2}
                    primaryText="Trending"
                    onClick={() => navigate('/trending')}
                    innerDivStyle={{
                        ...styles.listItem,
                        color: pathname === '/trending' ?
                            muiTheme.palette.primary1Color :
                            muiTheme.palette.secondaryTextColor
                    }}
                    leftIcon={
                        <ActionExploreIcon
                            color={pathname === '/trending' ?
                                muiTheme.palette.primary1Color :
                                muiTheme.palette.secondaryTextColor}
                        />
                    }
                />
                <ListItem
                    key={3}
                    primaryText="Communities"
                    onClick={() => navigate('/communities')}
                    innerDivStyle={{
                        ...styles.listItem,
                        color: pathname.match(/^\/communities/) ?
                            muiTheme.palette.primary1Color :
                            muiTheme.palette.secondaryTextColor
                    }}
                    leftIcon={
                        <ActionViewColumnIcon
                            color={pathname.match(/^\/communities/) ?
                                muiTheme.palette.primary1Color :
                                muiTheme.palette.secondaryTextColor}
                        />
                    }
                />
                <ListItem
                    key={4}
                    primaryText="Profile"
                    onClick={() => navigate('/profile')}
                    innerDivStyle={{
                        ...styles.listItem,
                        color: pathname.includes(username) ?
                            muiTheme.palette.primary1Color :
                            muiTheme.palette.secondaryTextColor
                    }}
                    leftIcon={
                        <SocialPersonIcon
                            color={pathname.includes(username) ?
                                muiTheme.palette.primary1Color :
                                muiTheme.palette.secondaryTextColor}
                        />
                    }
                />
                <ListItem
                    key={5}
                    primaryText="Activity"
                    onClick={() => navigate('/activity')}
                    innerDivStyle={{
                        ...styles.listItem,
                        color: pathname.match(/^\/activity/) ?
                            muiTheme.palette.primary1Color :
                            muiTheme.palette.secondaryTextColor
                    }}
                    leftIcon={
                        <SocialNotificationsIcon
                            color={pathname.match(/^\/activity/) ?
                                muiTheme.palette.primary1Color :
                                muiTheme.palette.secondaryTextColor}
                        />
                    }
                />
                <ListItem
                    key={6}
                    primaryText="Settings"
                    onClick={() => navigate('/settings')}
                    innerDivStyle={{
                        ...styles.listItem,
                        color: pathname.match(/^\/settings/) ?
                            muiTheme.palette.primary1Color :
                            muiTheme.palette.secondaryTextColor
                    }}
                    leftIcon={
                        <ActionSettingsIcon
                            color={pathname.match(/^\/settings/) ?
                                muiTheme.palette.primary1Color :
                                muiTheme.palette.secondaryTextColor}
                        />
                    }
                />
            </List>
            <Divider />
            <List>
                <ListItem
                    key={8}
                    innerDivStyle={styles.listItemSecondary}
                    leftIcon={<ActionHelpIcon color={muiTheme.palette.secondaryTextColor} />}
                    primaryText={
                        <a href="https://github.com/blacknred/restpublica"
                            target="_blank" rel="noopener noreferrer">Help</a>
                    }
                />
                <ListItem
                    key={9}
                    innerDivStyle={styles.listItemSecondary}
                    leftIcon={<ActionFeedbackIcon color={muiTheme.palette.secondaryTextColor} />}
                    primaryText={<a
                        href="https://github.com/blacknred/restpublica/issues/new"
                        target="_blank"
                        rel="noopener noreferrer">Send feedback</a>}

                />
            </List>
            <Subheader style={styles.footer}>
                <a href="https://github.com/blacknred/restpublica"
                    target="_blank" rel="noopener noreferrer">Conditions of use</a>
                <a href="/api" target="_blank" rel="noopener noreferrer">API Developers</a>
                <a href="https://github.com/blacknred/restpublica/issues/new"
                    target="_blank" rel="noopener noreferrer">Send feedback</a>
                <span> © {(new Date()).getFullYear()} Restpublica, LLC </span>
            </Subheader>
        </Drawer>
    )
}

DrawerContent.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}

export default muiThemeable()(DrawerContent);
