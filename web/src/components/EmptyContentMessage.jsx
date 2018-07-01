import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ReportIcon from '@material-ui/icons/Report';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    container: {
        textAlign: 'center',
    },
    icon: {
        width: '3em',
        height: '3em',
        margin: '1em 0',
    }
}

const EmptyContentMessage = ({ mode, isProfilePage, classes }) => {
    return (
        <div className={classes.container}>
            {
                (mode === '' ||
                mode === 'trending' ||
                mode === 'search' ||
                isProfilePage) &&
                <ReportIcon
                    className={classes.icon}
                    color='disabled'
                />
            }
            <Typography
                variant="button"
                paragraph
                color='textSecondary'
            >
                {
                    mode === '' &&
                    <Fragment>
                        Seems like you have not any subscription yet.<br /><br/>
                        <Button
                            color='primary'
                            component={Link}
                            to="/trending">
                            Start now with Trending
                        </Button>
                    </Fragment>
                }
                {
                    mode === 'trending' &&
                    <Fragment>
                        Seems like there is no any content at all.<br />
                        If you are a developer start with db populating :)
                    </Fragment>
                }
                {
                    mode === 'search' &&
                    <Fragment>
                        There is nothing found by your request.
                    </Fragment>
                }
                {
                    isProfilePage &&
                    <Fragment>
                        Seems like you have no posts yet.<br /><br/>
                        <Button
                            color='primary'
                            component={Link}
                            to={{
                                pathname: '/post',
                                state: {
                                    modal: true,
                                    isSlide: true
                                }
                            }}
                        >
                            Create a first post
                        </Button>
                    </Fragment>
                }
                {
                    mode !== '' &&
                    mode !== 'trending' &&
                    mode !== 'search' &&
                    !isProfilePage &&
                    <Fragment>There is no any posts yet.</Fragment>
                }
            </Typography>
        </div>
    )
}

EmptyContentMessage.propTypes = {
    mode: PropTypes.string.isRequired,
    isProfilePage: PropTypes.bool,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EmptyContentMessage)
