import constants from '../constants/index.js'

const initialState = () => {
    if (window.localStorage.getItem('authToken')) {
        const { userNotify } = window.localStorage;
        return {
            isNotify: userNotify === 'true',
            notificationsList: [
                {
                   date: Date.now(),
                   text: 'notify' 
                }
                
            ]
        }
    }
    return {
        isNotify: true,
        notificationsList: []
    }
}

const notifications = (state = initialState(), action) => {
    switch (action.type) {
        case constants.CREATE_NOTIFICATION:
            return {
                ...state,
                notificationsLists: [
                    ...state.notificationsList,
                    {
                        date: Date.now(),
                        text: action.text,
                    }
                ]
            }
        case constants.TOGGLE_NOTIFY:
            return {
                ...state,
                isNotify: action.mode,              
            }
        default:
            return state
    }
}

export default notifications

