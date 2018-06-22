import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import compose from 'recompose/compose';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import PeopleIcon from '@material-ui/icons/People';
import ExploreIcon from '@material-ui/icons/Explore';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const styles = theme => ({
    drawerPaper: {
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    drawerPaperMobile: {
        width: '300px',
        '& a': {
            textDecoration: 'none',
            color: 'inherit'
        },
        height: '100vh'
    },
    drawerRoot: {
        height: '100vh',
        marginTop: '4.5em',
    },
    drawerRoot2: {
        height: '100vh',
        marginTop: '7.5em',
    },
    drawerHeader: {
        justifyContent: 'space-between',
        color: theme.palette.text.primary,
        paddingLeft: '24px',
        '& svg': {
            fontSize: '1.5em'
        }
    },
    drawerHeaderTitle: {
        fontFamily: 'Product Sans, Roboto,Helvetica, Arial, sans-serif'
    },
    active: {
        color: theme.palette.primary.main
    },
    primaryNav: {
        color: theme.palette.type === 'light' ?
            theme.palette.grey[800] :
            theme.palette.grey[300],
        '& svg': {
            color: 'inherit',
            marginRight: '2px',
            marginLeft: '4px',
            opacity: '0.8'
        },
        '& h3': {
            fontWeight: '500',
            color: 'inherit',
            fontSize: '0.97rem'
        }
    },
    secondaryNav: {
        '& svg': {
            opacity: '0.6',
            marginRight: '2px',
            marginLeft: '4px'
        },
        '& h3': {
            opacity: '0.6',
            fontSize: '0.96rem'
        }
    },
    footerNav: {
        padding: '1.5em',
        position: 'absolute',
        bottom: 0,
        color: theme.palette.text.hint,
        maxWidth: '82%',
        '& *': {
            marginRight: '0.5em'
        },
        '& a': {
            textDecoration: 'none',
            color: 'inherit'
        },
    }
})

const DrawerContent = ({
    isDrawer, path, width, username, classes, switchDrawer
}) => {

    const drawerHeader = (
        <Toolbar className={classes.drawerHeader}>
            <Typography
                variant="headline"
                component={Link}
                to="/"
                onClick={() => switchDrawer(!isDrawer)}
                className={classes.drawerHeaderTitle}
            >
                Publica
                </Typography>
            <IconButton
                aria-label="Menu"
                onClick={() => switchDrawer(!isDrawer)}
            >
                <ChevronLeftIcon />
            </IconButton>
        </Toolbar>
    )

    const primaryNavList = (
        <List component="nav" className={classes.primaryNav}>
            <ListItem
                component={Link}
                to='/'
                button
                onClick={() => isWidthDown('sm', width) && switchDrawer(!isDrawer)}
                className={path[1] === '/' ? classes.active : ''}
            >
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Feed' />
            </ListItem>
            <ListItem
                component={Link}
                to='/trending/posts'
                button
                onClick={() => isWidthDown('sm', width) && switchDrawer(!isDrawer)}
                className={path[1] === 'trending' ? classes.active : ''}
            >
                <ListItemIcon>
                    <ExploreIcon />
                </ListItemIcon>
                <ListItemText primary='Trending' />
            </ListItem>
            <ListItem
                component={Link}
                to='/communities'
                button
                onClick={() => isWidthDown('sm', width) && switchDrawer(!isDrawer)}
                className={path[1] === 'communities' ? classes.active : ''}
            >
                <ListItemIcon>
                    <ViewColumnIcon />
                </ListItemIcon>
                <ListItemText primary='Communities' />
            </ListItem>
            <ListItem
                component={Link}
                to={`/${username}`}
                button
                onClick={() => isWidthDown('sm', width) && switchDrawer(!isDrawer)}
                className={path[1] === username ? classes.active : ''}
            >
                <ListItemIcon>
                    <AccountIcon />
                </ListItemIcon>
                <ListItemText primary='Profile' />
            </ListItem>
            <ListItem
                component={Link}
                to='/people/followers'
                button
                onClick={() => isWidthDown('sm', width) && switchDrawer(!isDrawer)}
                className={path[1].match(/^\/people/) ? classes.active : ''}
            >
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary='People' />
            </ListItem>
            <ListItem
                component={Link}
                to='/activity'
                button
                onClick={() => isWidthDown('sm', width) && switchDrawer(!isDrawer)}
                className={path[1].match(/^activity/) ? classes.active : ''}
            >
                <ListItemIcon>
                    <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary='Activity' />
            </ListItem>
            <ListItem
                component={Link}
                to='/settings'
                button
                onClick={() => isWidthDown('sm', width) && switchDrawer(!isDrawer)}
                className={path[1] === 'settings' ? classes.active : ''}
            >
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary='Settings' />
            </ListItem>
        </List>
    )

    const secondaryNavList = (
        <List component="nav" className={classes.secondaryNav}>
            <ListItem
                button
                component='a'
                href='https://github.com/blacknred/restpublica/issues/new'
                target="_blank"
                rel="noopener noreferrer"
            >
                <ListItemIcon>
                    <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="Send feedback" />
            </ListItem>
            <ListItem
                button
                component='a'
                href='https://github.com/blacknred/restpublica'
                target="_blank"
                rel="noopener noreferrer"
            >
                <ListItemIcon>
                    <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Help" />
            </ListItem>
        </List>
    )

    const footerNav = (
        <Typography
            className={classes.footerNav}
            variant='caption'
            color='inherit'
        >
            <span>© {(new Date()).getFullYear()} Restpublica, LLC</span><br />
            <a
                href="https://github.com/blacknred/restpublica"
                target="_blank"
                rel="noopener noreferrer"
            >
                Conditions of use
            </a>
            <a
                href="/api"
                target="_blank"
                rel="noopener noreferrer"
            >
                API Developers
            </a>
            <a
                href="https://github.com/blacknred/restpublica/issues/new"
                target="_blank"
                rel="noopener noreferrer"
            >
                Send feedback
            </a>
        </Typography>
    )

    const drawer = (
        <div>
            {primaryNavList}
            <Divider light />
            {secondaryNavList}
            {footerNav}
        </div>
    )

    return (
        <div>
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    anchor='left'
                    open={!isDrawer}
                    onClose={() => switchDrawer(!isDrawer)}
                    classes={{ paper: classes.drawerPaperMobile }}
                    ModalProps={{ keepMounted: true }}
                >
                    {drawerHeader}
                    <Divider light />
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    variant="permanent"
                    anchor='left'
                    open={isDrawer}
                    classes={{ paper: classes.drawerPaper }}
                    onClose={() => switchDrawer(!isDrawer)}
                >
                    <Slide
                        direction="right"
                        in={isDrawer}
                        timeout={400}
                        className={
                            path[2] &&
                            path[1].match(/(trending|search|people|community)/) ?
                                classes.drawerRoot2 :
                                classes.drawerRoot
                        }
                    >
                        {drawer}
                    </Slide>
                </Drawer>
            </Hidden>
        </div>
    )
}

DrawerContent.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    path: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    switchDrawer: PropTypes.func.isRequired,
}

export default compose(withStyles(styles), withWidth())(DrawerContent);
