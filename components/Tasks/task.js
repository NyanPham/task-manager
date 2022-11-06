import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const STATUS = ['approved', 'in-progress', 'in-review', 'waiting']

function getStatusText(status) {
    return status.replace(/-/, ' ')
}

function getStatusColor(status) {
    switch (status) {
        case 'approved':
            return {
                textColor: 'text-teal-500',
                bgColor: 'bg-teal-300',
                ringColor: 'focus:ring-teal-500',
            }
        case 'in-progress':
            return {
                textColor: 'text-sky-600',
                bgColor: 'bg-sky-400',
                ringColor: 'focus:ring-sky-600',
            }
        case 'in-review':
            return {
                textColor: 'text-red-400',
                bgColor: 'bg-red-200',
                ringColor: 'focus:ring-red-400',
            }
        case 'waiting':
            return {
                textColor: 'text-gray-800',
                bgColor: 'bg-gray-500',
                ringColor: 'focus:ring-gray-800',
            }
    }
}

const Task = ({ task }) => {
    const { isCompleted, text, status } = task
    const [selectedStatus, setSelectedStatus] = useState(status)

    const completeClass = isCompleted
        ? 'w-6 h-6 border border-teal-300 bg-teal-300 rounded-full flex items-center justify-center cursor-pointer'
        : 'w-6 h-6 border border-gray-400 rounded-full cursor-pointer'

    const { ringColor, bgColor, textColor } = getStatusColor(selectedStatus)

    return (
        <li className="flex gap-4">
            <div className={completeClass}>
                {isCompleted && (
                    <FontAwesomeIcon
                        icon={faCheck}
                        className="text-white w-2/3"
                    />
                )}
            </div>
            <div className="grow text-gray-600 font-medium text-base">
                {text}
            </div>
            <select
                className={`w-24 h-7 text-center flex items-center justify-center text-xs capitalize outline-none rounded-2xl appearance-none cursor-pointer transition duration-200 ${bgColor} ${textColor} focus:ring focus:ring-offset-1 ${ringColor}`}
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
