import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthorPreview from './AuthorPreview';
import CommunityPreview from './CommunityPreview';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    header: {
        textTransform: 'capitalize',
        marginLeft: theme.spacing.unit * 6
    },
    grid: {
        maxWidth: '100%',
        minWidth: '100%',
        //flex: 1,
        //margin: '0 auto',
        marginBottom: theme.spacing.unit * 3,
    },
    scrollButton: {
        // '&:before, &:after': {
        //     content: "''",
        //     height: '20em',
        //     boxShadow: `-9px 0px 20px 9px ${theme.palette.background.default}, 
        //     0px 8px 10px 1px ${theme.palette.background.default}, 
        //     0px 3px 14px 2px ${theme.palette.background.default}`
        // },
        boxShadow: `-1px 1px 20px 3px ${theme.palette.background.default}, 
            0px 8px 10px 1px ${theme.palette.background.default}, 
            0px 3px 14px 2px ${theme.palette.background.default}`,
        '& svg': {
            borderRadius: '50%',
            background: '#fff',
            padding: theme.spacing.unit,
            width: 38,
            height: 38,
            boxShadow: theme.shadows[3]
        }
    },
    scrollTabs: {
        position: 'static'
    }
})

const AuthorsList = ({
    mode, isAuthenticated, datas, hasMore, path, classes,
    createSubscription, removeSubscription,
}) => {

    // <Typography
    //     variant='body2'
    //     color='textSecondary'
    //     className={classes.header}
    // >
    //     {mode}
    // </Typography>
    return (
        datas.length > 0 &&
        <Fade in={true}>
            <Tabs
                value={false}
                scrollable
                scrollButtons="auto"
                textColor='primary'
                indicatorColor='primary'
                className={classes.grid}
                classes={{ 
                    scrollButtons: classes.scrollButton,
                    scroller: classes.scrollTabs
                }}
            >
                {
                    datas.map((content, i) =>
                        mode === 'authors' ?
                            <Tab
                                key={i}
                                component={AuthorPreview}
                                author={content}
                                isAuthenticated={isAuthenticated}
                                removeSubscription={removeSubscription}
                                createSubscription={createSubscription}
                            /> :
                            <Tab
                                key={i}
                                component={CommunityPreview}
                                community={content}
                                isAuthenticated={isAuthenticated}
                                removeSubscription={removeSubscription}
                                createSubscription={createSubscription}
                            />
                    )
                }
                {
                    hasMore &&
                    <Tab
                        key={13}
                        component={Link}
                        to={`${path.slice(0, -1).join('/')}/${mode}`}
                        value={true}
                        label='See more'
                    />
                }
            </Tabs>
        </Fade>
    )
}

AuthorsList.propTypes = {
    mode: PropTypes.oneOf(['authors', 'communities']).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    path: PropTypes.array.isRequired,
    datas: PropTypes.arrayOf(PropTypes.object).isRequired,
    createSubscription: PropTypes.func.isRequired,
    removeSubscription: PropTypes.func.isRequired,
}

export default withStyles(styles)(AuthorsList)