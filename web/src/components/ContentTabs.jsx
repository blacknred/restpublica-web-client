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

const getBasePath = (pathArr) => {

    let base
    // if (path[1] === 'search') 
    // const y = path.join('/')
    
     //if (path.slice(-1)[0] !== '') path.push('')


    base = pathArr.slice(0, -1).join('/')
    //console.log(pathArr.join('/'), base, pathArr)
    return base
}

const ContentTabs = ({ path, classes, redirect }) => {

    const basePath = getBasePath(path)

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
            

            {/* {
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
            } */}
        </Tabs>
    )
}

ContentTabs.propTypes = {
    path: PropTypes.array.isRequired,
    redirect: PropTypes.func.isRequired
}

export default withStyles(styles)(ContentTabs)