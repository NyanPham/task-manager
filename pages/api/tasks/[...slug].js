import nextConnect from 'next-connect'
import middleware from '../../../helpers/db/connectDatabase'

const handler = nextConnect()
handler.use(middleware)

handler.delete(deleteCompletedTasks)

async function deleteCompletedTasks(req, res) {
    const [completedTaskSlug, dateString] = req.query.slug

    if (completedTaskSlug !== 'completed-tasks') {
        return res.status(400).json({
            status: 'fail',
            message: `No path found at ${completedTaskSlug}`,
        })
    }

    const date = new Date(Number(dateString))
    const nextDate = new Date(
        new Date(Number(dateString)).setDate(date.getDate() + 1)
    )

    try {
        await req.db.collection('tasks').deleteMany({
            date: {
                $lt: nextDate,
                $gt: date,
            },
            isCompleted: true,
        })

        res.status(204).end()
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: `Failed to delete completed tasks on`,
        })
    }

    res.status(200)
}

export default handler
