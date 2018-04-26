import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import ScrollToTop from 'react-scroll-up';

import Button from 'material-ui/Button';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ContentAddIcon from '@material-ui/icons/Add'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const styles = {
    panel: {
        zIndex: 1
    },
    toTop: {
        position: 'fixed',
        top: '90px',
        right: '30px',
        bottom: 'none'
    },
    toTopButton: {
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    action: {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
    }
}

const ContextPanel = ({ path, classes }) => {
    return (
        <div className={classes.panel}>
            <ScrollToTop
                showUnder={460}
                style={styles.toTop}
            >
                <IconButton className={classes.toTopButton}>
                    <ArrowUpwardIcon />
                </IconButton>
            </ScrollToTop>
            {
                path === '/' &&
                <Button
                    variant="fab"
                    color="primary"
                    className={classes.action}
                    component={Link}
                    to={{
                        pathname: '/post',
                        state: { modal: true }
                    }}
                >
                    <EditIcon />
                </Button>
            }
            {
                path === '/communities' &&
                <Button
                    variant="fab"
                    color="primary"
                    className={classes.action}
                    component={Link}
                    to={{
                        pathname: '/community',
                        state: { modal: true }
                    }}
                >
                    <ContentAddIcon />
                </Button>
            }
        </div>
    )
}

ContextPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired
};

export default withStyles(styles)(ContextPanel)