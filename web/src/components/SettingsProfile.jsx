/*eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

const styles = {
    profile: {
        padding: '1em',
        width: '500px'
    },
    avatarForm: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px'
    },
    avatar: {
        marginRight: '15px',
        cursor: 'pointer'
    },
    profileForm: {
        padding: '0 16px'
    }
}

const SettingsProfile = ({ fields, errors, inputFieldChange,
    inputFileChange, updateAvatar, updateFields }) => {

    const avatarForm = (
        <form
            onSubmit={updateAvatar}
            id='uploadForm'
            accept='.jpg, .jpeg, .png'
            encType="multipart/form-data"
            style={styles.avatarForm} >
            <label htmlFor="profilePic">
                <Avatar
                    size={60}
                    src={fields.avatar}
                    style={styles.avatar} />
            </label>
            <FlatButton
                label="Choose an Image"
                containerElement="label" >
                <input
                    id='avatar'
                    type='file'
                    name='avatar'
                    accept='.jpg, .jpeg, .png'
                    onChange={inputFileChange} />
            </FlatButton>
            <FlatButton
                type='submit'
                label='Update avatar' />
        </form>
    );
    const fieldsForm = (
        <form
            onSubmit={updateFields}
            style={styles.profileForm}>
            <TextField
                id='username'
                name='username'
                value={fields.username}
                floatingLabelText="Username"
                fullWidth={true}
                onChange={inputFieldChange}
                errorText={errors.username}
            /><br />
            <TextField
                id='fullname'
                name='fullname'
                value={fields.fullname}
                floatingLabelText="Fullname"
                fullWidth={true}
                onChange={inputFieldChange}
                errorText={errors.fullname}
            /><br />
            <TextField
                id='email'
                name='email'
                value={fields.email}
                floatingLabelText="Email"
                fullWidth={true}
                onChange={inputFieldChange}
                errorText={errors.email}
            /><br />
            <TextField
                id='description'
                name='description'
                value={fields.description}
                floatingLabelText="Description"
                multiLine={true}
                fullWidth={true}
                onChange={inputFieldChange}
                errorText={errors.description}
            /><br /><br />
            <FlatButton type='submit' label='Update' secondary={true} />
            <FlatButton label={<Link to='/'>Cancel</Link>} />
            <br />
        </form>
    )
    const changePassword = (
        <form>
            <FlatButton label='Change Password' />
        </form>
    )
    return (
        !fields.fullname.length ?
            <CircularProgress /> :
            <div className='container'>
                <Paper
                    style={styles.profile}
                    transitionEnabled={false}>
                    <Subheader>Avatar</Subheader>
                    {avatarForm}
                    <br />
                    <Divider />
                    <Subheader>Profile</Subheader>
                    {fieldsForm}
                    <br />
                    <Divider />
                    <Subheader>Password</Subheader>
                    {changePassword}
                </Paper>
            </div>

    );
}

SettingsProfile.propTypes = {
    fields: PropTypes.shape({
        username: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.shape({
        username: PropTypes.string,
        fullname: PropTypes.string,
        description: PropTypes.string,
        email: PropTypes.string
    }).isRequired,
    inputFieldChange: PropTypes.func.isRequired,
    inputFileChange: PropTypes.func.isRequired,
    updateAvatar: PropTypes.func.isRequired,
    updateFields: PropTypes.func.isRequired
}

export default SettingsProfile