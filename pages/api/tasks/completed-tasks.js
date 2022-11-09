import TaskModel from '../../../models/taskModel'
import connectDatabase from '../../../helpers/db/connectDatabase'

async function handler(req, res) {
    if (req.method !== 'POST') return

    const { date } = req.body

    if (!date) {
        return res.status(422).json({
            status: 'fail',
            message: 'Please provide a computed date!',
        })
    }

    try {
        await connectDatabase()

        const currentDate = new Date(date)
        const nextDate = new Date(
            new Date(date).setDate(currentDate.getDate() + 1)
        )

        const tasks = await TaskModel.find({
            date: {
                $lt: nextDate,
                $gt: currentDate,
            },
            isCompleted: true,
        })

        res.status(200).json({
            status: 'success',
            data: {
                tasks,
            },
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to get tasks by date',
            error: err.message,
        })
    }
}

export default handler
