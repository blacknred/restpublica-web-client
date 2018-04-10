import constants from '../constants/index.js'

const initialState = () => {
    const { token, isnightmode, isautogifs, isfeedonecolumn } = window.localStorage;
    if (token) {
        return {
            isDrawer: true,
            isNotFound: false,
            isNightMode: isnightmode === 'true',
            isAutoGifs: isautogifs === 'true',
            isFeedOneColumn: isfeedonecolumn === 'true'
        }
    }
    return {
        isDrawer: false,
        isNotFound: false,
        isNightMode: false,
        isAutoGifs: true,
        isFeedOneColumn: true
    }
}


const uiSwitchers = (state = initialState(), action) => {
    switch (action.type) {
        case constants.TOGGLE_DRAWER:
            return { ...state, isDrawer: action.mode }
        case constants.TOGGLE_NIGHT_MODE:
            return { ...state, isNightMode: action.mode }
        case constants.TOGGLE_AUTO_GIFS:
            return { ...state, isAutoGifs: action.mode }
        case constants.TOGGLE_FEED_ONE_COLUMN:
            return { ...state, isFeedOneColumn: action.mode }
        case constants.TOGGLE_NOT_FOUND:
            return { ...state, isNotFound: action.mode }
        default:
            return state
    }
}

export default uiSwitchers
