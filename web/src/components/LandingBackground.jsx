import React from 'react';
import PropTypes from 'prop-types'
import { Switch, Route, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import ActionExploreIcon from 'material-ui/svg-icons/action/explore';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const styles = {
    container: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    form: {
        width: '17em',
        marginTop: '6em',
        padding: '1.5em 2.5em',
        backgroundColor: 'rgb(250, 250, 250)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

const LandingBackground = ({ gifUrl, fields, errors, submitLogin,
    submitRegister, inputChange }) => {
    return (
        <div style={{
            ...styles.container,
            background: `url("${gifUrl}") no-repeat center / cover fixed`
        }} >
            <div style={styles.form} >
                <h2>Restpublica</h2>
                <Switch>
                    <Route path='/login' render={() => (
                        <LoginForm
                            fields={fields}
                            errors={errors}
                            submitHandler={submitLogin}
                            inputChange={inputChange}
                        />
                    )} />
                    <Route path='/register' render={() => (
                        <RegisterForm
                            fields={fields}
                            errors={errors}
                            submitHandler={submitRegister}
                            inputChange={inputChange}
                        />
                    )} />
                </Switch>
                <br />
                <FlatButton
                    label={<Link to='/trending'>Explore</Link>}
                    icon={<ActionExploreIcon />}
                />
                <br />
            </div>
        </div >
    )
}

LandingBackground.propTypes = {
    gifUrl: PropTypes.string.isRequired,
    fields: PropTypes.shape({
        username: PropTypes.string,
        fullname: PropTypes.string,
        password: PropTypes.string,
        email: PropTypes.string
    }).isRequired,
    errors: PropTypes.PropTypes.shape({
        username: PropTypes.string,
        fullname: PropTypes.string,
        password: PropTypes.string,
        email: PropTypes.string
    }).isRequired,
    inputChange: PropTypes.func.isRequired,
    submitLogin: PropTypes.func.isRequired,
    submitRegister: PropTypes.func.isRequired
}

export default LandingBackground
