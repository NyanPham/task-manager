import React from 'react'
import Task from './task'

const TaskSection = ({ date, tasks }) => {
    return (
        <div className="">
            <div className="pb-2 flex justify-between items-center border-b border-gray-900/10">
                <time className="text-lg text-gray-600 font-semibold">
                    {date}
                </time>
                <span className="cursor-pointer">...</span>
            </div>
            <ul className="space-y-3 mt-4">
                {tasks &&
                    tasks.map((task, index) => (
                        <Task key={`${date}_${index}`} task={task} />
                    ))}
            </ul>
        </div>
    )
}

export default TaskSection
