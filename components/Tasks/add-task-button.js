import { useState, useRef } from 'react'
import Card from '../Card'

function AddTaskButton() {
    // const [openAddForm, setOpenAddForm] = useState(false)
    const modalRef = useRef()
    const formRef = useRef()

    function openAddForm() {
        modalRef.current.showModal()
    }

    function handleDialogClick(e) {
        if (formRef.current.contains(e.target)) return
        modalRef.current.close()
    }

    function handleAddForm(e) {
        e.preventDefault()
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
                className="modal"
            >
                <h2 className="form-title">Add a task</h2>
                <form onSubmit={handleAddForm} ref={formRef} className="form">
                    <fieldset className="form-group">
                        <label htmlFor="task" className="form-label">
                            Task
                        </label>
                        <input type="text" id="task" className="form-input" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="date" className="form-label">
                            Date
                        </label>
                        <input type="date" id="date" className="form-input" />
                    </fieldset>
                    <button className="form-button" type="submit">
                        Add Task
                    </button>
                </form>
            </dialog>
        </>
    )
}

export default AddTaskButton
