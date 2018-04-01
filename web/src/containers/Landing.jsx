/* eslint-disable no-undef */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getBackgroundPic, login, register } from '../api'
import { authUser, createFlashMessage } from '../actions'
import LandingBackground from '../components/LandingBackground';

class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {
                username: '',
                password: '',
                fullname: '',
                email: ''
            },
            errors: {
                username: '',
                password: '',
                fullname: '',
                email: ''
            },
            gifUrl: ''
        }
    }
    static propTypes = {
        auth: PropTypes.func.isRequired,
        createFlashMessage: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    }

    getBackground = async () => {
        let _res, res
        _res = await getBackgroundPic()
        if (!_res) return
        res = _res.data.image_original_url;
        if (res) this.setState({ gifUrl: res })
    }
    inputChangeHandler = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            fields: {
                ...this.state.fields,
                [name]: value
            }
        });
    }
    submitLoginHandler = async (event) => {
        event.preventDefault();
        this.setState({
            errors: {
                username: '',
                password: '',
                fullname: '',
                email: ''
            }
        });
        const userData = {
            'username': this.state.fields.username,
            'password': this.state.fields.password
        };
        const res = await login(userData)
        if (!res) return
        if (res.status === 401 || res.status === 409 || res.status === 422) {
            if (!res.data.message.length) res.data.message = [res.data.message]
            res.data.message.forEach((failure) => {
                const name = failure.param
                this.setState({
                    errors: {
                        ...this.state.errors,
                        [name]: failure.msg
                    }
                });
            })
        } else {
            this.props.auth(res.data)
            this.props.createFlashMessage(`You successfully logged in! Welcome!`)
        }
    }
    submitRegisterHandler = async (event) => {
        event.preventDefault();
        this.setState({
            errors: {
                username: '',
                password: '',
                fullname: '',
                email: ''
            }
        });
        const userData = {
            'username': this.state.fields.username,
            'fullname': this.state.fields.fullname,
            'email': this.state.fields.email,
            'password': this.state.fields.password
        };
        const res = await register(userData)
        if (!res) return
        if (res.status === 401 || res.status === 409 || res.status === 422) {
            if (!res.data.message.length) res.data.message = [res.data.message]
            res.data.message.forEach((failure) => {
                const name = failure.param
                this.setState({
                    errors: {
                        ...this.state.errors,
                        [name]: failure.msg
                    }
                });
            })
        } else {
            this.props.auth(res.data)
            this.props.createFlashMessage(`You successfully registered! Welcome!`)
            this.props.history.push('/')
        }
    }
    componentWillMount() {
        this.getBackground()
    }
    render() {
        return (
            <LandingBackground
                {...this.state}
                submitLogin={this.submitLoginHandler}
                submitRegister={this.submitRegisterHandler}
                inputChange={this.inputChangeHandler}
            />
        )
    }

}

const mapDispatchToProps = dispatch => ({
    auth: (mode, userData) => dispatch(authUser(mode, userData)),
    createFlashMessage: (text) => dispatch(createFlashMessage(text)),
})
export default withRouter(connect(null, mapDispatchToProps)(Landing))