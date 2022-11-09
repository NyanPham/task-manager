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
            return {}

        case CREATE_TASK:
            return {}

        case GET_TASK:
            return {}

        case UPDATE_TASK:
            return {}

        case DELETE_TASK:
            return {}
        default:
            return state
    }
}

export default taskReducer
