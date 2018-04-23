import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ExploreIcon from '@material-ui/icons/Explore';

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    a: {
        textDecoration: 'none',
    },
    title: {
        fontFamily: 'Product Sans, Roboto,Helvetica, Arial, sans-serif'
    },
    form: {
        marginTop: '5%',
        padding: '1.5em 0',
        textAlign: 'center'
    }
}

const LandingContent = ({ gifUrl, classes, children }) => {
    return (
        <div
            className={classes.container}
            style={{ background: `url("${gifUrl}") no-repeat center / cover fixed` }}
        >
            <Paper style={styles.form} >
                <List>
                    <Typography
                        variant="display1"
                        color='inherit'
                        className={classes.title}>
                        Publica
                    </Typography>
                    <br/>
                    {children}
                    <Link to='/trending' className={classes.a}>
                        <Button><ExploreIcon /> &nbsp;Explore</Button>
                    </Link>
                </List>
            </Paper>
        </div>
    )
}

LandingContent.propTypes = {
    gifUrl: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LandingContent)
