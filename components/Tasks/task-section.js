import { faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { useAppContext } from '../../context/context'
import Task from './task'

const TaskSection = ({ date, tasks }) => {
    const { deleteCompletedTasks } = useAppContext()

    const [openOptions, setOpenOptions] = useState(false)

    const optionsElipsisClasses = openOptions
        ? 'opacity-1 pointer-events-auto'
        : 'opacity-0 pointer-events-none'

    async function handleDeleteClick(e) {
        e.stopPropagation()

        const confirmed = window.confirm(
            `Are you sure to delete completed tasks on ${date}?`
        )

        if (!confirmed) return

        await axios.delete(
            `http://localhost:3000/api/tasks/completed-tasks/${new Date(
                date
            ).getTime()}`
        )

        deleteCompletedTasks(new Date(date))

        setOpenOptions(false)
    }

    return (
        <div className="pb-3">
            <div className="pb-2 flex justify-between items-center border-b border-gray-900/10">
                <time className="text-lg text-gray-600 font-semibold">
                    {date}
                </time>
                <div
                    className="cursor-pointer relative"
                    onClick={() =>
                        setOpenOptions((prevOpenOptions) => !prevOpenOptions)
                    }
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                    <div
                        className={`absolute top-full right-0 bg-gray-50 shadow-lg ${optionsElipsisClasses}`}
                    >
                        <button
                            className="flex flex-row p-3 w-max items-center gap-2 text-red-400 group"
                            type="button"
                            onClick={handleDeleteClick}
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="text-red-400 transition transform group-hover:text-red-500 group-hover:scale-105"
                            />
                            Delete completed tasks
                        </button>
                    </div>
                </div>
            </div>
            <ul className="space-y-3 mt-4">
                {tasks.map((task, index) => (
                    <Task key={`${task._id}_${index}`} task={task} />
                ))}
            </ul>
        </div>
    )
}

export default TaskSection
