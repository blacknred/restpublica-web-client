import React from 'react';
import PropTypes from 'prop-types'
import ScrollToTop from 'react-scroll-up';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';

const styles = {
    panel: {
        position: 'fixed',
        marginLeft: '3em',
        display: 'flex',
        flexDirection: 'column',
    },
    top: {
        position: 'static'
    }
}

const ListRightPanel = ({ classes }) => {
    return (
        <span className={classes.panel} >
            <ScrollToTop
                showUnder={460}
                className={classes.top}>
                <IconButton>
                    <ArrowUpwardIcon />
                </IconButton>
            </ScrollToTop>
        </span>
    )
}

ListRightPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListRightPanel)