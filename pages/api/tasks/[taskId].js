import TaskModel from '../../../models/taskModel'
import connectDatabase from '../../../helpers/db/connectDatabase'

async function getTask(req, res) {
    const { taskId } = req.query

    try {
        await connectDatabase()
        const task = await TaskModel.findById(taskId)

        res.status(200).json({
            status: 'success',
            data: {
                task,
            },
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err.message,
            message: 'Failed to get task!',
        })
    }
}

async function updateTask(req, res) {
    const { taskId } = req.query
    const { isCompleted, status, text } = req.body

    try {
        await connectDatabase()
        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            {
                isCompleted,
                status,
                text,
            },
            {
                new: true,
                runValidators: true,
            }
        )

        res.status(200).json({
            status: 'success',
            data: {
                task: updatedTask,
            },
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err.message,
            message: 'Failed to update task!',
        })
    }
}

async function deleteTask(req, res) {
    const { taskId } = req.query

    try {
        await connectDatabase()
        await TaskModel.findByIdAndDelete(taskId)

        res.status(204).json({
            status: 'success',
            data: null,
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to delete task',
            error: err.message,
        })
    }
}

function handler(req, res) {
    if (req.method === 'GET') return getTask(req, res)
    if (req.method === 'PATCH') return updateTask(req, res)
    if (req.method === 'DELETE') return deleteTask(req, res)
}

export default handler
