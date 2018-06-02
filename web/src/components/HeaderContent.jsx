import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Menu from '@material-ui/core/Menu';
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ActionSearchIcon from '@material-ui/icons/Search';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ActionSettingsIcon from '@material-ui/icons/Settings';
import InputAdornment from '@material-ui/core/InputAdornment';
import ActionExitToAppIcon from '@material-ui/icons/ExitToApp';
import SocialNotificationsIcon from '@material-ui/icons/NotificationsNone';
import SocialNotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '0 -32px',
        '@media (max-width: 600px)': {
            margin: '0 -24px',
        },
        '& a': {
            textDecoration: 'none',
            color: 'inherit'
        },
        color: theme.palette.text.primary
    },
    leftBlock: {
        flex: 1,
    },
    title: {
        margin: '0 1.3em 0 0.5em',
        fontFamily: 'Product Sans, Roboto,Helvetica, Arial, sans-serif',

    },
    statusTitle: {
        borderLeft: '1px solid #bbb',
        padding: '0 1.3em',
        lineHeight: '1.8em',
        '@media (max-width: 600px)': {
            borderLeft: '0',
            padding: '0 0.5em'
        },
    },
    avatar: {
        width: '34px',
        height: '34px'
    },
    searchBlock: {
        flex: 1,
        maxWidth: '720px',
        height: '3.3em',
        lineHeight: '3.5em',
        paddingLeft: '1em',
        borderRadius: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
    },
})

const HeaderContent = ({
    redirect, avatar, mode, query, notifications, history, classes, isDrawer, 
    isNotFound, isNotify, isNightMode, isUserMenuOpen, isAuthenticated,
    userMenuOpen, logoutUser, switchNightMode, switchNotFound, switchDrawer,
    switchNotify, createFlashMessage,
}) => {

    const title = (
        <Hidden only='xs'>
            <Typography
                variant="headline"
                component={Link}
                to="/"
                color="primary"
                className={classes.title}
            >
                Publica
            </Typography>
        </Hidden>
    )

    const statusTitle = (
        <Hidden only='sm'>
            <Typography
                variant="title"
                color="textSecondary"
                className={classes.statusTitle}
            >
                {mode && mode[0].toUpperCase() + mode.substr(1)}
            </Typography>
        </Hidden>
    )

    const searchBlock = (
        <Hidden only='xs'>
            <Input
                placeholder="Search in Publica"
                defaultValue={query}
                className={classes.searchBlock}
                disableUnderline={true}
                startAdornment={
                    <InputAdornment position="start" >
                        <ActionSearchIcon color="disabled" />
                    </InputAdornment>
                }
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        const query = ev.target.value
                        if (isNotFound) switchNotFound()
                        if (query) redirect(`/search/${query}/posts`)
                        ev.preventDefault();
                    }
                }}
            />
        </Hidden>
    )

    const searchLink = (
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <IconButton
                component={Link}
                to="/s"
            //color="inherit"
            >
                <ActionSearchIcon />
            </IconButton>
        </Hidden>
    )

    const userActivity = (
        <IconButton
            component={Link}
            to="/activity"
        >
            {
                isNotify ?
                    notifications.length ?
                        <Badge
                            badgeContent={notifications.length}
                            color='primary'
                            children={''}
                        /> :
                        <SocialNotificationsIcon color="inherit" />
                    :
                    <SocialNotificationsOffIcon color="inherit" />
            }
        </IconButton>
    )

    const loggedUserButton = (
        <div>
            <IconButton
                id="userButton"
                aria-owns={'userMenu'}
                aria-haspopup="true"
                onClick={() => userMenuOpen(true)}
            >
                <Avatar
                    className={classes.avatar}
                    srcSet={`data:image/png;base64,${avatar}`} />
            </IconButton>
            <Menu
                id="userMenu"
                anchorEl={document.getElementById('userButton')}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={isUserMenuOpen}
                onClose={() => userMenuOpen(false)}
            >
                <MenuItem
                    onClick={() => {
                        userMenuOpen(false)
                        redirect('/settings/profile')
                    }} >
                    <ListItemIcon>
                        <ActionSettingsIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Edit profile" />
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        userMenuOpen(false)
                        switchNightMode(false)
                        logoutUser()
                        createFlashMessage('You are now logged out.')
                    }}>
                    <ListItemIcon>
                        <ActionExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Sign out" />
                </MenuItem>
                <List>
                    <ListItem>
                        <ListItemText primary="Notifications" />
                        <ListItemSecondaryAction>
                            <Switch
                                color='primary'
                                checked={isNotify}
                                onChange={() => {
                                    switchNotify(!isNotify);
                                    createFlashMessage(`Notifications are turn 
                                    ${!isNotify === true ? 'on' : 'off'}`)
                                    userMenuOpen(false)
                                }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Night mode" />
                        <ListItemSecondaryAction>
                            <Switch
                                color='primary'
                                checked={isNightMode}
                                onChange={() => {
                                    switchNightMode(!isNightMode);
                                    createFlashMessage(`Night mode is 
                                        ${!isNightMode === true ? 'on' : 'off'}`)
                                    userMenuOpen(false)
                                }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Menu>
        </div>
    )

    const notLoggedUserBlock = (
        <span>
            <Button component={Link} to="/login" >Login</Button>
            <Button component={Link} to="/register">Register</Button>
        </span>
    )

    return (
        <AppBar
            position="fixed"
            elevation={3}
            color='inherit'
            classes={{ root: classes.appBar }}
        >
            <Toolbar className={classes.toolbar}>
                <Toolbar className={classes.leftBlock}>
                    <IconButton
                        //color="inherit"
                        aria-label="Menu"
                        onClick={() => switchDrawer(!isDrawer)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {title}
                    {statusTitle}
                    {searchBlock}
                </Toolbar>
                <Toolbar>
                    {searchLink}
                    {isAuthenticated && userActivity}
                    {isAuthenticated && loggedUserButton}
                    {!isAuthenticated && notLoggedUserBlock}
                </Toolbar>
            </Toolbar>
        </AppBar>
    )
}

HeaderContent.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isNotify: PropTypes.bool.isRequired,
    isNightMode: PropTypes.bool.isRequired,
    isNotFound: PropTypes.bool.isRequired,
    isUserMenuOpen: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired,
    avatar: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    query: PropTypes.string,
    history: PropTypes.any,
    switchNotFound: PropTypes.func.isRequired,
    switchNightMode: PropTypes.func.isRequired,
    switchDrawer: PropTypes.func.isRequired,
    switchNotify: PropTypes.func.isRequired,
    createFlashMessage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    redirect: PropTypes.func.isRequired,
    userMenuOpen: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HeaderContent);