import constants from '../constants/index.js'

const initialState = () => {
    if (window.localStorage.getItem('token')) {
        const { id, username, avatar, feedrand } = window.localStorage;
        return {
            isAuthenticated: true,
            feedRand: feedrand,
            id,
            username,
            avatar,
            stats: {
                postsCnt: 0,
                followersCnt: 0,
                followinCnt: 0
            }
        }
    }
    return {
        isAuthenticated: false
    }
}

const authentication = (state = initialState(), action) => {
    switch (action.type) {
        case constants.AUTH_USER:
            return {
                ...action.userData,
                isAuthenticated: true,
                
            }
        case constants.UPDATE_USER:
            return {
                ...state,
                ...action.userData
            }
        case constants.LOGOUT_USER:
            return {
                isAuthenticated: false
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