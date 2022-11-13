import axios from 'axios'
import { useRef, useState } from 'react'
import { useAppContext } from '../../context/context'

function AddTaskButton() {
    const { addTask, setAlertContent, setAlertLoading, setShowAlert } =
        useAppContext()
    const [openModal, setOpenModal] = useState()

    const modalRef = useRef()
    const formRef = useRef()

    const taskTextRef = useRef()
    const dateRef = useRef()

    function openAddForm() {
        modalRef.current.showModal()
        setOpenModal(true)
    }

    function handleDialogClick(e) {
        if (formRef.current.contains(e.target)) return
        modalRef.current.close()
        setOpenModal(false)
    }

    async function handleAddForm(e) {
        e.preventDefault()

        const date = dateRef.current.value
        const text = taskTextRef.current.value

        if (!date || !text) return

        try {
            setAlertLoading(true)
            setAlertContent({
                title: 'Add a task',
                message: 'The task is being added',
                status: 'loading',
            })
            setShowAlert(true)
            const res = await axios.post('/api/tasks', {
                date,
                text,
            })

            if (res.data.status === 'success') {
                addTask(res.data.data.task)

                setAlertLoading(false)
                setAlertContent({
                    title: 'Add a task',
                    message: 'The task is added successfully',
                    status: 'success',
                })
                setShowAlert(true)
            }
        } catch (err) {
            setAlertLoading(false)
            setAlertContent({
                title: 'Add a task',
                message: 'Failed to add task',
                status: 'fail',
            })
            setShowAlert(true)
        }

        modalRef.current.close()
    }

    return (
        <>
            <button
                type="button"
                className="w-12 h-12 rounded-xl bg-purple-600 fixed right-10 bottom-10 text-3xl text-white hover:bg-purple-500 hover:shadow-lg active:bg-purple-700 duration-300 transition-all transform"
                onClick={openAddForm}
            >
                +
            </button>
            <dialog
                ref={modalRef}
                onClick={handleDialogClick}
                className={`modal p-0 ${
                    openModal
                        ? 'opacity-100 pointer-events-auto transition duration-500 backdrop:opacity-100 backdrop:transition backdrop:duration-500'
                        : 'opacity-0 pointer-events-none transition duration-500 backdrop:opacity-0 backdrop:transition backdrop:duration-500'
                }`}
            >
                <div ref={formRef} className="py-4 px-6">
                    <h2 className="form-title">Add a task</h2>
                    <form onSubmit={handleAddForm} className="form">
                        <fieldset className="form-group">
                            <label htmlFor="task" className="form-label">
                                Task
                            </label>
                            <input
                                type="text"
                                id="task"
                                className="form-input"
                                ref={taskTextRef}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <label htmlFor="date" className="form-label">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                className="form-input"
                                ref={dateRef}
                            />
                        </fieldset>
                        <button className="form-button" type="submit">
                            Add Task
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default AddTaskButton
