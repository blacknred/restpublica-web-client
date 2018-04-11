import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

const styles = {
    list: {
        width: '550px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    avatarForm: {
        display: 'flex',
        alignItems: 'center',
        padding: '2em'
    },
    avatarButton: {
        marginLeft: '1em'
    },
    listItem: {
        padding: '0px 16px'
    },
    text: {
        opacity: '0.6',
        fontSize: '0.9em'
    }
}

const SettingsProfile = ({ values, errors, updateAvatar, updateValue,
    checkPassword, checkNewPassword, logoutUser }) => {
    return (
        <div className='container'>
            {
                !values.fullname.length ? <CircularProgress /> :
                    <Paper
                        style={styles.list}
                        transitionEnabled={true} >
                        <List>
                            <Subheader><b>Profile</b></Subheader>
                            <ListItem
                                disabled={true}
                                leftAvatar={
                                    <Avatar
                                        size={60}
                                        src={`data:image/png;base64, ${values.avatar}`} />
                                }
                                primaryText={
                                    <FlatButton
                                        label="Change user avatar"
                                        containerElement="label"
                                        style={styles.avatarButton} >
                                        <form
                                            accept='.jpg, .jpeg, .png'
                                            encType="multipart/form-data" >
                                            <input
                                                key='avatar'
                                                type='file'
                                                name='avatar'
                                                accept='.jpg, .jpeg, .png'
                                                onChange={updateAvatar} />
                                        </form>
                                    </FlatButton>
                                }
                            />
                            <ListItem
                                disabled={true}
                                style={styles.listItem} >
                                <TextField
                                    key='username'
                                    name='username'
                                    defaultValue={values.username}
                                    floatingLabelText="Username"
                                    fullWidth={true}
                                    onBlur={event => updateValue('username', event.target.value)}
                                    errorText={errors.username}
                                />
                            </ListItem>
                            <ListItem
                                disabled={true}
                                style={styles.listItem}>
                                <TextField
                                    key='fullname'
                                    name='fullname'
                                    defaultValue={values.fullname}
                                    floatingLabelText="Fullname"
                                    fullWidth={true}
                                    onBlur={event => updateValue('fullname', event.target.value)}
                                    errorText={errors.fullname}
                                />
                            </ListItem>
                            <ListItem
                                disabled={true}
                                style={styles.listItem}>
                                <TextField
                                    key='email'
                                    name='email'
                                    defaultValue={values.email}
                                    floatingLabelText="Email"
                                    fullWidth={true}
                                    onBlur={event => updateValue('email', event.target.value)}
                                    errorText={errors.email}
                                />
                            </ListItem>
                            <ListItem
                                disabled={true}
                                style={styles.listItem}>
                                <TextField
                                    key='description'
                                    name='description'
                                    defaultValue={values.description}
                                    floatingLabelText="Description"
                                    multiLine={true}
                                    fullWidth={true}
                                    onBlur={event => updateValue('description', event.target.value)}
                                    errorText={errors.description}
                                />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <Subheader><b>Change Password</b></Subheader>
                            <ListItem
                                disabled={true}
                                style={styles.listItem} >
                                <span style={styles.text}>
                                    Password must has at least 5 chars and one number.
                                </span>
                                <TextField
                                    key='oldpassword'
                                    name='oldpassword'
                                    type='password'
                                    floatingLabelText="Current password"
                                    onBlur={checkPassword}
                                    errorText={errors.oldpassword}
                                    fullWidth={true}
                                    defaultValue={values.oldpassword}
                                />
                                <TextField
                                    key='newpassword'
                                    name='newpassword'
                                    type='password'
                                    floatingLabelText="New password"
                                    onBlur={checkNewPassword}
                                    errorText={errors.newpassword}
                                    fullWidth={true}
                                    defaultValue={values.newpassword}
                                />
                                <br /> <br />
                                <FlatButton
                                    label='Change Password'
                                    disabled={
                                        values.newpassword === null ||
                                        values.oldpassword === null ||
                                        errors.oldpassword !== null ||
                                        errors.newpassword !== null
                                    }
                                    onClick={() => window.prompt('Mocking email confirmation code', 'code')}
                                />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <Subheader><b>Delete Account</b></Subheader>
                            <ListItem
                                disabled={true}
                                style={styles.listItem} >
                                <span style={styles.text}>
                                    After deleting all account related subscriptions
                                    will be deleted also. Account can be restored within
                                    three monthes after deleting date. User posts and
                                    admined communities can be deleted optionally.
                                </span><br /><br />
                                <FlatButton
                                    label='Delete Account'
                                    onClick={() => {
                                        window.prompt('Mocking Warning. Confirm password', 'password')
                                        // logoutUser()
                                    }}
                                />
                                <br /> <br />
                            </ListItem>
                        </List>
                    </Paper>
            }
        </div>
    );
}

SettingsProfile.propTypes = {
    values: PropTypes.shape({
        username: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        oldpassword: PropTypes.string,
        newpassword: PropTypes.string
    }).isRequired,
    errors: PropTypes.shape({
        username: PropTypes.string,
        fullname: PropTypes.string,
        description: PropTypes.string,
        email: PropTypes.string,
        oldpassword: PropTypes.string,
        newpassword: PropTypes.string
    }).isRequired,
    updateAvatar: PropTypes.func.isRequired,
    updateValue: PropTypes.func.isRequired,
    checkPassword: PropTypes.func.isRequired,
    checkNewPassword: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
}

export default SettingsProfile