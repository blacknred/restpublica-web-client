import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { ListItem } from 'material-ui/List';

const styles = {
    a: {
        textDecoration: 'none',
    },
}

const LoginForm = ({ values, errors, inputChange, submitHandler }) => {
    return (
        <form onSubmit={submitHandler} >
            <ListItem>
                <TextField
                    label="Username"
                    key='username'
                    name='username'
                    defaultValue={values.username}
                    fullWidth={true}
                    error={errors.username !== null}
                    helperText={errors.username}
                    onChange={inputChange}
                />
            </ListItem>
            <ListItem>
                <TextField
                    label="Password"
                    key='password'
                    name='password'
                    type='password'
                    fullWidth={true}
                    defaultValue={values.password}
                    error={errors.password !== null}
                    helperText={errors.password}
                    onChange={inputChange}
                />
            </ListItem>
            <ListItem>
                <Button type='submit'>Log in</Button>
                <Link to='/register' style={styles.a}>
                    <Button> Need to register?</Button>
                </Link>
            </ListItem>
        </form>
    )
}

LoginForm.propTypes = {
    values: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string
    }).isRequired,
    errors: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string
    }).isRequired,
    inputChange: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired
}

export default LoginForm

