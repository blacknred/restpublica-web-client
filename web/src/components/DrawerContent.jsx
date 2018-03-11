import React from 'react';
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ActionDashboardIcon from 'material-ui/svg-icons/action/dashboard';
import ActionExploreIcon from 'material-ui/svg-icons/action/explore';
import SocialPersonIcon from 'material-ui/svg-icons/social/person';
import ActionSettingsIcon from 'material-ui/svg-icons/action/settings';
import ActionHelpIcon from 'material-ui/svg-icons/action/help';
import ActionFeedbackIcon from 'material-ui/svg-icons/action/feedback';
import ActionViewColumnIcon from 'material-ui/svg-icons/action/view-column';
import SocialNotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { red400 } from 'material-ui/styles/colors';

const styles = {
    drawer: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        padding: '4em 0 1em 0',
        justifyContent: 'space-between',
        width: '240px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
    },
    listItem: {
        marginLeft: '10px',
        fontSize: '16px',
        //color: red400
    },
    listItemSecondary: {
        marginLeft: '10px',
        fontSize: '15px',
        opacity: '0.7'
    },
    footer: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '3em 2em 0 2em',
        fontSize: '14px'
    }
}

const DrawerContent = ({ pathname, navigate, isDrawer, username }) => {
    return (
        <Drawer
            open={isDrawer}
            containerStyle={styles.drawer}>
            <List>
                <ListItem
                    key={1}
                    innerDivStyle={styles.listItem}
                    primaryText="Dashboard"
                    leftIcon={<ActionDashboardIcon
                        color={pathname === '/' ? red400 : null} />}
                    onClick={() => navigate('/')}
                />
                <ListItem
                    key={2}
                    innerDivStyle={styles.listItem}
                    primaryText="Trending"
                    leftIcon={<ActionExploreIcon
                        color={pathname === '/trending' ? red400 : null} />}
                    onClick={() => navigate('/trending')}
                />
                <ListItem
                    key={3}
                    innerDivStyle={styles.listItem}
                    primaryText="Communities"
                    leftIcon={<ActionViewColumnIcon
                        color={pathname.match(/^\/communities\/(.)+/) ? red400 : null} />}
                    onClick={() => navigate('/communities')}
                />
                <ListItem
                    key={4}
                    innerDivStyle={styles.listItem}
                    primaryText="Profile"
                    leftIcon={<SocialPersonIcon
                        color={pathname.includes(username) ? red400 : null} />}
                    onClick={() => navigate('/profile')}
                />
                <ListItem
                    key={5}
                    innerDivStyle={styles.listItem}
                    primaryText="Activity"
                    leftIcon={<SocialNotificationsIcon
                        color={pathname.match(/^\/activity\/(.)+/) ? red400 : null} />}
                    onClick={() => navigate('/activity')}
                />
            </List>
            <Divider />
            <List>
                <ListItem
                    key={5}
                    innerDivStyle={styles.listItemSecondary}
                    primaryText="Settings"
                    leftIcon={<ActionSettingsIcon
                        color={pathname.match(/^\/settings/) ? red400 : null} />}
                    onClick={() => navigate('/settings')}
                />
                <ListItem
                    key={6}
                    innerDivStyle={styles.listItemSecondary}
                    primaryText={<a 
                        href="https://github.com/blacknred/restpublica"
                        target="_blank"
                        rel="noopener noreferrer">Help</a>}
                    leftIcon={<ActionHelpIcon />}
                />
                <ListItem
                    key={7}
                    innerDivStyle={styles.listItemSecondary}
                    primaryText={<a 
                        href="https://github.com/blacknred/restpublica/issues/new"
                        target="_blank"
                        rel="noopener noreferrer">Send feedback</a>}
                    leftIcon={<ActionFeedbackIcon />}
                />
            </List>
            <Subheader style={styles.footer}>
                © {(new Date()).getFullYear()} Restpublica, LLC
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

export default DrawerContent
