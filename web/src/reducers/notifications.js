import constants from '../constants/index.js'

const initialState = () => {
    if (window.localStorage.getItem('token')) {
        const { isnotify } = window.localStorage;
        return {
            isNotify: isnotify === 'true',
            notificationsList: [
                {
                   date: Date.now(),
                   text: 'notification' 
                },
                {
                    date: Date.now(),
                    text: 'secondary notification' 
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
        case constants.SWITCH_NOTIFY:
            return {
                ...state,
                isNotify: action.mode,              
            }
        default:
            return state
    }
}

export default notifications

