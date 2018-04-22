import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Input, { InputAdornment } from 'material-ui/Input';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import List, {
    ListItem, ListItemIcon, ListItemText,
    ListItemSecondaryAction,
} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Switch from 'material-ui/Switch';
import ActionSettingsIcon from '@material-ui/icons/Settings';
import ActionExitToAppIcon from '@material-ui/icons/ExitToApp';
import ActionSearchIcon from '@material-ui/icons/Search';
import SocialNotificationsIcon from '@material-ui/icons/Notifications';
import SocialNotificationsOffIcon from '@material-ui/icons/NotificationsOff';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: '0 1px 8px rgba(0,0,0,.3)',
        animation: 'topOff 0.5s',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    toolbarGutters: {
        padding: '0 16px'
    },
    leftBlock: {
        flex: 1,
    },
    title: {
        margin: '0 1em',
        fontFamily: 'Product Sans, Roboto,Helvetica, Arial, sans-serif'
    },
    statusTitle: {
        borderLeft: '2px solid ' + theme.palette.action.selected,
        paddingLeft: '1em',
        lineHeight: '1.8em'
    },
    avatar: {
        width: '36px',
        height: '36px'
    },
    searchBlock: {
        marginLeft: '1.5em',
        flex: 1,
        maxWidth: '600px',
        height: '48px',
        lineHeight: '48px',
        paddingLeft: '0.8em',
        borderRadius: '4px',
        backgroundColor: theme.palette.action.selected,
        display: 'flex',
        opacity: '0.8',
        alignItems: 'center'
    },
})

const HeaderContent = ({ redirect, avatar, mode, query, notifications, history, classes, isDrawer,
    isUserMenuOpen, isNotFound, isAuthenticated, userMenuOpen, logoutUser, switchNightMode,
    switchNotFound, switchDrawer, switchNotify, createFlashMessage, ...props }) => {

    const searchBlock = (
        <Input
            placeholder="Search"
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
    )

    const userActivity = (
        <Link to='/activity'>
            <IconButton>
                {
                    props.isNotify ?
                        notifications.length ?
                            <Badge
                                badgeContent={notifications.length}
                                color="primary"
                                children={' '}
                            /> :
                            <SocialNotificationsIcon />
                        :
                        <SocialNotificationsOffIcon />
                }
            </IconButton>
        </Link>
    )

    const loggedUserButton = (
        <div>
            <IconButton
                id="userButton"
                aria-owns={'userMenu'}
                aria-haspopup="true"
                onClick={() => userMenuOpen(true)}
                color="inherit" >
                <Avatar
                    className={classes.avatar}
                    src={`data:image/png;base64, ${avatar}`} />
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
            <Link to='/login'>
                <Button color="inherit">Login</Button>
            </Link>
            <Link to='/register'>
                <Button color="inherit">Register</Button>
            </Link>
        </span>
    )

    return (
        <AppBar
            position="fixed"
            color="inherit"
            className={classes.appBar}
        >
            <Toolbar
                className={classes.leftBlock}
                classes={{ gutters: classes.toolbarGutters }} >
                <IconButton
                    color="default"
                    aria-label="Menu"
                    onClick={() => switchDrawer(!isDrawer)} >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="title"
                    color='default'
                    className={classes.title}>
                    Publica
                </Typography>
                <Typography
                    variant="title"
                    color='textSecondary'
                    className={classes.statusTitle}>
                    {mode && mode[0].toUpperCase() + mode.substr(1)}
                </Typography>
                {searchBlock}
            </Toolbar>
            <Toolbar>
                {isAuthenticated && userActivity}
                {isAuthenticated && loggedUserButton}
                {!isAuthenticated && notLoggedUserBlock}
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