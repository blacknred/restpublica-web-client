import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Badge from 'material-ui/Badge';
import Toggle from 'material-ui/Toggle';
import { grey200, grey300, grey600, grey900, black } from 'material-ui/styles/colors';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import SocialNotificationsIcon from 'material-ui/svg-icons/social/notifications';
import SocialNotificationsOffIcon from 'material-ui/svg-icons/social/notifications-off';
import ActionSettingsIcon from 'material-ui/svg-icons/action/settings';
import ActionExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';

const styles = {
    appbar: {
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: '1400',
        boxShadow: '0 1px 8px rgba(0,0,0,.3)'
    },
    drawerButton: {
        marginLeft: '-10px'
    },
    drawerButtonIcon: {
        color: grey600
    },
    toolbarTitle: {
        fontSize: '1.2em',
        marginLeft: '1em',
        fontWeight: '700'
    },
    searchField: {
        width: '450px',
        height: '42px',
        lineHeight: '42px',
        padding: '0 1em',
        marginLeft: '35px',
        borderRadius: '3px'
    },
    badge: {
        top: '15px',
        right: '10px'
    },
    userButton: {
        margin: '0px',
        padding: '0px'
    },
    iconButton: {
        color: grey600
    },
    userMenu: {
        cursor: 'pointer'
    },
    newPost: {
        minWidth: '48px'
    }
}

const HeaderContent = ({ redirect, user, query, isDrawer, isNightMode, isNotFound,
    isAuthenticated, isNotify, notifications, toggleNightMode, createFlashMessage,
    toggleNotFound, toggleDrawer, toggleNotify, logoutUser }) => {

    const searchSubmit = (event) => {
        event.preventDefault();
        const query = event.target.querySelector('#searchField').value
        if (isNotFound) toggleNotFound();
        if (query) redirect(`/search/${query}/posts`);
    }
    const searchBlock = (
        <form onSubmit={searchSubmit}>
            <TextField
                hintText={query || "Search"}
                id='searchField'
                style={Object.assign({}, styles.searchField,
                    { backgroundColor: isNightMode ? grey900 : grey300, })}
                inputStyle={{ color: isNightMode ? grey200 : grey900 }}
                underlineShow={false}
                hintStyle={{ bottom: '0' }}
            />
        </form>
    );
    const notifyButton = (
        <Link to='/me/activity'>
            {
                isNotify ?
                    notifications.length ?
                        <Badge
                            badgeContent={notifications.length}
                            secondary={true}
                            badgeStyle={styles.badge} >
                            <SocialNotificationsIcon style={styles.iconButton} />
                        </Badge>
                        : <IconButton iconStyle={styles.iconButton}>
                            <SocialNotificationsIcon />
                        </IconButton>
                    : <IconButton iconStyle={styles.iconButton}>
                        <SocialNotificationsOffIcon />
                    </IconButton>
            }
        </Link>
    );
    const userButton = (
        <IconMenu
            iconButtonElement={
                <IconButton style={styles.userButton}>
                    <Avatar src={`data:image/png;base64, ${user.avatar}`} size={35} />
                </IconButton>
            }
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            style={styles.userMenu} >
            <MenuItem leftIcon={<ActionSettingsIcon />} >
                <Link to='/settings/profile'>Edit profile</Link>
            </MenuItem>
            <MenuItem
                leftIcon={<ActionExitToAppIcon />}
                onClick={() => {
                    createFlashMessage('You are now logged out.')
                    logoutUser();
                }}
            >
                Sign out
            </MenuItem>
            <MenuItem>
                <Toggle
                    style={{ paddingTop: 14 }}
                    label="Notifications"
                    defaultToggled={isNotify}
                    toggled={isNotify}
                    onToggle={() => {
                        toggleNotify(!isNotify);
                        createFlashMessage(`Notifications are turn 
                        ${!isNotify === true ? 'on' : 'off'}`)
                    }}
                />
            </MenuItem>
            <MenuItem>
                <Toggle
                    style={{ paddingTop: 14 }}
                    label="Night mode"
                    defaultToggled={isNightMode}
                    toggled={isNightMode}
                    onToggle={() => {
                        toggleNightMode(!isNightMode);
                        createFlashMessage(`Night mode is 
                        ${!isNightMode === true ? 'on' : 'off'}`)
                    }}
                />
            </MenuItem>
        </IconMenu>
    );
    const toobarLeftGroup = (
        <ToolbarGroup>
            {
                isAuthenticated ?
                    <IconButton
                        style={styles.drawerButton}
                        iconStyle={styles.drawerButtonIcon}
                        onClick={() => toggleDrawer(!isDrawer)} >
                        <NavigationMenuIcon />
                    </IconButton>
                    : null
            }
            <ToolbarTitle
                text={<span>REST<small>publica</small></span>}
                style={Object.assign({}, styles.toolbarTitle,
                    { color: isNightMode ? grey200 : grey600 })} />
            {searchBlock}
        </ToolbarGroup>
    );
    const toobarRightGroup = (
        isAuthenticated ?
            <ToolbarGroup>
                <Link to={{ pathname: '/newpost', state: { modal: true } }}>
                    <FlatButton
                        //label='create'
                        //secondary={true}
                        style={styles.newPost}
                        icon={<ContentAddIcon />}
                    />
                </Link>
                {notifyButton}
                {userButton}
            </ToolbarGroup> :
            <ToolbarGroup>
                <Link to='/login'>
                    <FlatButton label='Login' />
                </Link>
                <Link to='/register'>
                    <FlatButton label='Register' />
                </Link>
            </ToolbarGroup>
    );
    return (
        <Toolbar style={Object.assign({}, styles.appbar,
            { backgroundColor: isNightMode ? black : 'white' })}>
            {toobarLeftGroup}
            {toobarRightGroup}
        </Toolbar>
    )
}

HeaderContent.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isNotify: PropTypes.bool.isRequired,
    isNightMode: PropTypes.bool.isRequired,
    isNotFound: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired,
    query: PropTypes.any.isRequired,
    toggleNotFound: PropTypes.func.isRequired,
    toggleNotify: PropTypes.func.isRequired,
    createFlashMessage: PropTypes.func.isRequired,
    redirect: PropTypes.func.isRequired
}

export default HeaderContent