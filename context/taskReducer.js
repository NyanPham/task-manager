import {
    CREATE_TASK,
    GET_ALL_TASKS,
    GET_TASK,
    UPDATE_TASK,
    DELETE_TASK,
} from './actions'

const taskReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_ALL_TASKS:
            return state

        case CREATE_TASK:
            return state

        case GET_TASK:
            return state

        case UPDATE_TASK:
            return state

        case DELETE_TASK:
            return state
        default:
            return state
    }
}

export default taskReducer
