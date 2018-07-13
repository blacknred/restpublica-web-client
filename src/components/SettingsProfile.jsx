import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ActionExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContentText from '@material-ui/core/DialogContentText';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const styles = theme => ({
    root: {
        maxWidth: '550px',
        width: '100vw',
    },
    expansionPanel: {
        boxShadow: 'none',
        backgroundColor: 'inherit',
    },
    expansionPanelDetails: {
        padding: 0,
    }
})

const SettingsProfile = ({
    values, errors, classes, isChangePasswordDialogOpen, toggleDialog,
    isDeleteProfileDialogOpen, updateValue, updatePassword, logoutUser, 
    checkPassword, checkNewPassword, sendNewPasswordEmailConfirmation,
    updateEmailConfirmationCode, isDeleteProfileResponsibilityCheck
}) => {

    const profileList = (
        <div>
            <ListSubheader>Profile</ListSubheader>
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
        </div>
    )

    const changePassword = (
        <div>
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
                                toggleDialog('isChangePasswordDialogOpen')
                            }}
                        >
                            Change Password
                        </Button>
                        <Dialog
                            open={isChangePasswordDialogOpen}
                            onClose={() => toggleDialog('isChangePasswordDialogOpen')}>
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
        </div>
    )

    const account = (
        <div>
            <ListSubheader>Account</ListSubheader>
            <ListItem
                button
                onClick={logoutUser}>
                <ListItemIcon>
                    <ActionExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
            </ListItem>
            <ListItem
                button
                onClick={() => toggleDialog('isDeleteProfileDialogOpen')}
            >
                <ListItemIcon>
                    <WarningIcon />
                </ListItemIcon>
                <ListItemText primary="Delete account" />
            </ListItem>
            <Dialog
                disableBackdropClick={true}
                open={isDeleteProfileDialogOpen}
                onClose={() => toggleDialog('isDeleteProfileDialogOpen')}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        After deleting all profile related subscriptions will be deleted also.
                        Profile can be restored within three months after deleting date.
                        User posts and admined communities can be deleted optionally.
                    </DialogContentText>
                    <DialogContentText>
                        Type current password for proceed:
                        </DialogContentText>
                    <br />
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
                    <br />
                    <DialogContentText>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isDeleteProfileResponsibilityCheck}
                                    onChange={
                                        () => toggleDialog('isDeleteProfileResponsibilityCheck')
                                    }
                                />
                            }
                            label={`Confirm deleting ${values.fullname} account.`}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => toggleDialog('isDeleteProfileDialogOpen')}  >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            updateValue('active', false)
                            logoutUser()
                        }}
                        color="primary"
                        disabled={
                            errors.oldpassword !== null ||
                            values.oldpassword === null ||
                            !isDeleteProfileResponsibilityCheck
                        }
                        autoFocus>
                        Delete profile
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

    return (
        <Paper
            elevation={1}
            className={classes.root}
        >
            <List>
                {profileList}
                <Divider />
                {changePassword}
                <Divider />
                {account}
            </List>
        </Paper>
    );
}

SettingsProfile.propTypes = {
    values: PropTypes.shape({
        username: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
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
    isDeleteProfileResponsibilityCheck: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    checkPassword: PropTypes.func.isRequired,
    checkNewPassword: PropTypes.func.isRequired,
    sendNewPasswordEmailConfirmation: PropTypes.func.isRequired,
    updateValue: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    updateEmailConfirmationCode: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SettingsProfile);