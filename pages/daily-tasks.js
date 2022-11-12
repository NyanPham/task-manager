import axios from 'axios'
import { useEffect } from 'react'
import Layout from '../components/layout'
import SectionHeader from '../components/Main/section-header'
import AddTaskButton from '../components/Tasks/add-task-button'
import TaskSection from '../components/Tasks/task-section'
import { useAppContext } from '../context/context'
import { getTaskSectionsFromTasks } from '../helpers/util'

const DailyTasksPage = (props) => {
    const { state, firstLoadTasks } = useAppContext()

    const taskSections = getTaskSectionsFromTasks(
        state.tasks.length > 0 ? state.tasks : props.tasks
    )

    useEffect(() => {
        firstLoadTasks(props.tasks)
    }, [])

    return (
        <Layout>
            <div>
                <SectionHeader
                    title="Daily Tasks"
                    description="Here are the list of your tasks. Don not forget to complete all tasks today."
                />
                <section className="space-y-7 pr-4 overflow-auto max-h-25rem scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                    {taskSections.map((taskSectionData, index) => {
                        return (
                            <TaskSection
                                key={`task_section_${index}_${taskSectionData.date}`}
                                date={taskSectionData.date}
                                tasks={taskSectionData.tasks}
                            />
                        )
                    })}
                </section>

                <AddTaskButton />
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await axios.get('http://localhost:3000/api/tasks')
    const tasks = res.data.data.tasks

    return {
        props: {
            tasks,
        },
    }
}

export default DailyTasksPage
