import React from 'react';
import PropTypes from 'prop-types';
import ScrollToTop from 'react-scroll-up';

import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const styles = theme => ({
    toTopButton: {
        backgroundColor: theme.palette.secondary.light
    }
})

const ToTopButton = ({ classes }) => {
    return (
        <Hidden smDown>
            <ScrollToTop
                showUnder={460}
                style={{
                    top: '120px',
                    right: '35px',
                    bottom: 'none',
                    zIndex: 1,
                }}
            >
                <Button
                    className={classes.toTopButton}
                    variant="fab"
                >
                    <ArrowUpwardIcon />
                </Button>
            </ScrollToTop>
        </Hidden>
    )
}

ToTopButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToTopButton)