import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from '../../context/context'
import axios from 'axios'
import useDebounce from '../../hooks/useDebounce'

const STATUS = ['approved', 'in-progress', 'in-review', 'waiting']

function getStatusText(status) {
    return status.replace(/-/, ' ')
}

function getStatusColor(status) {
    switch (status) {
        case 'approved':
            return {
                textColor: 'text-teal-600',
                bgColor: 'bg-teal-200',
                ringColor: 'focus:ring-teal-600',
            }
        case 'in-progress':
            return {
                textColor: 'text-sky-600',
                bgColor: 'bg-sky-200',
                ringColor: 'focus:ring-sky-600',
            }
        case 'in-review':
            return {
                textColor: 'text-red-500',
                bgColor: 'bg-red-200',
                ringColor: 'focus:ring-red-400',
            }
        case 'waiting':
            return {
                textColor: 'text-gray-600',
                bgColor: 'bg-gray-300',
                ringColor: 'focus:ring-gray-600',
            }
    }
}

const Task = ({ task }) => {
    const { updateTask } = useAppContext()
    const { isCompleted, text, status, _id } = task
    const [selectedStatus, setSelectedStatus] = useState(status)
    const [completed, setCompleted] = useState(isCompleted)
    const [taskText, setTaskText] = useState(text)

    const completeClass = completed
        ? 'w-6 h-6 border border-teal-300 bg-teal-300 rounded-full flex items-center justify-center cursor-pointer'
        : 'w-6 h-6 border border-gray-400 rounded-full cursor-pointer'

    const { ringColor, bgColor, textColor } = getStatusColor(selectedStatus)

    useDebounce(
        () => {
            if (
                selectedStatus === status &&
                completed === isCompleted &&
                taskText === text
            ) {
                return
            }

            const updateTaskAsync = async () => {
                const res = await axios.patch(
                    `http://localhost:3000/api/tasks/${_id}`,
                    {
                        isCompleted: completed,
                        text: taskText,
                        status: selectedStatus,
                    }
                )

                if (res.data.status === 'success') {
                    updateTask({
                        taskId: _id,
                        isCompleted: completed,
                        text: taskText,
                        status: selectedStatus,
                    })
                }
            }

            updateTaskAsync()
        },
        350,
        [selectedStatus, completed, taskText, _id, updateTask]
    )

    return (
        <li className="flex gap-4 items-center">
            <div
                className={completeClass}
                onClick={() => setCompleted((prevComplete) => !prevComplete)}
            >
                {completed && (
                    <FontAwesomeIcon
                        icon={faCheck}
                        className="text-white w-2/3"
                    />
                )}
            </div>
            <input
                className="grow text-gray-600 font-medium text-base rounded-lg transition duration-200 py-1 px-2 outline-none focus:ring focus:ring-offset-2 focus:ring-cyan-400"
                onChange={(e) => setTaskText(e.target.value)}
                value={taskText}
            />

            <select
                className={`w-24 h-7 text-center flex items-center justify-center text-xs font-medium capitalize outline-none rounded-2xl appearance-none cursor-pointer transition duration-200 ${bgColor} ${textColor} focus:ring focus:ring-offset-1 ${ringColor}`}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
            >
                {STATUS.map((status) => {
                    const { textColor, bgColor } = getStatusColor(status)

                    return (
                        <option
                            key={status}
                            className={`${textColor} ${bgColor} cursor-pointer`}
                            value={status}
                        >
                            {getStatusText(status)}
                        </option>
                    )
                })}
            </select>
        </li>
    )
}

export default Task
