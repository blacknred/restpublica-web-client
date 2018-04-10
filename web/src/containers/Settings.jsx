import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'

import { getUserProfile, login, userUpdate } from '../api'
import {
    updateUser, createFlashMessage, toggleNightMode,
    toggleNotify, toggleAutoGifs, toggleFeedOneColumn, logoutUser
} from '../actions'
import SettingsProfile from '../components/SettingsProfile'
import SettingsApp from '../components/SettingsApp'

class Settings extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                values: {
                    username: '',
                    fullname: '',
                    description: '',
                    email: '',
                    avatar: '',
                    email_notify: true,
                    feed_rand: 0,
                    oldpassword: null,
                    newpassword: null
                },
                errors: {
                    username: null,
                    fullname: null,
                    description: null,
                    email: null,
                    oldpassword: null,
                    newpassword: null
                }
            }
        };
    }
    static propTypes = {
        username: PropTypes.string.isRequired,
        update: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired
    }
    getProfile = async () => {
        const res = await getUserProfile()
        if (!res.status) {
            this.props.createMessage(res)
            return
        }
        this.setState({
            profile: {
                ...this.state.profile,
                values: {
                    ...this.state.profile.values,
                    ...res.data,
                    //avatar: `data:image/png;base64, ${res.data.avatar}`
                }
            }
        })
    }
    updateProfileValueHandler = async (option, value) => {
        if (value === this.state.profile.values[option]) {
            this.setState({
                profile: {
                    values: {
                        ...this.state.profile.values
                    },
                    errors: {
                        ...this.state.profile.errors,
                        [option]: null
                    }
                }
            });
            return;
        }
        const updatedData = {
            option,
            value
        };
        const res = await userUpdate(updatedData)
        if (!res.status) {
            this.props.createMessage(res)
            return
        } else if (res.status.toString().match(/(401|409|422)/)) {
            if (!res.message.length) res.message = [res.message]
            res.message.forEach((failure) => {
                this.setState({
                    profile: {
                        values: {
                            ...this.state.profile.values
                        },
                        errors: {
                            ...this.state.profile.errors,
                            [option]: failure.msg
                        }
                    }
                });
            })
        } else {
            this.setState({
                profile: {
                    ...this.state.profile,
                    values: {
                        ...this.state.profile.values,
                        ...res.data
                    }
                }
            })
            if (option.match(/^(username|feed_rand)$/)) {
                this.props.update(res.data)
            }
            if (!option.match(/^(email_notify|feed_rand)$/)) {
                const formatedOption = option[0].toUpperCase() + option.substr(1);
                this.props.createMessage(formatedOption + ' is updated')
            }
        }
    }
    updateProfileAvatarHandler = async (event) => {
        event.preventDefault();
        let avatar = event.target.files[0];
        if (!avatar) return
        if (avatar.size > 2000000) {
            this.props.createMessage('Maximum size is 2 mB')
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(avatar);
        reader.onloadend = async () => {
            avatar = reader.result.split(',')[1].trim();
            const updatedData = {
                option: 'avatar',
                value: avatar
            }
            const res = await userUpdate(updatedData)
            if (!res.status) {
                this.props.createMessage(res)
                return
            }
            this.setState({
                profile: {
                    ...this.state.profile,
                    values: {
                        ...this.state.profile.values,
                        ...res.data
                    }
                }
            })
            this.props.update(res.data);
            this.props.createMessage('Avatar is updated')
        }
    }
    checkProfilePasswordHandler = async (event) => {
        event.preventDefault();
        const checkName = event.target.name
        const checkValue = event.target.value
        const checkData = {
            'username': this.props.username,
            'password': checkValue
        };
        const res = await login(checkData)
        if (!res.status) {
            this.props.createMessage(res)
            return
        } else if (res.status.toString().match(/(401|409|422)/)) {
            if (!res.message.length) res.message = [res.message]
            res.message.forEach((failure) => {
                this.setState({
                    profile: {
                        ...this.state.profile,
                        errors: {
                            ...this.state.profile.errors,
                            [checkName]: failure.msg
                        }
                    }
                });
            })
        } else {
            this.setState({
                profile: {
                    ...this.state.profile,
                    values: {
                        ...this.state.profile.values,
                        [checkName]: checkValue
                    },
                    errors: {
                        ...this.state.profile.errors,
                        [checkName]: null
                    }
                }
            })
        }
    }
    checkProfileNewPasswordHandler = async (event) => {
        event.preventDefault();
        const checkName = event.target.name
        const checkValue = event.target.value
        let failure = null;
        if (!checkValue.match(/^.*(?=.{5,})(?=.*\d)(?=.*[a-zA-Z]).*$/)) {
            failure = 'Password must has at least 5 chars and one number'
        } else if (checkValue === this.state.profile.values.oldpassword) {
            failure = 'New password must differ previous'
        }
        this.setState({
            profile: {
                ...this.state.profile,
                values: {
                    ...this.state.profile.values,
                    [checkName]: checkValue
                },
                errors: {
                    ...this.state.profile.errors,
                    [checkName]: failure
                }
            }
        });
    }
    componentDidMount() {
        console.log('profile is mounted')
        this.getProfile();
    }

    render() {
        const settingsProfile =
            <SettingsProfile
                {...this.state.profile}
                updateValue={this.updateProfileValueHandler}
                updateAvatar={this.updateProfileAvatarHandler}
                checkPassword={this.checkProfilePasswordHandler}
                checkNewPassword={this.checkProfileNewPasswordHandler}
                logoutUser={this.props.logoutUser}
            />
        const settingsApp =
            <SettingsApp
                {...this.props}
                feed_rand={this.state.profile.values.feed_rand}
                email_notify={this.state.profile.values.email_notify}
                updateValue={this.updateProfileValueHandler}
            />
        return (
            <Switch>
                <Route path='/settings/profile' render={() => settingsProfile} />
                <Route render={() => (
                    <div>
                        {settingsApp}
                        {settingsProfile}
                    </div>
                )} />
            </Switch>
        )
    }
}

const mapStateToProps = (state) => ({
    username: state.authentication.username,
    isNightMode: state.uiSwitchers.isNightMode,
    isNotify: state.notifications.isNotify,
    isAutoGifs: state.uiSwitchers.isAutoGifs,
    isFeedOneColumn: state.uiSwitchers.isFeedOneColumn
})

const mapDispatchToProps = dispatch => ({
    update: (profileData) => dispatch(updateUser(profileData)),
    createMessage: (text) => dispatch(createFlashMessage(text)),
    toggleNightMode: (mode) => dispatch(toggleNightMode(mode)),
    toggleNotify: (mode) => dispatch(toggleNotify(mode)),
    toggleAutoGifs: (mode) => dispatch(toggleAutoGifs(mode)),
    toggleFeedOneColumn: (mode) => dispatch(toggleFeedOneColumn(mode)),
    logoutUser: () => dispatch(logoutUser())
})
export default connect(mapStateToProps, mapDispatchToProps)(Settings)