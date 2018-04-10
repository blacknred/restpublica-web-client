import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import Toggle from 'material-ui/Toggle';
import muiThemeable from 'material-ui/styles/muiThemeable';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import ContentAddIcon from 'material-ui/svg-icons/content/add-circle';
import SocialNotificationsIcon from 'material-ui/svg-icons/social/notifications';
import SocialNotificationsOffIcon from 'material-ui/svg-icons/social/notifications-off';
import ActionSettingsIcon from 'material-ui/svg-icons/action/settings';
import ActionExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';

const styles = {
    appbar: {
        zIndex: '1400',
        position: 'fixed',
        boxShadow: '0 1px 8px rgba(0,0,0,.3)'
    },
    title: {
        fontSize: '1.3em',
        fontWeight: '700',
        margin: '0 1.5em 0 0.7em',
        flex: null
    },
    rightBlock: {
        flex: 1,
        marginRight: '0.3em'
    },
    rightBlockContainer: {
        display: 'flex'
    },
    searchBlock: {
        flex: 1
    },
    searchField: {
        maxWidth: '600px',
        width: '90%',
        height: '48px',
        lineHeight: '48px',
        paddingLeft: '1em',
        borderRadius: '3px',
        backgroundColor: 'rgba(158, 158, 158, 0.2)'
    },
    hintStyle: {
        paddingLeft: '1em'
    },
    badgeStyle: {
        top: '12px',
        right: '8px'
    },
    userButtonIcon: {
        padding: '0px'
    },
    userButtonAnchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom'
    },
    userButtonTargetOrigin: {
        horizontal: 'right',
        vertical: 'top'
    },
    userButtonToggle: {
        paddingTop: 14
    }

}

const HeaderContent = ({ redirect, avatar, query, isDrawer, isNightMode, isNotFound,
    isAuthenticated, isNotify, notifications, toggleNightMode, createFlashMessage,
    toggleNotFound, toggleDrawer, toggleNotify, logoutUser, muiTheme }) => {

    const searchSubmit = (event) => {
        event.preventDefault();
        const query = event.target.value
        if (isNotFound) toggleNotFound();
        if (query) redirect(`/search/${query}/posts`);
    }
    const notifyButton = (
        <Link to='/me/activity'>
            {
                isNotify ?
                    notifications.length ?
                        <Badge
                            badgeContent={notifications.length}
                            primary={true}
                            badgeStyle={styles.badgeStyle} />
                        : <IconButton>
                            <SocialNotificationsIcon
                                color={muiTheme.palette.secondaryTextColor} />
                        </IconButton>
                    : <IconButton>
                        <SocialNotificationsOffIcon
                            color={muiTheme.palette.secondaryTextColor} />
                    </IconButton>
            }
        </Link>
    );
    const userButton = (
        <IconMenu
            iconButtonElement={
                <IconButton style={styles.userButtonIcon}>
                    <Avatar
                        src={`data:image/png;base64, ${avatar}`}
                        size={35}
                    />
                </IconButton>
            }
            anchorOrigin={styles.userButtonAnchorOrigin}
            targetOrigin={styles.userButtonTargetOrigin}
        >
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
                    style={styles.userButtonToggle}
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
                    style={styles.userButtonToggle}
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
    return (
        <AppBar
            style={Object.assign(styles.appbar, { backgroundColor: muiTheme.palette.canvasColor })}
            title='Restpublica'
            titleStyle={Object.assign(styles.title, { color: muiTheme.palette.secondaryTextColor })}
            iconElementLeft={
                <IconButton>
                    <NavigationMenuIcon color={muiTheme.palette.secondaryTextColor} />
                </IconButton>
            }
            onLeftIconButtonClick={() => toggleDrawer(!isDrawer)}
            iconStyleRight={styles.rightBlock}
            iconElementRight={
                <div style={styles.rightBlockContainer}>
                    <TextField
                        hintText={query || "Search"}
                        style={styles.searchBlock}
                        inputStyle={styles.searchField}
                        underlineShow={false}
                        hintStyle={styles.hintStyle}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                searchSubmit(ev)
                                ev.preventDefault();
                            }
                        }}
                    />
                    {/* {
                        isAuthenticated &&
                        <Link to={{ pathname: '/newpost', state: { modal: true } }}>
                            <IconButton>
                                <ContentAddIcon
                                    color={muiTheme.palette.secondaryTextColor} />
                            </IconButton>
                        </Link>
                    } */}
                    {isAuthenticated && notifyButton}
                    {isAuthenticated && userButton}
                    {
                        !isAuthenticated &&
                        <span>
                            <Link to='/login'>
                                <FlatButton label='Login' />
                            </Link>
                            <Link to='/register'>
                                <FlatButton label='Register' />
                            </Link>
                        </span>
                    }
                </div>
            }
        />

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
    avatar: PropTypes.string.isRequired,
    query: PropTypes.any,
    toggleNotFound: PropTypes.func.isRequired,
    toggleNotify: PropTypes.func.isRequired,
    createFlashMessage: PropTypes.func.isRequired,
    redirect: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
}

export default muiThemeable()(HeaderContent);