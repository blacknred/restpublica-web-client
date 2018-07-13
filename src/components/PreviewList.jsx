import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthorPreview from './AuthorPreview';
import CommunityPreview from './CommunityPreview';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    header: {
        maxWidth: '1300px',
        textTransform: 'capitalize',
        marginLeft: theme.spacing.unit * 6
    },
    grid: {
        maxWidth: '1400px',
        width: '100%',
        //flex: 1,
        //margin: '0 auto',
        marginBottom: theme.spacing.unit * 3,
    },
    scrollButton: {
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

    const subheader = (
        <ListItem className={classes.header} disableGutters>
            <ListItemText
                secondary={mode}
                secondaryTypographyProps={{ variant: 'body2' }}
            />
            {
                datas.length > 4 &&
                <Button
                    color='primary'
                    component={Link}
                    to={`${path.join('/')}/${mode}`}
                >
                    See all
            </Button>
            }
        </ListItem>
    )

    return (
        datas.length > 0 &&
        <Fragment>
            {subheader}
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
                            to={`${path.join('/')}/${mode}`}
                            value={true}
                            label='See more'
                        />
                    }
                </Tabs>
            </Fade>
        </Fragment>
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