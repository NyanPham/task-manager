import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const inititalState = {
    isLoading: false,
    title: '',
    status: '',
    message: '',
    showAlert: false,
    tasks: [],
}

function ContextProvider({ children }) {
    const [state, setState] = useState(inititalState)

    const firstLoadTasks = (loadedTasks) => {
        setState((prevState) => ({
            ...prevState,
            tasks: loadedTasks,
        }))
    }

    const addTask = (newTask) => {
        setState((prevState) => ({
            ...prevState,
            tasks: [...prevState.tasks, newTask],
        }))
    }

    const updateTask = ({ taskId, isCompleted, status, text }) => {
        setState((prevState) => ({
            ...prevState,
            tasks: prevState.tasks.map((task) => {
                if (task._id === taskId)
                    return { ...task, isCompleted, status, text }

                return task
            }),
        }))
    }

    const deleteCompletedTasks = (date) => {
        const currentDate = date.getTime()
        const nextDate = new Date(
            new Date(date).setDate(date.getDate() + 1)
        ).getTime()

        setState((prevState) => ({
            ...prevState,
            tasks: prevState.tasks.filter((task) => {
                const taskDate = new Date(task.date).getTime()

                return (
                    taskDate < currentDate ||
                    taskDate >= nextDate ||
                    !task.isCompleted
                )
            }),
        }))
    }

    const setAlertLoading = (boolean) => {
        setState((prevState) => ({
            ...prevState,
            loading: boolean,
        }))
    }

    const setAlertTitle = (title) => {
        setState((prevState) => ({
            ...prevState,
            title: title,
        }))
    }

    const setAlertMessage = (message) => {
        setState((prevState) => ({
            ...prevState,
            message,
        }))
    }

    const setAlertStatus = (status) => {
        setState((prevState) => ({
            ...prevState,
            status,
        }))
    }

    const setShowAlert = (boolean) => {
        setState((prevState) => ({
            ...prevState,
            showAlert: boolean,
        }))
    }

    const setContextTasks = (tasks) => {
        setState((prevState) => ({
            ...prevState,
            tasks,
        }))
    }

    return (
        <AppContext.Provider
            value={{
                state,
                firstLoadTasks,
                addTask,
                updateTask,
                deleteCompletedTasks,
                setAlertLoading,
                setAlertTitle,
                setAlertMessage,
                setShowAlert,
                setAlertStatus,
                setContextTasks,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default ContextProvider
