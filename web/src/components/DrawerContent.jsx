import React from 'react';
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import ActionDashboardIcon from '@material-ui/icons/Home';
import ActionExploreIcon from '@material-ui/icons/Explore';
import SocialPersonIcon from '@material-ui/icons/Person';
import ActionSettingsIcon from '@material-ui/icons/Settings';
import ActionViewColumnIcon from '@material-ui/icons/ViewColumn';
import SocialNotificationsIcon from '@material-ui/icons/Notifications';

const styles = theme => ({
    drawer: {
        width: '220px',
        animation: 'leftOff 0.5s',
        fontSize: '0.98em',
        borderWidth: 0,
        fontWeight: '700'
    },
    link: {
        color: theme.palette.text.secondary
    },
    activeLink: {
        color: theme.palette.primary.main,
    },
    listItem: {
        paddingLeft: '28px',
    },
    a: {
        textDecoration: 'none',
        fontWeight: '100',
        color: 'inherit'
    },
    footer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column-reverse',
        padding: '1em 2em',
        fontSize: '13px',
        opacity: '0.5',
        fontWeight: '100',
        lineHeight: '1.5em'
    }
})

const DrawerContent = ({ pathname, navigate, isDrawer, username, classes }) => {

    const primaryNavList = (
        <List component="nav">
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate('/')}>
                <ListItemIcon
                    className={pathname === '/' ? classes.activeLink : classes.link}>
                    <ActionDashboardIcon />
                </ListItemIcon>
                <ListItemText
                    primary='Feed'
                    disableTypography={true}
                    className={pathname === '/' ? classes.activeLink : classes.link}
                />
            </ListItem>
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate('/trending')}>
                <ListItemIcon
                    className={pathname === '/trending' ? classes.activeLink : classes.link}>
                    <ActionExploreIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Trending"
                    disableTypography={true}
                    className={pathname === '/trending' ? classes.activeLink : classes.link}
                />
            </ListItem>
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate('/communities')}>
                <ListItemIcon
                    className={pathname.match(/^\/communities/) ? classes.activeLink : classes.link}>
                    <ActionViewColumnIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Communities"
                    disableTypography={true}
                    className={pathname.match(/^\/communities/) ? classes.activeLink : classes.link}
                />
            </ListItem>
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate('/profile')}>
                <ListItemIcon
                    className={pathname === '/profile' ? classes.activeLink : classes.link}>
                    <SocialPersonIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Profile"
                    disableTypography={true}
                    className={pathname === '/profile' ? classes.activeLink : classes.link}
                />
            </ListItem>
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate('/activity')}>
                <ListItemIcon
                    className={pathname.match(/^\/activity/) ? classes.activeLink : classes.link}>
                    <SocialNotificationsIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Activity"
                    disableTypography={true}
                    className={pathname.match(/^\/activity/) ? classes.activeLink : classes.link}
                />
            </ListItem>
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate('/settings')}>
                <ListItemIcon
                    className={pathname.match(/^\/settings/) ? classes.activeLink : classes.link}>
                    <ActionSettingsIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Settings"
                    disableTypography={true}
                    className={pathname.match(/^\/settings/) ? classes.activeLink : classes.link}
                />
            </ListItem>
        </List>
    )

    const secondaryNavList = (
        <List component="nav">
            <a
                href="https://github.com/blacknred/restpublica"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.a}>
                <ListItem
                    button
                    className={classes.listItem}>
                    <ListItemText
                        primary='Help'
                        disableTypography={true}
                        className={classes.link} />
                </ListItem>
            </a>
            <a
                href="https://github.com/blacknred/restpublica/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.a}>
                <ListItem
                    button
                    className={classes.listItem}>
                    <ListItemText
                        primary='Send feedback'
                        disableTypography={true}
                        className={classes.link} />
                </ListItem>
            </a>
        </List>
    )

    const footerLinks = (
        <span className={classes.footer}>
            <a
                href="https://github.com/blacknred/restpublica"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.a}>
                Conditions of use
            </a>
            <a
                href="/api"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.a}>
                API Developers
            </a>
            <a
                href="https://github.com/blacknred/restpublica/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.a}>
                Send feedback
            </a>
            <span> © {(new Date()).getFullYear()} Restpublica, LLC </span>
        </span>
    )
    
    return (
        <Drawer
            variant="persistent"
            anchor={'left'}
            open={isDrawer}
            classes={{ paper: classes.drawer }}
        >
            <br />
            <br />
            <br />
            <br />
            {primaryNavList}
            <Divider light={true} />
            {secondaryNavList}
            {footerLinks}
            <br />
        </Drawer >
    )
}

DrawerContent.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DrawerContent);
