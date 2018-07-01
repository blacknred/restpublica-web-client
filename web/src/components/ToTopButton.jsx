import React from 'react';
import PropTypes from 'prop-types';
import ScrollToTop from 'react-scroll-up';

import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const styles = {
    toTop: {
        top: '150px',
        right: '35px',
        bottom: 'none',
        zIndex: 1
    },
    toTopButton: {
        backgroundColor: 'rgba(225,225,225,0.8)'
    }
}

const ToTopButton = ({ classes }) => {
    return (
        <Hidden smDown>
            <ScrollToTop
                showUnder={460}
                // topPosition={170}
                style={styles.toTop}
            >
                <IconButton
                    className={classes.toTopButton}
                    color="primary"
                >
                    <ArrowUpwardIcon color="primary" />
                </IconButton>
            </ScrollToTop>
        </Hidden>
    )
}

ToTopButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToTopButton)