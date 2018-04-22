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

const RegisterForm = ({ values, errors, inputChange, submitHandler }) => {
    return (
        <form onSubmit={submitHandler}>
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
                <Button type='submit'>Sign up</Button>
                <Link to='/login' style={styles.a}>
                    <Button> Already have account?</Button>
                </Link>
            </ListItem>
        </form>
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
