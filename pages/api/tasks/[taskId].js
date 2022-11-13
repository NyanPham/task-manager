import { ObjectId } from 'mongodb'
import nextConnect from 'next-connect'
import middleware from '../../../helpers/db/connectDatabase'
import { protect } from '../../../middlewares/protect'

const handler = nextConnect()
handler.use(middleware)

handler.patch(protect, updateTask)

async function updateTask(req, res) {
    const { taskId } = req.query
    const { isCompleted, status, text } = req.body

    if (
        text.trim() === '' ||
        text === '' ||
        !status ||
        isCompleted == null ||
        !taskId
    ) {
        return res.status(422).json({
            status: 'fail',
            message: 'Invalid Inputs',
        })
    }

    try {
        const taskToUpdate = await req.db
            .collection('tasks')
            .findOneAndUpdate(
                { _id: new ObjectId(taskId), user: req.user._id.toString() },
                { $set: { text, isCompleted, status } }
            )

        res.status(200).json({
            status: 'success',
            data: {
                task: taskToUpdate,
            },
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to update task',
        })
    }
}

export default handler
