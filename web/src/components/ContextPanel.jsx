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
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        justifyContent: 'space-between',
        top: '90px',
        bottom: '40px',
        alignItems: 'left',
        right: '2em',
        zIndex: 1
    },
    toTop: {
        position: 'static',
    }
}

const ContextPanel = ({ path, classes }) => {

    const actionButton = (
        <span>
            {
                path === '/' &&
                <Button
                    variant="fab"
                    color="primary"
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
                    component={Link}
                    to={{
                        pathname: '/community',
                        state: { modal: true }
                    }}
                >
                    <ContentAddIcon />
                </Button>
            }
        </span>
    )

    return (
        <div className={classes.panel}>
            <ScrollToTop
                showUnder={460}
                style={styles.toTop}
            >
                <IconButton>
                    <ArrowUpwardIcon />
                </IconButton>
            </ScrollToTop>
            {actionButton}
        </div>
    )
}

ContextPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired
};

export default withStyles(styles)(ContextPanel)