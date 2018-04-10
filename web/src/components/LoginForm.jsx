import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const LoginForm = ({ submitHandler, fields, errors, inputChange }) => {
    return (
        <form onSubmit={submitHandler} >
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
                label='Log in'
                secondary={true} />
            <FlatButton
                label={<Link to='/register'>Need to register?</Link>} />
            <br /><br />
        </form>
    )
}

LoginForm.propTypes = {
    fields: PropTypes.shape({
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

