import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Tags from '../containers/Tags';
import ContentTabs from './ContentTabs';

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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
        padding: '0 16px'
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    leftBlock: {
        flex: 1,
    },
    title: {
        marginLeft: '0.5em',
        fontFamily: 'Product Sans, Roboto,Helvetica, Arial, sans-serif',
        textDecoration: 'none',
        '&:after': {
            content: "''",
            margin: '0 0.6em 0 1.1em',
            borderWidth: '0.03rem',
            borderStyle: 'solid',
            borderColor: theme.palette.text.hint
        }

    },
    statusTitle: {
        margin: '0 1.5em 0 0.6em',
        textTransform: 'capitalize',
    },
    avatar: {
        width: '36px',
        height: '36px'
    },
    searchBlock: {
        position: 'relative',
        flex: 1,
        maxWidth: '700px',
        height: '3em',
        lineHeight: '3em',
        marginRight: '1em',
        paddingLeft: '1em',
        borderRadius: '4px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)', //theme.palette.text.hint
        display: 'flex',
        alignItems: 'center'
    },
    searchBlockInput: {
        width: '100%'
    },
})

const HeaderContent = ({
    searchRedirect, avatar, path, notifications, username, history, classes, isDrawer,
    query, isNotFound, isNotify, isNightMode, isUserMenuOpen, isTrendingMenuOpen,
    goBack, isAuthenticated, toggleMenuOpen, logoutUser, switchNightMode,
    switchNotFound, switchDrawer, switchNotify, createFlashMessage, changeSearchQuery
}) => {

    const title = (
        <Hidden smDown>
            <Typography
                variant="headline"
                component={Link}
                to="/"
                className={classes.title}
            >
                Publica
            </Typography>
        </Hidden>
    )

    const statusTitle = (
        <Typography
            variant="title"
            color="textSecondary"
            className={classes.statusTitle}
        >
            {path[1] || 'feed'}
        </Typography>
    )

    const searchBlock = (
        <Hidden smDown>
            <div className={classes.searchBlock}>
                <Input
                    className={classes.searchBlockInput}
                    id='searchField'
                    placeholder="Search in Publica"
                    value={query}
                    disableUnderline
                    startAdornment={
                        <InputAdornment position="start" >
                            <ActionSearchIcon color="disabled" />
                        </InputAdornment>
                    }
                    onChange={changeSearchQuery}
                    onKeyPress={searchRedirect}
                    onFocus={() => toggleMenuOpen('isTrendingMenuOpen')}
                    onBlur={() => {
                        isTrendingMenuOpen &&
                            toggleMenuOpen('isTrendingMenuOpen')
                    }}
                />
                {isTrendingMenuOpen && <Tags isHeader={true} />}
            </div>
        </Hidden>
    )

    const searchLink = (
        <Hidden mdUp>
            <IconButton
                component={Link}
                to={{
                    pathname: "/search",
                    state: { modal: true }
                }}
            >
                <ActionSearchIcon />
            </IconButton>
        </Hidden>
    )

    const userActivityLink = (
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

    const loggedUserMenu = (
        <Hidden smDown>
            <IconButton
                id="userButton"
                aria-owns={'userMenu'}
                aria-haspopup="true"
                onClick={() => toggleMenuOpen('isUserMenuOpen')}
            >
                <Avatar
                    className={classes.avatar}
                    srcSet={`data:image/png;base64,${avatar}`}
                />
            </IconButton>
            <Menu
                id="userMenu"
                anchorEl={document.getElementById('userButton')}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isUserMenuOpen}
                onClose={() => toggleMenuOpen('isUserMenuOpen')}
            >
                <MenuItem
                    component={Link}
                    to='/settings/profile'
                >
                    <ListItemIcon>
                        <ActionSettingsIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Edit profile" />
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        toggleMenuOpen('isUserMenuOpen')
                        switchNightMode(false)
                        logoutUser()
                        switchDrawer(false)
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
                                    toggleMenuOpen('isUserMenuOpen')
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
                                    toggleMenuOpen('isUserMenuOpen')
                                }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Menu>
        </Hidden>
    )

    const loggedUserLink = (
        <Hidden mdUp>
            <IconButton
                component={Link}
                to='/settings/profile'
            >
                <Avatar
                    className={classes.avatar}
                    srcSet={`data:image/png;base64,${avatar}`}
                />
            </IconButton>
        </Hidden>
    )

    const notLoggedUserBlock = (
        <span>
            <Button component={Link} to="/login" >Login</Button>
            <Button component={Link} to="/register">Register</Button>
        </span>
    )

    return (
        <AppBar
            position="sticky"
            elevation={3}
            color='inherit'
            classes={{ root: classes.appBar }}
        >
            <Toolbar
                className={classes.toolbar}
                disableGutters
            >
                <Toolbar
                    className={classes.leftBlock}
                    disableGutters
                >
                    {
                        path[1].match(new RegExp(`(post|search|trending|${username})`)) ?
                            <IconButton onClick={goBack}>
                                <ArrowBackIcon />
                            </IconButton> :
                            <IconButton onClick={() => switchDrawer(!isDrawer)}>
                                <MenuIcon />
                            </IconButton>
                    }
                    {title}
                    {statusTitle}
                    {searchBlock}
                </Toolbar>
                <Toolbar disableGutters>
                    {searchLink}
                    {isAuthenticated && userActivityLink}
                    {isAuthenticated && loggedUserMenu}
                    {isAuthenticated && loggedUserLink}
                    {!isAuthenticated && notLoggedUserBlock}
                </Toolbar>
            </Toolbar>
            {
                path[1].match(/(trending|search|people)/) &&
                <ContentTabs path={path.join('/')} />
            }
        </AppBar>
    )
}

HeaderContent.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isNotify: PropTypes.bool.isRequired,
    isNightMode: PropTypes.bool.isRequired,
    isUserMenuOpen: PropTypes.bool.isRequired,
    isTrendingMenuOpen: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired,
    avatar: PropTypes.string,
    path: PropTypes.array.isRequired,
    query: PropTypes.string,
    switchNightMode: PropTypes.func.isRequired,
    switchDrawer: PropTypes.func.isRequired,
    switchNotify: PropTypes.func.isRequired,
    createFlashMessage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    searchRedirect: PropTypes.func.isRequired,
    toggleMenuOpen: PropTypes.func.isRequired,
    changeSearchQuery: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired,
}

export default withStyles(styles)(HeaderContent);