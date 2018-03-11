import constants from '../constants/index.js'

const initialState = () => {
    if (window.localStorage.getItem('authToken')) {
        const { userId, userName, userAvatar } = window.localStorage;
        return {
            isAuthenticated: true,
            user: {
                id: userId,
                name: userName,
                avatar: userAvatar
            },
            stats: {
                posts: 0,
                followers: 0,
                followin: 0
            }
        }
    }
    return {
        isAuthenticated: false,
        user: {},
        stats: {}
    }
}

const authentication = (state = initialState(), action) => {
    switch (action.type) {
        case constants.AUTH_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    id: action.id,
                    name: action.username,
                    avatar: action.avatar
                }
            }
        case constants.UPDATE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.username,
                    avatar: action.avatar
                }
            }
        case constants.LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            }
        case constants.SET_USER_STATS:
            return {
                ...state,
                stats: action.statsData
            }
        case constants.INCREASE_USER_STATS:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    followin: state.stats.followin + 1
                }
            }
        case constants.DECREASE_USER_STATS:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    followin: state.stats.followin - 1
                }
            }
        default:
            return state
    }
}

export default authentication