import React from 'react';
import PropTypes from 'prop-types'

import List, {
    ListItem,
    ListItemIcon,
    ListItemText
} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import ActionDashboardIcon from '@material-ui/icons/Home';
import ActionExploreIcon from '@material-ui/icons/Explore';
import SocialPersonIcon from '@material-ui/icons/Person';
import ActionSettingsIcon from '@material-ui/icons/Settings';
import ActionViewColumnIcon from '@material-ui/icons/ViewColumn';
import SocialNotificationsIcon from '@material-ui/icons/Notifications';
const styles = theme => ({
    drawer: {
        fontSize: '0.95rem',
        borderWidth: 0,
        fontWeight: '700',
    },
    container: {
        height: '100%',
        //color: theme.palette.text.secondary
    },
    listItem: {
        paddingLeft: '28px',
    },
    icon: {
        paddingRight: '8px'
    },
    active: {
        color: theme.palette.primary.main,
        paddingRight: '8px'
    },
    a: {
        textDecoration: 'none',
        fontWeight: '100',
        color: 'inherit',
    },
    footer: {
        padding: '1em 2em',
        fontSize: '0.83rem',
        opacity: '0.6',
        fontWeight: '100',
        lineHeight: '1.5em',
        position: 'absolute',
        bottom: 0,
    }
})

const DrawerContent = ({ path, navigate, isDrawer, username, classes }) => {

    const primaryNavList = (
        <List component="nav">
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate('/')}>
                <ListItemIcon
                    className={path === '/' ? classes.active : classes.icon}>
                    <ActionDashboardIcon />
                </ListItemIcon>
                <ListItemText
                    primary='Feed'
                    disableTypography={true}
                    className={path === '/' ? classes.active : null}
                />
            </ListItem>
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate('/trending')}>
                <ListItemIcon className={
                    path.match(/^\/trending/) ? classes.active : classes.icon}>
                    <ActionExploreIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Trending"
                    disableTypography={true}
                    className={path.match(/^\/trending/) ? classes.active : null}
                />
            </ListItem>
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate('/communities')}>
                <ListItemIcon className={
                    path.match(/^\/communities/) ? classes.active : classes.icon
                }>
                    <ActionViewColumnIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Communities"
                    disableTypography={true}
                    className={path.match(/^\/communities/) ? classes.active : null}
                />
            </ListItem>
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate(`/${username}`)}>
                <ListItemIcon className={
                    path.match(new RegExp(`^/${username}`)) ? classes.active : classes.icon
                }>
                    <SocialPersonIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Profile"
                    disableTypography={true}
                    className={
                        path.match(new RegExp(`^/${username}`)) ? classes.active : null
                    }
                />
            </ListItem>
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate('/activity')}>
                <ListItemIcon className={
                    path.match(/^\/activity/) ? classes.active : classes.icon
                }>
                    <SocialNotificationsIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Activity"
                    disableTypography={true}
                    className={path.match(/^\/activity/) ? classes.active : null}
                />
            </ListItem>
            <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={() => navigate('/settings')}>
                <ListItemIcon className={
                    path.match(/^\/settings/) ? classes.active : classes.icon
                }>
                    <ActionSettingsIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Settings"
                    disableTypography={true}
                    className={path.match(/^\/settings/) ? classes.active : null}
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
                        disableTypography={true} />
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
                        disableTypography={true} />
                </ListItem>
            </a>
        </List>
    )

    const footerLinks = (
        <div className={classes.footer}>
            <span> © {(new Date()).getFullYear()} Restpublica, LLC </span>
            <br />
            <a
                href="https://github.com/blacknred/restpublica"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.a}>
                Conditions of use
            </a>
            <br />
            <a
                href="/api"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.a}>
                API Developers
            </a>
            <br />
            <a
                href="https://github.com/blacknred/restpublica/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.a}>
                Send feedback
            </a>
        </div>
    )

    return (
        < Drawer
            variant="persistent"
            anchor={'left'}
            open={isDrawer}
            classes={{ paper: classes.drawer }}
        >
            <Slide
                direction="right"
                in={isDrawer}
                timeout={400}
            >
                <div className={classes.container}>
                    <br />
                    <br />
                    <br />
                    <br />
                    {primaryNavList}
                    <Divider light={true} />
                    {secondaryNavList}
                    {footerLinks}
                </div>
            </Slide>
        </Drawer >
    )
}

DrawerContent.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DrawerContent);
