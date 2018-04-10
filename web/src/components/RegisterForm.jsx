import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const RegisterForm = ({ submitHandler, fields, errors, inputChange }) => {
    return (
        <form onSubmit={submitHandler}>
            <TextField
                id='username'
                name='username'
                value={fields.username}
                floatingLabelText="Username"
                hintText="Username Field"
                onChange={inputChange}
                errorText={errors.username}
                fullWidth={true}
            /><br />
            <TextField
                id='fullname'
                name='fullname'
                value={fields.fullname}
                floatingLabelText="Fullname"
                hintText="Fullname Field"
                onChange={inputChange}
                errorText={errors.fullname}
                fullWidth={true}
            /><br />
            <TextField
                id='email'
                name='email'
                type='email'
                value={fields.email}
                floatingLabelText="Email"
                hintText="Email Field"
                onChange={inputChange}
                errorText={errors.email}
                fullWidth={true}
            /><br />
            <TextField
                id='password'
                name='password'
                type="password"
                hintText="Password Field"
                value={fields.password}
                floatingLabelText="Password"
                onChange={inputChange}
                errorText={errors.password}
                fullWidth={true}
            /><br /><br />
            <FlatButton
                type='submit'
                label='Sign up'
                secondary={true} />
            <FlatButton label={<Link to='/login'>Need to login?</Link>} />
            <br /><br />
        </form>
    )
}

RegisterForm.propTypes = {
    fields: PropTypes.shape({
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
