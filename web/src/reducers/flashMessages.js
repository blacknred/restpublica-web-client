import constants from '../constants'

const initialState = {
    messages: []
}

const flashMessages = (state = initialState, action) => {
    switch (action.type) {
        case constants.CREATE_FLASH_MESSAGE:
            return {
                messages: [
                    ...state.messages,
                    {
                        text: action.text,
                        status: action.status
                    }
                ]
            }
        case constants.DELETE_FLASH_MESSAGE:
            if (action.index > 0) {
                return {
                    messages: [
                        ...state.messages.slice(0, action.index),
                        ...state.messages.slice(action.index + 1)
                    ]
                }
            } else {
                return {
                    messages: [
                        ...state.messages.slice(action.index + 1)
                    ]
                }
            }
        default:
            return state
    }
}

export default flashMessages