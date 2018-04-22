import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog'
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slide from 'material-ui/transitions/Slide';

const styles = {
    list: {
        width: '550px',
        margin: '1em 0',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    avatar: {
        width: '60px',
        height: '60px',
        marginRight: '1em'
    },
    fileInput: {
        display: 'none'
    },
    listItemColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    expansionPanel: {
        boxShadow: 'none',
        backgroundColor: 'inherit',
    },
    expansionPanelDetails: {
        padding: 0,
    }
}

const SettingsProfile = ({ values, errors, classes, isChangePasswordDialogOpen,
    isDeleteProfileDialogOpen, updateAvatar, updateValue, updatePassword,
    checkPassword, checkNewPassword, sendNewPasswordEmailConfirmation,
    showDialog, updateEmailConfirmationCode, logoutUser }) => {

    const profileList = (
            <List>
                <ListSubheader>Profile</ListSubheader>
                <ListItem>
                    <Avatar
                        alt={values.fullname}
                        className={classes.avatar}
                        src={`data:image/png;base64, ${values.avatar}`}
                    />
                    <Button component="label">
                        Change user avatar
                        <form
                            accept='.jpg, .jpeg, .png'
                            encType="multipart/form-data" >
                            <input
                                className={classes.fileInput}
                                key='avatar'
                                type='file'
                                name='avatar'
                                accept='.jpg, .jpeg, .png'
                                onChange={updateAvatar} />
                        </form>
                    </Button>
                </ListItem>
                <ListItem>
                    <TextField
                        label="Username"
                        key='username'
                        defaultValue={values.username}
                        fullWidth={true}
                        error={errors.username !== null}
                        helperText={errors.username}
                        onKeyPress={e => e.key === 'Enter' &&
                            updateValue('username', e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="Fullname"
                        key='fullname'
                        defaultValue={values.fullname}
                        fullWidth={true}
                        error={errors.fullname !== null}
                        helperText={errors.fullname}
                        onBlur={event => updateValue('fullname', event.target.value)}
                        onKeyPress={e => e.key === 'Enter' &&
                            updateValue('fullname', e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="Email"
                        key='email'
                        defaultValue={values.email}
                        fullWidth={true}
                        error={errors.email !== null}
                        helperText={errors.email}
                        onBlur={event => updateValue('email', event.target.value)}
                        onKeyPress={e => e.key === 'Enter' &&
                            updateValue('email', e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="Description"
                        key='description'
                        defaultValue={values.description}
                        fullWidth={true}
                        multiline={true}
                        error={errors.description !== null}
                        helperText={errors.description}
                        onBlur={event => updateValue('description', event.target.value)}
                        onKeyPress={e => e.key === 'Enter' &&
                            updateValue('description', e.target.value)}
                    />
                </ListItem>
            </List>
    )

    const passwordList = (
            <List>
                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <ListItemText
                            primary="Change Password"
                            secondary="New password must has at least 5 chars and one number."
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionPanelDetails} >
                        <ListItem className={classes.listItemColumn}>
                            <TextField
                                label="Current password"
                                key='oldpassword'
                                name='oldpassword'
                                type='password'
                                defaultValue={values.oldpassword}
                                error={errors.oldpassword !== null}
                                helperText={errors.oldpassword}
                                onBlur={checkPassword}
                            />
                            <TextField
                                label="New password"
                                key='newpassword'
                                name='newpassword'
                                type='password'
                                defaultValue={values.newpassword}
                                error={errors.newpassword !== null}
                                helperText={errors.newpassword}
                                onBlur={checkNewPassword}
                            />
                            <br />
                            <Button
                                disabled={
                                    values.newpassword === null ||
                                    values.oldpassword === null ||
                                    errors.oldpassword !== null ||
                                    errors.newpassword !== null
                                }
                                onClick={() => {
                                    sendNewPasswordEmailConfirmation()
                                    showDialog('isChangePasswordDialogOpen')
                                }}
                            >
                                Change Password
                            </Button>
                            <Dialog
                                open={isChangePasswordDialogOpen}
                                onClose={() => showDialog('isChangePasswordDialogOpen')}>
                                <DialogTitle>Confirmation</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Type verification code we sent you on email for proceed:
                                    </DialogContentText>
                                        <TextField
                                            fullWidth={true}
                                            label="Confirmation code"
                                            key='confirmation'
                                            name='confirmation_code'
                                            type='password'
                                            defaultValue={values.emailConfirmationCode}
                                            error={errors.emailConfirmationCode}
                                            helperText={errors.emailConfirmationCode}
                                            onChange={updateEmailConfirmationCode}
                                        />
                                </DialogContent>
                                <DialogActions>
                                    <Button 
                                        onClick={sendNewPasswordEmailConfirmation} 
                                        color="primary">
                                    Send again
                                    </Button>
                                    <Button 
                                        onClick={updatePassword} 
                                        disabled={values.emailConfirmationCode === null}
                                        color="primary" 
                                        autoFocus >
                                    Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </ListItem>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </List>
    )

    const deleteAccountList = (
            <List>
                <ListItem className={classes.listItemColumn}>
                    <ListItemText
                        primary="Delete Profile"
                        secondary="After deleting all profile related subscriptions
                        will be deleted also. Profile can be restored within
                        three months after deleting date. User posts and
                        admined communities can be deleted optionally."
                    />
                    <br />
                    <Button onClick={() => showDialog('isDeleteProfileDialogOpen')}>
                    Delete Profile
                    </Button>
                </ListItem>
                <Dialog
                    disableBackdropClick={true}
                    open={isDeleteProfileDialogOpen}
                    onClose={() => showDialog('isDeleteProfileDialogOpen')}>
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Type current password for proceed:</DialogContentText>
                            <TextField
                                fullWidth={true}
                                label="Current password"
                                key='checkpassword'
                                name='oldpassword'
                                type='password'
                                defaultValue={values.oldpassword}
                                error={errors.oldpassword !== null}
                                helperText={errors.oldpassword}
                                onBlur={checkPassword}
                                onKeyPress={e => e.key === 'Enter' && checkPassword(e)}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => showDialog('isDeleteProfileDialogOpen')}  >
                        Cancel
                        </Button>
                        <Button 
                            onClick={() => {
                                updateValue('active', false)
                                logoutUser()
                            }}
                            color="primary"
                            disabled={errors.oldpassword !== null || values.oldpassword === null}
                            autoFocus>
                        Delete profile
                        </Button>
                    </DialogActions>
                </Dialog>
            </List>
    )
    
    return (
        <Slide direction="up" in={values.fullname.length > 0} mountOnEnter unmountOnExit>
        <Paper className={classes.list} >
            {profileList}
            <Divider />
            {passwordList}
            <Divider />
            {deleteAccountList}
        </Paper>
        </Slide>
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
        newpassword: PropTypes.string,
        emailConfirmationCode: PropTypes.string
    }).isRequired,
    errors: PropTypes.shape({
        username: PropTypes.string,
        fullname: PropTypes.string,
        description: PropTypes.string,
        email: PropTypes.string,
        oldpassword: PropTypes.string,
        newpassword: PropTypes.string,
        emailConfirmationCode: PropTypes.string
    }).isRequired,
    isChangePasswordDialogOpen: PropTypes.bool.isRequired,
    isDeleteProfileDialogOpen: PropTypes.bool.isRequired,
    showDialog: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    checkPassword: PropTypes.func.isRequired,
    checkNewPassword: PropTypes.func.isRequired,
    sendNewPasswordEmailConfirmation: PropTypes.func.isRequired,
    updateAvatar: PropTypes.func.isRequired,
    updateValue: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    updateEmailConfirmationCode: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SettingsProfile);