import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import {
    login,
    register,
    getBackgroundPic,
} from '../api'
import {
    authUser,
    createFlashMessage
} from '../actions'
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import LandingContent from '../components/LandingContent';

class Landing extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            values: {
                username: '',
                password: '',
                fullname: '',
                email: ''
            },
            errors: {
                username: null,
                password: null,
                fullname: null,
                email: null
            },
            gifUrl: ''
        }
    }

    static propTypes = {
        from: PropTypes.string.isRequired,
        auth: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    }

    getBackground = async () => {
        const res = await getBackgroundPic()
        if (res) this.setState({ gifUrl: res.data.image_original_url })
    }

    inputChangeHandler = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            values: {
                ...this.state.values,
                [target.name]: value
            }
        });
    }

    submitLoginHandler = async (event) => {
        event.preventDefault();
        this.setState({
            errors: {
                username: null,
                password: null,
                fullname: null,
                email: null
            }
        });
        const userData = {
            'username': this.state.values.username,
            'password': this.state.values.password
        };
        const res = await login(userData)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        if (res.status.toString().match(/(401|409|422)/)) {
            if (!res.message.length) res.message = [res.message]
            res.message.forEach((failure) => {
                this.setState({
                    errors: {
                        ...this.state.errors,
                        [failure.param]: failure.msg
                    }
                });
            })
        } else {
            this.props.auth(res.data)
            this.props.history.push(this.props.from)
            this.props.createMessage(`You successfully logged in!`)
        }
    }

    submitRegisterHandler = async (event) => {
        event.preventDefault();
        this.setState({
            errors: {
                username: null,
                password: null,
                fullname: null,
                email: null
            }
        });
        const userData = {
            'username': this.state.values.username,
            'fullname': this.state.values.fullname,
            'email': this.state.values.email,
            'password': this.state.values.password
        };
        const res = await register(userData)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        if (res.status.toString().match(/(401|409|422)/)) {
            if (!res.message.length) res.message = [res.message]
            res.message.forEach((failure) => {
                this.setState({
                    errors: {
                        ...this.state.errors,
                        [failure.param]: failure.msg
                    }
                });
            })
        } else {
            this.props.auth(res.data)
            this.props.history.push('/')
            this.props.createMessage(`You successfully registered!`)
        }
    }

    componentWillMount() {
        this.getBackground()
    }

    render() {
        const { mode } = this.props
        return (
            <LandingContent gifUrl={this.state.gifUrl} >
                {
                    mode === 'login' ?
                        <LoginForm
                            {...this.state}
                            inputChange={this.inputChangeHandler}
                            submitHandler={this.submitLoginHandler}
                        /> :
                        <RegisterForm
                            {...this.state}
                            inputChange={this.inputChangeHandler}
                            submitHandler={this.submitRegisterHandler}
                        />
                }
            </LandingContent>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    from: ownProps.location.state ? ownProps.location.state.from : '/',
    mode: ownProps.match.params[0]
})

const mapDispatchToProps = dispatch => ({
    auth: (mode, userData) => dispatch(authUser(mode, userData)),
    createMessage: (text) => dispatch(createFlashMessage(text)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing))