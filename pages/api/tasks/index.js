import mongoose from 'mongoose'
import TaskModel from '../../../models/taskModel'
import connectDatabase from '../../../helpers/db/connectDatabase'

export async function fetchTasks(filter = {}) {
    await connectDatabase()
    const tasks = await TaskModel.find(filter)

    return tasks
}

export async function getAllTasks(req, res) {
    try {
        const tasks = await fetchTasks()

        res.status(200).json({
            status: 'success',
            results: tasks.length,
            data: {
                tasks,
            },
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to work with database',
            error: err.message,
        })
    } finally {
        mongoose.disconnect()
    }
}

async function createTask(req, res) {
    const { text, date } = req.body

    if (!text || !date) {
        res.status(422).json({
            status: 'fail',
            message: 'Invalid Input',
        })
    }

    try {
        await connectDatabase()
        const newTask = await TaskModel.create({ text, date })

        res.status(200).json({
            status: 'success',
            data: {
                task: newTask,
            },
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to add task',
            error: err.message,
        })
    } finally {
        mongoose.disconnect()
    }
}

function handler(req, res) {
    if (req.method === 'GET') return getAllTasks(req, res)
    if (req.method === 'POST') createTask(req, res)
}

export default handler
