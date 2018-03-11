import constants from '../constants'

// authentication
export const authUser = (userData) => {
    const { id, username, token, avatar } = userData
    window.localStorage.setItem('authToken', token)
    window.localStorage.setItem('userId', id)
    window.localStorage.setItem('userName', username)
    window.localStorage.setItem('userAvatar', avatar)
    window.localStorage.setItem('userNotify', true)
    window.localStorage.setItem('userNightMode', false)
    return {
        type: constants.AUTH_USER,
        id,
        username,
        avatar
    }
}
export const updateUser = (userData) => {
    const { username, avatar } = userData
    window.localStorage.setItem('userName', username)
    window.localStorage.setItem('userAvatar', avatar)
    return {
        type: constants.UPDATE_USER,
        username,
        avatar
    }
}
export const logoutUser = () => {
    window.localStorage.clear()
    window.localStorage.setItem('userNightMode', false)
    return {
        type: constants.LOGOUT_USER
    }
}
export const setUserStats = (statsData) => {
    return {
        type: constants.SET_USER_STATS,
        statsData
    }
}
export const increaseUserStats = () => {
    return {
        type: constants.INCREASE_USER_STATS
    }
}
export const decreaseUserStats = () => {
    return {
        type: constants.DECREASE_USER_STATS
    }
}


// uiSwitchers
export const toggleDrawer = (mode) => {
    return {
        type: constants.TOGGLE_DRAWER,
        mode
    }
}
export const toggleNightMode = (mode) => {
    window.localStorage.setItem('userNightMode', mode);
    return {
        type: constants.TOGGLE_NIGHT_MODE,
        mode
    }
}
export const toggleNotFound = (mode) => {
    return {
        type: constants.TOGGLE_NOT_FOUND,
        mode
    }
}

// notifications
export const toggleNotify = (mode) => {
    window.localStorage.setItem('userNotify', mode);
    return {
        type: constants.TOGGLE_NOTIFY,
        mode
    }
}
export const createNotification = (text) => {
    return {
        type: constants.CREATE_NOTIFICATION,
        text
    }
}

// flashMessages
export const createFlashMessage = (text, status = 'notice') => {
    return {
        type: constants.CREATE_FLASH_MESSAGE,
        text,
        status
    }
}
export const deleteFlashMessage = (index) => {
    return {
        type: constants.DELETE_FLASH_MESSAGE,
        index
    }
}
