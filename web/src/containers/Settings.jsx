/*eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'

import { getUserProfile, userUpdate } from '../api'
import { updateUser, createFlashMessage } from '../actions'
import SettingsProfile from '../components/SettingsProfile'
import SettingsApp from '../components/SettingsApp'

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                fields: {
                    username: '',
                    fullname: '',
                    description: '',
                    email: '',
                    avatar: ''
                },
                errors: {
                    username: '',
                    fullname: '',
                    description: '',
                    email: ''
                }
            }
        };
    }
    static propTypes = {
        update: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired
    }
    getProfile = async () => {
        let _res, res
        _res = await getProfileData()
        res = _res.data.data
        if (!res) return
        this.setState({
            profile: {
                ...this.state.profile,
                fields: {
                    username: res.username,
                    fullname: res.fullname,
                    description: res.description,
                    email: res.email,
                    avatar: `data:image/png;base64, ${res.avatar}`
                }
            }
        })
    }
    inputProfileFieldChangeHandle = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            profile: {
                ...this.state.profile,
                fields: {
                    ...this.state.profile.fields,
                    [name]: value
                }
            }
        })
    }
    inputProfileFileChangeHandle = (event) => {
        const avatar = window.URL.createObjectURL(event.target.files[0])
        this.setState({
            profile: {
                ...this.state.profile,
                fields: {
                    ...this.state.profile.fields,
                    avatar
                }
            }
        });
    }
    updateUserAvatarHandle = async (event) => {
        event.preventDefault();
        let _res, res, profilePic
        profilePic = event.target.querySelector('#avatar').files[0];
        if (!profilePic) return this.props.createMessage('Select an image at first')
        const formData = new FormData();
        formData.append('avatar', profilePic);
        _res = await avatarUpdate(formData)
        res = _res.data.data
        this.setState({
            profile: {
                ...this.state.profile,
                fields: {
                    ...this.state.profile.fields,
                    avatar: `data:image/png;base64, ${res}`
                }
            }
        })
        this.props.update({
            username: this.state.profile.fields.username,
            avatar: res
        });
    }
    updateUserFieldsHandle = async (event) => {
        event.preventDefault();
        let _res, res, name
        const profileData = {
            'username': this.state.profile.fields.username,
            'fullname': this.state.profile.fields.fullname,
            'description': this.state.profile.fields.description,
            'email': this.state.profile.fields.email
        };
        _res = await userUpdate(profileData)
        if (!_res) return
        res = _res.data
        res.status === 'Validation failed' ?
            res.failures.forEach((failure) => {
                name = failure.param
                this.setState({
                    profile: {
                        ...this.state.profile.fields,
                        errors: {
                            ...this.state.profile.errors,
                            [name]: failure.msg
                        }
                    }
                })
            }) :
            this.props.update({
                username: this.state.profile.fields.username,
                avatar: this.state.profile.fields.avatar
            })
    }
    componentDidMount() {
        console.log('profile is mounted')
        this.getProfile();
    }

    render() {
        return (
            <Switch>
                <Route path='/settings/profile' render={() => (
                    <div>
                        <SettingsProfile
                            fields={this.state.profile.fields}
                            errors={this.state.profile.errors}
                            inputFieldChange={this.inputProfileFieldChangeHandle}
                            inputFileChange={this.inputProfileFileChangeHandle}
                            updateAvatar={this.updateUserAvatarHandle}
                            updateFields={this.updateUserFieldsHandle}
                        />
                    </div>
                )} />
                <Route path='/settings/app' render={() => (
                    <div>
                        <SettingsApp />
                    </div>
                )} />
                <Route render={() => (
                    <div>
                        <SettingsApp />
                        <SettingsProfile
                            fields={this.state.profile.fields}
                            errors={this.state.profile.errors}
                            inputFieldChange={this.inputProfileFieldChangeHandle}
                            inputFileChange={this.inputProfileFileChangeHandle}
                            updateAvatar={this.updateUserAvatarHandle}
                            updateFields={this.updateUserFieldsHandle}
                        />
                    </div>
                )} />
            </Switch>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    update: (profileData) => dispatch(updateUser(profileData)),
    createMessage: (text) => dispatch(createFlashMessage(text))
})
export default connect(null, mapDispatchToProps)(Settings)