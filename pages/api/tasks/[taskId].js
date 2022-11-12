import { ObjectId } from 'mongodb'
import nextConnect from 'next-connect'
import middleware from '../../../helpers/db/connectDatabase'

const handler = nextConnect()
handler.use(middleware)

handler.patch(updateTask)

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

    console.log(taskId)
    console.log(text)
    console.log(isCompleted)
    console.log(status)

    try {
        const taskToUpdate = await req.db
            .collection('tasks')
            .findOneAndUpdate(
                { _id: new ObjectId(taskId) },
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
