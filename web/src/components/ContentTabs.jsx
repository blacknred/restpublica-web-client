import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    tabs: {
        backgroundColor: theme.palette.background.paper,
        '& a': {
            textDecoration: 'none',
        }
    },
    tab: {
        fontSize: '0.9rem!important'
    }
})

const ContentTabs = ({ path, classes }) => {

    const basePath = path.substring(0, path.lastIndexOf('/') + 1)

    return (
        <Tabs
            value={path}
            className={classes.tabs}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab
                component={Link}
                to={basePath + `posts`}
                label="posts"
                value={basePath + `posts`}
                classes={{ label: classes.tab }}
            />
            <Tab
                component={Link}
                to={basePath + `communities`}
                label="communities"
                value={basePath + `communities`}
                classes={{ label: classes.tab }}
            />
            <Tab
                component={Link}
                to={basePath + `authors`}
                label="authors"
                value={basePath + `authors`}
                classes={{ label: classes.tab }}
            />
            {/* <Tab
                component={Link}
                to={basePath + `tags`}
                label="tags"
                value={basePath + `tags`}
                classes={{ label: classes.tab }}
            /> */}



            {/* <Tab
                component={Link}
                to={basePath + `followers`}
                label="followers"
                value={basePath + `followers`}
                classes={{ label: classes.tab }}
            />
            <Tab
                component={Link}
                to={basePath + `followin`}
                label="followin"
                value={basePath + `followin`}
                classes={{ label: classes.tab }}
            />
            <Tab
                component={Link}
                to={basePath + `recommendations`}
                label="recommendations"
                value={basePath + `recommendations`}
                classes={{ label: classes.tab }}
            /> */}
        </Tabs>
    )
}

ContentTabs.propTypes = {
    path: PropTypes.string.isRequired
}

export default withStyles(styles)(ContentTabs)