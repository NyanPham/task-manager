import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        max: [50, 'A task can have at most 50 characters'],
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: {
            values: ['approved', 'in-progress', 'in-review', 'waiting'],
            message:
                'A task status must be either approved, in-progress, in-review or waiting',
        },
        default: 'waiting',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
})

const Task = mongoose.models['Task']
    ? mongoose.model('Task')
    : mongoose.model('Task', taskSchema)

export default Task
