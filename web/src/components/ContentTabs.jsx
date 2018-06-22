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

    const basePath = path.join('/').substring(0, path.lastIndexOf('/') + 1)
    console.log(basePath)

    return (
        <Tabs
            value={path.join('/').toString()}
            className={classes.tabs}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            {
                (path[1] === 'trending' ||
                    path[1] === 'search') &&
                <div>
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
                </div>
            }

            {
                path[1] === 'people' &&
                <div>
                    <Tab
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
                    />
                </div>
            }

            {
                path[1] === 'community' &&
                <div>
                    <Tab
                        component={Link}
                        to={basePath + `moderators`}
                        label="moderators"
                        value={basePath + `moderators`}
                        classes={{ label: classes.tab }}
                    />
                    <Tab
                        component={Link}
                        to={basePath + `participants`}
                        label="participants"
                        value={basePath + `participants`}
                        classes={{ label: classes.tab }}
                    />
                </div>
            }
        </Tabs>
    )
}

ContentTabs.propTypes = {
    path: PropTypes.array.isRequired
}

export default withStyles(styles)(ContentTabs)