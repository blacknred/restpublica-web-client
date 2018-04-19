import constants from '../constants'

// authentication
export const authUser = (userData) => {
    const { id, username, token, avatar, feed_rand } = userData
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('id', id)
    window.localStorage.setItem('username', username)
    window.localStorage.setItem('avatar', avatar)
    window.localStorage.setItem('feedrand', feed_rand)
    window.localStorage.setItem('isnotify', true)
    window.localStorage.setItem('isnightmode', false)
    window.localStorage.setItem('isautogifs', true)
    window.localStorage.setItem('isfeedonecollumn', true)
    return {
        type: constants.AUTH_USER,
        userData: {
            id,
            username,
            avatar,
            feedRand: feed_rand
        }
    }
}
export const updateUser = (userData) => {
    if (userData.username) {
        window.localStorage.setItem('username', userData.username)
    }
    if (userData.avatar) {
        window.localStorage.setItem('avatar', userData.avatar)
    }
    if (userData.feed_rand) {
        window.localStorage.setItem('feedrand', userData.feed_rand)
        userData.feedRand = userData.feed_rand
        delete userData.feed_rand
    }
    return {
        type: constants.UPDATE_USER,
        userData
    }
}
export const logoutUser = () => {
    window.localStorage.clear()
    window.localStorage.setItem('isnightmode', false)
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
export const toggleLoader = (mode) => {
    return {
        type: constants.TOGGLE_LOADER,
        mode
    }
}
export const toggleNightMode = (mode) => {
    window.localStorage.setItem('isnightmode', mode);
    return {
        type: constants.TOGGLE_NIGHT_MODE,
        mode
    }
}
export const toggleAutoGifs = (mode) => {
    window.localStorage.setItem('isautogifs', mode);
    return {
        type: constants.TOGGLE_AUTO_GIFS,
        mode
    }
}
export const toggleFeedOneColumn = (mode) => {
    window.localStorage.setItem('isfeedonecolumn', mode);
    return {
        type: constants.TOGGLE_FEED_ONE_COLUMN,
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
    window.localStorage.setItem('isnotify', mode);
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
