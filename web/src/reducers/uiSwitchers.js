import constants from '../constants/index.js'

const initialState = () => {
    if (window.localStorage.getItem('authToken')) {
        const { userNightMode } = window.localStorage;
        return {
            isDrawer: true,
            isNightMode: userNightMode === 'true',
            isNotFound: false
        }
    }
    return {
        isDrawer: false,
        isNightMode: false,
        isNotFound: false
    }
}


const uiSwitchers = (state = initialState(), action) => {
    switch (action.type) {
        case constants.TOGGLE_DRAWER:
            return { ...state, isDrawer: action.mode }
        case constants.TOGGLE_NIGHT_MODE:
            return { ...state, isNightMode: action.mode }
        case constants.TOGGLE_NOT_FOUND:
            return { ...state, isNotFound: action.mode }
        default:
            return state
    }
}

export default uiSwitchers
