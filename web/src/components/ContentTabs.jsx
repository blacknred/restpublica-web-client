import React from 'react';
import PropTypes from 'prop-types';

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

const ContentTabs = ({ path, classes, redirect }) => {

    const basePath = path.slice(0, -1).join('/')

    return (
        <Tabs
            value={path.join('/')}
            className={classes.tabs}
            onChange={redirect}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            {
                (path[1] === 'search') &&
                [
                    <Tab
                        label="All"
                        key={basePath + '/'}
                        value={basePath + '/'}
                        classes={{ label: classes.tab }}
                    />,
                    <Tab
                        label="posts"
                        key={basePath + '/posts'}
                        value={basePath + '/posts'}
                        classes={{ label: classes.tab }}
                    />,
                    <Tab
                        label="communities"
                        key={basePath + `/communities`}
                        value={basePath + `/communities`}
                        classes={{ label: classes.tab }}
                    />,
                    <Tab
                        label="authors"
                        key={basePath + `/authors`}
                        value={basePath + `/authors`}
                        classes={{ label: classes.tab }}
                    />
                ]
            }
            {
                (path[1] === 'people') &&
                [
                    <Tab
                        label="followers"
                        key={basePath + `/followers`}
                        value={basePath + `/followers`}
                        classes={{ label: classes.tab }}
                    />,
                    <Tab
                        label="followin"
                        key={basePath + `/followin`}
                        value={basePath + `/followin`}
                        classes={{ label: classes.tab }}
                    />,
                    <Tab
                        label="recommended"
                        key={basePath + `/recommended`}
                        value={basePath + `/recommended`}
                        classes={{ label: classes.tab }}
                    />
                ]
            }
            {
                (path[1] === 'communities' && path[3]) &&
                [
                    <Tab
                        label="moderators"
                        key={basePath + `/moderators`}
                        value={basePath + `/moderators`}
                        classes={{ label: classes.tab }}
                    />,
                    <Tab
                        label="participants"
                        key={basePath + `/participants`}
                        value={basePath + `/participants`}
                        classes={{ label: classes.tab }}
                    />
                ]
            }
        </Tabs>
    )
}

ContentTabs.propTypes = {
    path: PropTypes.array.isRequired,
    redirect: PropTypes.func.isRequired
}

export default withStyles(styles)(ContentTabs)