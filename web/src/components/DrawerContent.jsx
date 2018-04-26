import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import List, {
    ListItem,
    ListItemIcon,
    ListItemText
} from 'material-ui/List';
import compose from 'recompose/compose';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import Toolbar from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import PersonIcon from '@material-ui/icons/Person';
import withWidth from 'material-ui/utils/withWidth';
import ExploreIcon from '@material-ui/icons/Explore';
import SettingsIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

const styles = theme => ({
    drawer: {
        fontSize: '0.95rem',
        borderWidth: 0,
        fontWeight: '700',
        backgroundColor: 'transparent',
        '@media (max-width: 600px)': {
            backgroundColor: theme.palette.background.default,
            width: '300px'
        },
    },
    container: {
        height: '100%',
    },
    drawerHeader: {
        justifyContent: 'space-between',
        paddingLeft: '24px',
        //background: '#01579b',
        //color: '#fff',
    },
    drawerHeaderTitle: {
        fontFamily: 'Product Sans, Roboto,Helvetica, Arial, sans-serif'
    },
    icon: {
        color: 'inherit',
        marginRight: '2px',
        marginLeft: '4px'
    },
    notActive: {
        color: theme.palette.text.primary,
        opacity: '0.7'
    },
    active: {
        color: theme.palette.primary.main,
    },
    secondaryNav: {
        color: theme.palette.text.hint
    },
    footerNav: {
        padding: '1.5em',
        position: 'absolute',
        bottom: 0,
        color: theme.palette.text.hint
    }
})

const DrawerContent = ({ path, navigate, isDrawer, username, classes, width, switchDrawer }) => {

    const drawerHeader = (
        <Hidden only={['sm', 'md', 'lg']}>
            <Toolbar className={classes.drawerHeader}>
                <Typography
                    variant="headline"
                    component={Link}
                    to="/"
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
            <Divider light={true} />
        </Hidden>
    )

    const primaryNavList = (
        <List component="nav">
            <ListItem
                button
                onClick={() => {
                    navigate('/')
                    width === 'xs' && switchDrawer(!isDrawer)
                }}
                classes={{ root: path === '/' ? classes.active : classes.notActive }}
            >
                <ListItemIcon className={classes.icon}>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText
                    primary='Feed'
                    disableTypography={true}
                />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    navigate('/trending')
                    width === 'xs' && switchDrawer(!isDrawer)
                }}
                classes={{ root: path.match(/^\/trending/) ? classes.active : classes.notActive }}
            >
                <ListItemIcon className={classes.icon}>
                    <ExploreIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Trending"
                    disableTypography={true}
                />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    navigate('/communities')
                    width === 'xs' && switchDrawer(!isDrawer)
                }}
                classes={{ root: path.match(/^\/communities/) ? classes.active : classes.notActive }}
            >
                <ListItemIcon className={classes.icon}>
                    <ViewColumnIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Communities"
                    disableTypography={true}
                />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    navigate(`/${username}`)
                    width === 'xs' && switchDrawer(!isDrawer)
                }}
                classes={{ root: path.match(new RegExp(`^/${username}`)) ? classes.active : classes.notActive }}
            >
                <ListItemIcon className={classes.icon}>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Profile"
                    disableTypography={true}
                />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    navigate('/activity')
                    width === 'xs' && switchDrawer(!isDrawer)
                }}
                classes={{ root: path.match(/^\/activity/) ? classes.active : classes.notActive }}
            >
                <ListItemIcon className={classes.icon}>
                    <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Activity"
                    disableTypography={true}
                />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    navigate('/settings')
                    width === 'xs' && switchDrawer(!isDrawer)
                }}
                classes={{ root: path.match(/^\/settings/) ? classes.active : classes.notActive }}
            >
                <ListItemIcon className={classes.icon}>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Settings"
                    disableTypography={true}
                />
            </ListItem>
        </List>
    )

    const secondaryNavList = (
        <List component="nav" className={classes.secondaryNav}>
            <ListItem
                button
                component='a'
                href='https://github.com/blacknred/restpublica'
                target="_blank"
                rel="noopener noreferrer"
            >
                <ListItemIcon className={classes.icon}>
                    <HelpIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Help"
                    disableTypography={true}
                />
            </ListItem>
            <ListItem
                button
                component='a'
                href='https://github.com/blacknred/restpublica/issues/new'
                target="_blank"
                rel="noopener noreferrer"
            >
                <ListItemIcon className={classes.icon}>
                    <FeedbackIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Send feedback"
                    disableTypography={true}
                />
            </ListItem>
        </List>
    )

    const footerNav = (
        <div className={classes.footerNav}>
            <Typography
                variant='caption'
                color='inherit'
            >
                © {(new Date()).getFullYear()} Restpublica, LLC
            </Typography>
            <Typography
                component='a'
                variant='caption'
                color='inherit'
                href="https://github.com/blacknred/restpublica"
                target="_blank"
                rel="noopener noreferrer"
            >
                Conditions of use
            </Typography>
            <Typography
                component='a'
                variant='caption'
                color='inherit'
                href="/api"
                target="_blank"
                rel="noopener noreferrer"
            >
                API Developers
            </Typography>
            <Typography
                component='a'
                variant='caption'
                color='inherit'
                href="https://github.com/blacknred/restpublica/issues/new"
                target="_blank"
                rel="noopener noreferrer"
            >
                Send feedback
            </Typography>
        </div>
    )

    return (
        <Drawer
            variant={width === 'xs' ? 'temporary' : "persistent"}
            anchor={'left'}
            open={isDrawer}
            classes={{ paper: classes.drawer }}
            onClose={() => switchDrawer(!isDrawer)}
        >
            <Slide
                direction="right"
                in={isDrawer}
                timeout={400}
            >
                <div className={classes.container}>
                    {drawerHeader}
                    <Hidden only='xs'>
                        <br />
                        <br />
                        <br />
                        <br />
                    </Hidden>
                    {primaryNavList}
                    <Divider light={true} />
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
