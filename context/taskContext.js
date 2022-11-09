import { useContext, createContext, useReducer, useState } from 'react'
import { getTaskSectionsFromTasks } from '../helpers/util'
import { fetchTasks } from '../pages/api/tasks'
import taskReducer from './taskReducer'

const TaskContext = createContext()

export const useTaskContext = () => useContext(TaskContext)

const initialState = {
    tasks: [],
}

const TaskContextProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState)

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider
