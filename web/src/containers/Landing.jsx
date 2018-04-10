import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getBackgroundPic, login, register } from '../api'
import { authUser, createFlashMessage } from '../actions'
import LandingBackground from '../components/LandingBackground';

class Landing extends PureComponent {
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
        createMessage: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    }

    getBackground = async () => {
        const res = await getBackgroundPic()
        if (!res.status) return
        this.setState({ gifUrl: res.data.image_original_url })
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
        if (!res.status) {
            this.props.createMessage(res)
            return
        } else if (res.status.toString().match(/(401|409|422)/)) {
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
            this.props.createMessage(`You successfully logged in!`)
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
        if (!res.status) {
            this.props.createMessage(res)
            return
        } else if (res.status.toString().match(/(401|409|422)/)) {
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
            this.props.createMessage(`You successfully registered!`)
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
    createMessage: (text) => dispatch(createFlashMessage(text)),
})
export default withRouter(connect(null, mapDispatchToProps)(Landing))