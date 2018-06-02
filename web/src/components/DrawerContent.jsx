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
import withWidth from '@material-ui/core/withWidth';
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

const styles = theme => ({
    drawerPaper: {
        borderWidth: 0,
        backgroundColor: theme.palette.background.default,
        '@media (max-width: 800px)': {
            width: '250px',
            borderWidth: 1,
        },
        '@media (max-width: 600px)': {
            width: '300px',
            borderWidth: 0,
        },
        '& a': {
            textDecoration: 'none',
            color: 'inherit'
        }
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
    navMargin: {
        height: '70px'
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
        }
    }
})

const DrawerContent = ({
    isDrawer, path, navigate, width, username, classes, switchDrawer
}) => {
    const drawerHeader = (
        <Toolbar className={classes.drawerHeader}>
            <Typography
                variant="headline"
                component={Link}
                to="/"
                onClick={() => switchDrawer(isDrawer)}
                className={classes.drawerHeaderTitle}
            >
                Publica
                </Typography>
            <IconButton
                aria-label="Menu"
                onClick={() => switchDrawer(isDrawer)}
            >
                <ChevronLeftIcon />
            </IconButton>
        </Toolbar>
    )

    const primaryNavList = (
        <List component="nav" className={classes.primaryNav}>
            <ListItem
                button
                onClick={() => {
                    navigate('/')
                    width === 'xs' && switchDrawer(isDrawer)
                }}
                className={path === '/' ? classes.active : ''}
            >
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Feed' />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    navigate('/trending')
                    width === 'xs' && switchDrawer(isDrawer)
                }}
                className={path.match(/^\/trending/) ? classes.active : ''}
            >
                <ListItemIcon>
                    <ExploreIcon />
                </ListItemIcon>
                <ListItemText primary='Trending' />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    navigate('/communities')
                    width === 'xs' && switchDrawer(isDrawer)
                }}
                className={path.match(/^\/communities/) ? classes.active : ''}
            >
                <ListItemIcon>
                    <ViewColumnIcon />
                </ListItemIcon>
                <ListItemText primary='Communities' />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    navigate(`/${username}`)
                    width === 'xs' && switchDrawer(isDrawer)
                }}
                className={path.match(new RegExp(`^/${username}`)) ? classes.active : ''}
            >
                <ListItemIcon>
                    <AccountIcon />
                </ListItemIcon>
                <ListItemText primary='Profile' />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    navigate(`/people`)
                    width === 'xs' && switchDrawer(isDrawer)
                }}
                className={path.match(/^\/people/) ? classes.active : ''}
            >
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary='People' />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    navigate('/activity')
                    width === 'xs' && switchDrawer(isDrawer)
                }}
                className={path.match(/^\/activity/) ? classes.active : ''}
            >
                <ListItemIcon>
                    <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary='Activity' />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    navigate('/settings')
                    width === 'xs' && switchDrawer(isDrawer)
                }}
                className={path.match(/^\/settings/) ? classes.active : ''}
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

    return (
        <Drawer
            variant={width === 'xs' ? 'temporary' : 'persistent'}
            anchor='left'
            open={width === 'xs' ? !isDrawer : isDrawer}
            classes={{ paper: classes.drawerPaper }}
            onClose={() => switchDrawer(!isDrawer)}
        >
            <Slide
                direction="right"
                in={isDrawer}
            >
                <div style={{ height: '100vh' }}>
                    <div className={classes.navMargin}>
                        <Hidden only={['sm', 'md', 'lg', 'xl']}>
                            {drawerHeader}
                            <Divider light />
                        </Hidden>
                    </div>
                    {primaryNavList}
                    <Divider light />
                    {secondaryNavList}
                    {footerNav}
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
    width: PropTypes.string.isRequired,
    switchDrawer: PropTypes.func.isRequired,
}

export default compose(withStyles(styles), withWidth())(DrawerContent);
