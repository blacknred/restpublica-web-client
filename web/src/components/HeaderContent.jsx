import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List, {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Switch from 'material-ui/Switch';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Hidden from 'material-ui/Hidden';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';
import Slide from 'material-ui/transitions/Slide';
import ActionSearchIcon from '@material-ui/icons/Search';
import Input, { InputAdornment } from 'material-ui/Input';
import ActionSettingsIcon from '@material-ui/icons/Settings';
import ActionExitToAppIcon from '@material-ui/icons/ExitToApp';
import SocialNotificationsIcon from '@material-ui/icons/NotificationsNone';
import SocialNotificationsOffIcon from '@material-ui/icons/NotificationsOff';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: '0 1px 8px rgba(0,0,0,.3)',
        color: '#fff',
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '0 -32px',
        '@media (max-width: 600px)': {
            margin: '0 -24px',
        },
    },
    leftBlock: {
        flex: 1,
    },
    title: {
        margin: '0 1.3em 0 0.5em',
        fontFamily: 'Product Sans, Roboto,Helvetica, Arial, sans-serif'
    },
    statusTitle: {
        borderLeft: '1px solid #bbb',
        padding: '0 1.3em',
        lineHeight: '1.8em',
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
        paddingLeft: '0.8em',
        borderRadius: '3px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        color: "inherit"
    },
})

const HeaderContent = ({
    redirect, avatar, mode, query, notifications, history, classes, isDrawer, isNotFound,
    isUserMenuOpen, isAuthenticated, userMenuOpen, logoutUser, switchNightMode,
    switchNotFound, switchDrawer, switchNotify, createFlashMessage, ...props
}) => {

    const statusTitle = (
        <Hidden only={['xs', 'sm']}>
            <Typography
                variant="title"
                color="inherit"
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
                        <ActionSearchIcon />
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
        <Hidden only={['sm', 'md', 'lg']}>
            <IconButton
                component={Link}
                to="/s"
                color="inherit"
            >
                <ActionSearchIcon />
            </IconButton>
        </Hidden>
    )

    const userActivity = (
        <IconButton
            color="inherit"
            component={Link}
            to="/activity"
        >
            {
                props.isNotify ?
                    notifications.length ?
                        <Badge
                            badgeContent={notifications.length}
                            color='error'
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
                onClose={() => userMenuOpen(false)}>
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
                                checked={props.isNotify}
                                onChange={() => {
                                    switchNotify(!props.isNotify);
                                    createFlashMessage(`Notifications are turn 
                                    ${!props.isNotify === true ? 'on' : 'off'}`)
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
                                checked={props.isNightMode}
                                onChange={() => {
                                    switchNightMode(!props.isNightMode);
                                    createFlashMessage(`Night mode is 
                                        ${!props.isNightMode === true ? 'on' : 'off'}`)
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
            //color='inherit'
            classes={{ root: classes.appBar }}
        >
            <Slide
                direction="down"
                in={true}
                timeout={400}
            >
                <Toolbar className={classes.toolbar}>
                    <Toolbar className={classes.leftBlock}>
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            onClick={() => switchDrawer(!isDrawer)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="title"
                            component={Link}
                            to="/"
                            color="inherit"
                            className={classes.title}
                        >
                            Publica
                        </Typography>
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
            </Slide>
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