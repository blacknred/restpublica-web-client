import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

const RegisterForm = ({ values, errors, inputChange, submitHandler }) => {
    return (
        <List>
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
                    label="Fullname"
                    key='fullname'
                    name='fullname'
                    defaultValue={values.fullname}
                    fullWidth={true}
                    error={errors.fullname !== null}
                    helperText={errors.fullname}
                    onChange={inputChange}
                />
            </ListItem>
            <ListItem>
                <TextField
                    label="Email"
                    key='email'
                    name='email'
                    defaultValue={values.email}
                    fullWidth={true}
                    error={errors.email !== null}
                    helperText={errors.email}
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
                Sign up
                </Button>
                <Button 
                component={Link} 
                to="/login"
                >
                    Already have account?
                </Button>
            </ListItem>
        </List>
    )
}

RegisterForm.propTypes = {
    values: PropTypes.shape({
        username: PropTypes.string,
        fullname: PropTypes.string,
        password: PropTypes.string,
        email: PropTypes.string
    }).isRequired,
    errors: PropTypes.shape({
        username: PropTypes.string,
        fullname: PropTypes.string,
        password: PropTypes.string,
        email: PropTypes.string
    }).isRequired,
    inputChange: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired
}
export default RegisterForm
