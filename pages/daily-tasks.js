import { useState } from 'react'
import SectionHeader from '../components/Main/section-header'
import AddTaskButton from '../components/Tasks/add-task-button'
import TaskSection from '../components/Tasks/task-section'
import { fetchTasks } from './api/tasks'
import axios from 'axios'
import { getTaskSectionsFromTasks } from '../helpers/util'
import { useTaskContext } from '../context/taskContext'

const DailyTasksPage = ({ taskSections }) => {
    const [sections, setSections] = useState(taskSections)

    async function handleDeleteCompletedTasks(date) {
        let completedTasks = []
        try {
            const res = await axios('/api/tasks/completed-tasks', {
                method: 'POST',
                data: {
                    date,
                },
            })

            if (res.data.status === 'success') {
                completedTasks = res.data.data.tasks
            }
            //todo
        } catch (err) {
            console.log(err)
            //todo
        }

        if (completedTasks.length === 0) return

        try {
            const res = await Promise.all(
                completedTasks.map(
                    async (task) =>
                        await axios(`/api/tasks/${task._id}`, {
                            method: 'DELETE',
                        })
                )
            )
            //todo
        } catch (err) {
            console.log(err)
            //todo
        }

        setSections((currentSections) =>
            currentSections.map((section) => {
                if (section.date !== date) return section

                return {
                    ...section,
                    tasks: section.tasks.filter((task) => !task.isCompleted),
                }
            })
        )
    }

    return (
        <div>
            <SectionHeader
                title="Daily Tasks"
                description="Here are the list of your tasks. Don not forget to complete all tasks today."
            />
            <section className="space-y-7 pr-4 overflow-auto max-h-25rem scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                {sections.map((taskSectionData, index) => {
                    return (
                        <TaskSection
                            key={`task_section_${index}`}
                            date={taskSectionData.date}
                            tasks={taskSectionData.tasks}
                            onDeleteCompletedTasks={handleDeleteCompletedTasks}
                        />
                    )
                })}
            </section>
            <AddTaskButton />
        </div>
    )
}

export async function getServerSideProps() {
    const tasks = await fetchTasks({})

    const taskSections = getTaskSectionsFromTasks(tasks)

    return {
        props: {
            taskSections,
        },
    }
}

export default DailyTasksPage
