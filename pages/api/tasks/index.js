import middleware from '../../../helpers/db/connectDatabase'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.use(middleware)

handler.get(getAllTasks)
handler.post(createTask)

async function getAllTasks(req, res) {
    try {
        const tasks = await req.db.collection('tasks').find().toArray()

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
            message: 'Failed to get all tasks!',
        })
    }
}

async function createTask(req, res) {
    const { text, date } = req.body

    if (text.trim() === '' || text === '' || !date) {
        return res.status(422).json({
            status: 'fail',
            message: 'Invalid Inputs',
        })
    }

    try {
        let newTask = {
            date: new Date(date),
            text,
            isCompleted: false,
            status: 'waiting',
        }

        let createdTask = await req.db.collection('tasks').insertOne(newTask)

        newTask = { ...newTask, _id: createdTask.insertedId }

        res.status(201).json({
            status: 'success',
            data: {
                task: newTask,
            },
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to create task',
        })
    }
}

export default handler
