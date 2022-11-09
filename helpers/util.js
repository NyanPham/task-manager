export function formatDate(date) {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        day: 'numeric',
        month: 'long',
    })
}

export function getTaskSectionsFromTasks(tasks) {
    return tasks.reduce((sections, task) => {
        const processedDate = formatDate(task.date)

        const section = sections.find(
            (section) => formatDate(section.date) === processedDate
        )

        if (section) {
            section.tasks.push({
                isCompleted: task.isCompleted,
                status: task.status,
                text: task.text,
                _id: task._id.toString(),
            })
            return sections
        } else {
            const newSection = {
                date: processedDate,
                tasks: [
                    {
                        isCompleted: task.isCompleted,
                        status: task.status,
                        text: task.text,
                        _id: task._id.toString(),
                    },
                ],
            }
            sections.push(newSection)
            return sections
        }
    }, [])
}
