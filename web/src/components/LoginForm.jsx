import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

const LoginForm = ({ values, errors, inputChange, submitHandler }) => {
    return (
        <List >
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
                <Button onClick={submitHandler}>
                    Log in
                </Button>
                <Button
                    component={Link}
                    to="/register"
                >
                    Need to register?
                </Button>
            </ListItem>
        </List>
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

