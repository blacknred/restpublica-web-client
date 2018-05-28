import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ReportIcon from '@material-ui/icons/Report';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    container: {
        textAlign: 'center',
        textDecoration: 'none'
    },
    icon: {
        width: '3em',
        height: '3em',
        margin: '1em 0',
    }
}

const EmptyPostsMessage = ({ mode, isProfileMode, classes }) => {
    return (
        <Typography
            variant="subheading"
            className={classes.container}
        >
            <ReportIcon
                className={classes.icon}
                color='primary'
            />
            <br />
            {
                mode === 'feed' &&
                <span>
                    Seems like you have not any subscription yet.<br />
                    Start now with
                    <Button
                        color='primary'
                        component={Link}
                        to="/trending">
                        Trending
                    </Button>
                </span>
            }
            {
                mode === 'trending' &&
                <span>
                    Seems like there is no any post at all.<br />
                    If you are a developer start with posts db populating :)
                </span>
            }
            {
                mode === 'search' &&
                <span>
                    There is nothing found by your request.
                </span>
            }
            {
                isProfileMode &&
                <span>
                    Seems like you have no posts yet.<br />
                    Start now with
                    <Button
                        color='primary'
                        component={Link}
                        to={{
                            pathname: '/post',
                            state: { modal: true }
                        }}>
                        Create a post
                    </Button>
                </span>
            }
            {
                mode !== 'feed' &&
                mode !== 'trending' &&
                mode !== 'search' &&
                mode !== 'search' &&
                !isProfileMode &&
                <span>There is no any posts yet.</span>
            }
        </Typography>
    )
}

EmptyPostsMessage.propTypes = {
    mode: PropTypes.string.isRequired,
    isProfileMode: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EmptyPostsMessage)
