import SectionHeader from '../components/Main/section-header'
import AddTaskButton from '../components/Tasks/add-task-button'
import TaskSection from '../components/Tasks/task-section'

const DUMMY_DATA = [
    {
        date: '2022-11-06',
        tasks: [
            {
                text: "Complete this right now or I'll kill you!",
                isCompleted: false,
                status: 'in-progress',
            },
            {
                text: 'Just a second task',
                isCompleted: true,
                status: 'approved',
            },
            {
                text: "Complete this right now or I'll kill you!",
                isCompleted: false,
                status: 'in-review',
            },
            {
                text: 'Just a second task',
                isCompleted: true,
                status: 'waiting',
            },
        ],
    },
    {
        date: '2022-11-05',
        tasks: [
            {
                text: 'Just a second task',
                isCompleted: true,
                status: 'approved',
            },
            {
                text: 'Just a second task',
                isCompleted: true,
                status: 'waiting',
            },
            {
                text: "Complete this right now or I'll kill you!",
                isCompleted: false,
                status: 'in-progress',
            },
            {
                text: "Complete this right now or I'll kill you!",
                isCompleted: false,
                status: 'in-review',
            },
        ],
    },
    {
        date: '2022-11-04',
        tasks: [
            {
                text: 'Just a second task',
                isCompleted: true,
                status: 'approved',
            },
            {
                text: 'Just a second task',
                isCompleted: true,
                status: 'waiting',
            },
            {
                text: "Complete this right now or I'll kill you!",
                isCompleted: false,
                status: 'in-progress',
            },
            {
                text: "Complete this right now or I'll kill you!",
                isCompleted: false,
                status: 'in-review',
            },
        ],
    },
]

const DailyTasksPage = () => {
    return (
        <div>
            <SectionHeader
                title="Daily Tasks"
                description="Here are the list of your tasks. Don not forget to complete all tasks today."
            />
            <section className="space-y-7 pr-4 overflow-auto max-h-25rem scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                {DUMMY_DATA.map((taskSectionData, index) => {
                    return (
                        <TaskSection
                            key={`task_section${index}`}
                            date={taskSectionData.date}
                            tasks={taskSectionData.tasks}
                        />
                    )
                })}
            </section>
            <AddTaskButton />
        </div>
    )
}

export default DailyTasksPage
