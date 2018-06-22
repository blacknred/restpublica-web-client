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
    },
    icon: {
        width: '3em',
        height: '3em',
        margin: '1em 0',
    }
}

const EmptyContentMessage = ({ mode, isProfilePage, classes }) => {
    console.log(mode, isProfilePage)
    return (
        <div className={classes.container}>
            {
                (mode === '' ||
                mode === 'trending' ||
                mode === 'search' ||
                isProfilePage) &&
                <ReportIcon
                    className={classes.icon}
                    color='primary'
                />
            }
            <Typography
                variant="button"
                paragraph
            >
                {
                    mode === '' &&
                    <span>
                        Seems like you have not any subscription yet.<br /><br/>
                        <Button
                            color='primary'
                            component={Link}
                            to="/trending">
                            Start now with Trending
                        </Button>
                    </span>
                }
                {
                    mode === 'trending' &&
                    <span>
                        Seems like there is no any content at all.<br />
                        If you are a developer start with db populating :)
                    </span>
                }
                {
                    mode === 'search' &&
                    <span>
                        There is nothing found by your request.
                    </span>
                }
                {
                    isProfilePage &&
                    <span>
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
                    </span>
                }
                {
                    mode !== '' &&
                    mode !== 'trending' &&
                    mode !== 'search' &&
                    !isProfilePage &&
                    <span>There is no any posts yet.</span>
                }
            </Typography>
        </div>
    )
}

EmptyContentMessage.propTypes = {
    mode: PropTypes.string.isRequired,
    isProfilePage: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EmptyContentMessage)
