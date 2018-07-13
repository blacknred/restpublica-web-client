import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';

import {
    getUserProfile,
    login,
    updateUser
} from '../api'
import {
    updateLoggedUser,
    createFlashMessage,
    switchNightMode,
    switchDrawer,
    switchLoader,
    switchNotify,
    switchAutoGifs,
    switchFeedOneColumn,
    logoutUser
} from '../actions'
import AppSettings from '../components/SettingsApp'
import ProfileSettings from '../components/SettingsProfile'

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
                    newpassword: null,
                    emailConfirmationCode: null
                },
                errors: {
                    username: null,
                    fullname: null,
                    description: null,
                    email: null,
                    oldpassword: null,
                    newpassword: null,
                    emailConfirmationCode: null
                },
                isAvatarLoading: false,
                isBannerLoading: false,
                isChangePasswordDialogOpen: false,
                isDeleteProfileDialogOpen: false,
                isDeleteProfileResponsibilityCheck: false
            }
        };
    }

    static propTypes = {
        username: PropTypes.string.isRequired,
        isNightMode: PropTypes.bool.isRequired,
        isNotify: PropTypes.bool.isRequired,
        isAutoGifs: PropTypes.bool.isRequired,
        isFeedMultiColumn: PropTypes.bool.isRequired,
        update: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        switchDrawer: PropTypes.func.isRequired,
        switchNightMode: PropTypes.func.isRequired,
        switchNotify: PropTypes.func.isRequired,
        switchLoader: PropTypes.func.isRequired,
        switchAutoGifs: PropTypes.func.isRequired,
        switchFeedOneColumn: PropTypes.func.isRequired,
        logoutUser: PropTypes.func.isRequired
    }

    toggleDialogHandler = (target) => {
        this.setState({
            profile: {
                ...this.state.profile,
                [target]: !this.state.profile[target]
            }
        })
    }

    getProfileHandler = async () => {
        this.props.switchLoader(true)
        const res = await getUserProfile()
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            this.props.switchLoader(false)
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
        this.props.switchLoader(false)
    }

    updateProfileValueHandler = async (option, value) => {
        if (value === this.state.profile.values[option]) {
            this.setState({
                profile: {
                    ...this.state.profile,
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
        const res = await updateUser(updatedData)
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        if (res.status.toString().match(/(401|409|422)/)) {
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
            if (!option.match(/^(email_notify|feed_rand|active)$/)) {
                const formatedOption = option[0].toUpperCase() + option.substr(1);
                this.props.createMessage(formatedOption + ' is updated')
            }
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
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        if (res.status.toString().match(/(401|409|422)/)) {
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

    sendProfileNewPasswordEmailConfirmationHandler = async () => {
        const confirmationCode = Math.floor(100000 + Math.random() * 900000)
        this.setState({
            profile: {
                ...this.state.profile,
                values: {
                    ...this.state.profile.values,
                    emailConfirmationCode: null
                },
                errors: {
                    ...this.state.profile.errors,
                    emailConfirmationCode: null
                }
            }
        })
        window.sessionStorage.setItem('newPasswordEmailConfirmationCode', confirmationCode)
        //TODO: send mail with code on this.state.profile.fields.email
    }

    updateEmailConfirmationCodeHandler = (event) => {
        const value = event.target.value
        this.setState({
            profile: {
                ...this.state.profile,
                values: {
                    ...this.state.profile.values,
                    emailConfirmationCode: value
                }
            }
        })
    }

    updateProfilePasswordHandler = async (event) => {
        const confirmationCode = window.sessionStorage.getItem('newPasswordEmailConfirmationCode')
        if (confirmationCode !== this.state.profile.values.emailConfirmationCode) {
            this.setState({
                profile: {
                    ...this.state.profile,
                    errors: {
                        ...this.state.profile.errors,
                        emailConfirmationCode: 'Not match'
                    }
                }
            })
            return
        }
        window.sessionStorage.removeItem('newPasswordEmailConfirmationCode')
        this.updateProfileValueHandler('password', this.state.profile.values.newpassword)
        this.setState({
            profile: {
                ...this.state.profile,
                values: {
                    ...this.state.profile.values,
                    oldpassword: null,
                    newpassword: null,
                    emailConfirmationCode: null
                },
                errors: {
                    ...this.state.profile.errors,
                    oldpassword: null,
                    newpassword: null,
                    emailConfirmationCode: null
                }
            }
        })
        this.showDialogHandler('isChangePasswordDialogOpen')
    }

    logoutHandler = () => {
        this.props.switchNightMode(false)
        this.props.logoutUser()
        this.props.switchDrawer(false)
        this.props.createMessage('You are now logged out.')
    }

    componentDidMount() {
        this.getProfileHandler();
    }

    render() {
        const profileSettings = (
            this.state.profile.values.username.length > 0 &&
            <ProfileSettings
                {...this.state.profile}
                updateValue={this.updateProfileValueHandler}
                updatePassword={this.updateProfilePasswordHandler}
                checkPassword={this.checkProfilePasswordHandler}
                checkNewPassword={this.checkProfileNewPasswordHandler}
                logoutUser={this.logoutHandler}
                toggleDialog={this.toggleDialogHandler}
                sendNewPasswordEmailConfirmation={this.sendProfileNewPasswordEmailConfirmationHandler}
                updateEmailConfirmationCode={this.updateEmailConfirmationCodeHandler}
            />
        )

        const appSettings = (
            <AppSettings
                {...this.props}
                feed_rand={this.state.profile.values.feed_rand}
                email_notify={this.state.profile.values.email_notify}
                updateValue={this.updateProfileValueHandler}
            />
        )

        return (
            <Switch>
                <Route path='/settings/profile' render={() => <div>{profileSettings}</div>} />
                <Route path='/settings/app' render={() => appSettings} />
                <Route render={() => (
                    <div>
                        {appSettings}
                        {profileSettings}
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
    isFeedMultiColumn: state.uiSwitchers.isFeedMultiColumn
})

const mapDispatchToProps = dispatch => ({
    update: (profileData) => dispatch(updateLoggedUser(profileData)),
    createMessage: (text) => dispatch(createFlashMessage(text)),
    switchNightMode: (mode) => dispatch(switchNightMode(mode)),
    switchDrawer: (mode) => dispatch(switchDrawer(mode)),
    switchNotify: (mode) => dispatch(switchNotify(mode)),
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    switchAutoGifs: (mode) => dispatch(switchAutoGifs(mode)),
    switchFeedOneColumn: (mode) => dispatch(switchFeedOneColumn(mode)),
    logoutUser: () => dispatch(logoutUser())
})
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
