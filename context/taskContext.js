import { useContext, createContext, useReducer } from 'react'
import taskReducer from './taskReducer'

const TaskContext = createContext()

export const useTaskContext = () => useContext(TaskContext)

const initialState = {
    tasks: [],
}

const TaskContextProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState)
}

export async function getServerSideProps() {}

export default TaskContextProvider
