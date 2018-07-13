import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
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
        '& ul:nth-of-type(2)': {
            opacity: '0.6'
        }
    },
    drawerPaperMobile: {
        width: '300px',
        '& a': {
            textDecoration: 'none',
        },
        height: '100vh',
        '& ul:nth-of-type(2)': {
            opacity: '0.6'
        }
    },
    drawerRoot: {
        height: '100vh',
        marginTop: theme.spacing.unit * 9,
    },
    drawerRoot2: {
        height: '100vh',
        marginTop: theme.spacing.unit * 15,
    },
    drawerHeader: {
        justifyContent: 'space-between',
        color: theme.palette.text.primary,
        paddingLeft: theme.spacing.unit * 4,
        '& svg': {
            fontSize: '1.5em'
        }
    },
    drawerHeaderTitle: {
        fontFamily: 'Product Sans, Roboto, Helvetica, Arial, sans-serif'
    },
    active: {
        color: `${theme.palette.primary.main}!important`,
    },
    nav: {
        color: theme.palette.type === 'light' ?
            theme.palette.grey[800] :
            theme.palette.grey[300],
        '& svg': {
            marginRight: '2px',
            marginLeft: '4px',
            color: 'inherit',
            opacity: '0.7'
        },
        '& div': {
            fontSize: '0.95rem',
            fontWeight: 500,
            lineHeight: '1.6em',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        }
    },
    footerNav: {
        position: 'absolute',
        bottom: '2em',
        right: 0,
        left: '2em',
        width: '70%',
        color: theme.palette.text.hint,
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
    isDrawer, isAuthenticated, path, width, username, classes, switchDrawer
}) => {

    const drawerHeader = (
        <Toolbar className={classes.drawerHeader}>
            <Typography
                variant="headline"
                color="textSecondary"
                component={Link}
                to="/"
                onClick={() => switchDrawer(!isDrawer)}
                className={classes.drawerHeaderTitle}
            >
                {process.env.REACT_APP_TITLE}
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
        <List className={classes.nav}>
            {
                isAuthenticated &&
                <ListItem
                    component={Link}
                    to='/'
                    button
                    onClick={() => isWidthDown('sm', width) && switchDrawer(!isDrawer)}
                    className={path[1] === '' ? classes.active : ''}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary='Feed'
                        disableTypography
                    />
                </ListItem>
            }
            <ListItem
                component={Link}
                to='/explore'
                button
                onClick={() => isWidthDown('sm', width) && switchDrawer(!isDrawer)}
                className={path[1] === 'explore' ? classes.active : ''}
            >
                <ListItemIcon>
                    <ExploreIcon />
                </ListItemIcon>
                <ListItemText
                    primary='Explore'
                    disableTypography
                />
            </ListItem>
            {
                !isAuthenticated &&
                <ListItem
                    component={Link}
                    to='/register'
                    button
                >
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary='Join Publica'
                        disableTypography
                    />
                </ListItem>
            }
            {
                isAuthenticated &&
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
                    <ListItemText
                        primary='Communities'
                        disableTypography
                    />
                </ListItem>
            }
            {
                isAuthenticated &&
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
                    <ListItemText
                        primary='Profile'
                        disableTypography
                    />
                </ListItem>
            }
            {
                isAuthenticated &&
                <ListItem
                    component={Link}
                    to='/people/followers'
                    button
                    onClick={() => isWidthDown('sm', width) && switchDrawer(!isDrawer)}
                    className={path[1] === 'people' ? classes.active : ''}
                >
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary='People'
                        disableTypography
                    />
                </ListItem>
            }
            {
                isAuthenticated &&
                <ListItem
                    component={Link}
                    to='/activity'
                    button
                    onClick={() => isWidthDown('sm', width) && switchDrawer(!isDrawer)}
                    className={path[1] === 'activity' ? classes.active : ''}
                >
                    <ListItemIcon>
                        <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary='Activity'
                        disableTypography
                    />
                </ListItem>
            }
            {
                isAuthenticated &&
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
                    <ListItemText
                        primary='Settings'
                        disableTypography
                    />
                </ListItem>
            }
        </List>
    )

    const secondaryNavList = (
        <List className={classes.nav}>
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
                <ListItemText
                    primary="Send feedback"
                    disableTypography
                />
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
                <ListItemText
                    primary="Help"
                    disableTypography
                />
            </ListItem>
        </List>
    )

    const footerNav = (
        <Typography
            className={classes.footerNav}
            variant='caption'
            color='inherit'
        >
            <span>© {(new Date()).getFullYear()} {process.env.REACT_APP_TITLE}, LLC</span><br />
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
        <Fragment>
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
                            path.join('/')
                                .match(/(trending\/+|search|people|\/communities\/.+\/.+)/) ?
                                classes.drawerRoot2 :
                                classes.drawerRoot
                        }
                    >
                        {drawer}
                    </Slide>
                </Drawer>
            </Hidden>
        </Fragment>
    )
}

DrawerContent.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    path: PropTypes.array.isRequired,
    username: PropTypes.string,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    switchDrawer: PropTypes.func.isRequired,
}

export default compose(withStyles(styles), withWidth())(DrawerContent);
