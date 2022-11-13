import { useRouter } from 'next/router'
import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const inititalState = {
    isLoading: false,
    title: '',
    status: '',
    message: '',
    showAlert: false,
    tasks: [],
    currentUser: {
        email: '',
        name: '',
        photo: '',
    },
}

function ContextProvider({ children }) {
    const router = useRouter()
    const [state, setState] = useState(inititalState)

    function handleRouteChange() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser.email === state.currentUser.email) return

        getUserInfo(currentUser)
    }

    useEffect(() => {
        router.events.on('routeChangeComplete', handleRouteChange)
        const storedUser = JSON.parse(localStorage.getItem('currentUser'))

        if (storedUser) {
            getUserInfo(storedUser)
        }

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [])

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

    const getUserInfo = ({ email, name, photo }) => {
        setState((prevState) => ({
            ...prevState,
            currentUser: { email, name, photo },
        }))
    }

    const setAlertLoading = (boolean) => {
        setState((prevState) => ({
            ...prevState,
            isLoading: boolean,
        }))
    }

    const setAlertContent = ({ title, message, status }) => {
        setState((prevState) => ({
            ...prevState,
            title,
            message,
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
                setAlertContent,
                setShowAlert,
                setContextTasks,
                getUserInfo,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default ContextProvider
