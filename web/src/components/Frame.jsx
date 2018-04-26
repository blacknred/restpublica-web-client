import React from 'react';
import PropTypes from 'prop-types'

import {
    MuiThemeProvider,
    createMuiTheme
} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import grey from 'material-ui/colors/grey'
import { withStyles } from 'material-ui/styles';
import lightBlue from 'material-ui/colors/lightBlue'

const styles = {
    frame: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        minHeight: '100vh',
        transition: 'padding 300ms',
    },
    light: {
        backgroundColor: grey[200]
    },
    dark: {
        backgroundColor: grey[900]
    },
    left: {
        paddingLeft: '220px',
        '@media (max-width: 600px)': {
            paddingLeft: '0px',
        }
    },
    top: {
        paddingTop: '5em',
        minHeight: 'calc(100vh - 5em)'
    }
}

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: lightBlue[900],
        }
    },
})

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: lightBlue[900],
        },
    },
})

const MuiFrame = ({ isNightMode, isAuthenticated, isDrawer, classes, children }) => {
    return (
        <MuiThemeProvider theme={isNightMode ? darkTheme : lightTheme}>
            <Paper
                classes={{
                    root: classes.frame,
                    elevation2: isAuthenticated ? classes.top : null
                }}
                className={isDrawer ? classes.left : null}
                style={isNightMode ? styles.dark : styles.light}
            >
                {children}
            </Paper>
        </MuiThemeProvider>
    )
}

MuiFrame.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isDrawer: PropTypes.bool.isRequired,
    isNightMode: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MuiFrame)
