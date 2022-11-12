import nextConnect from 'next-connect'
import middleware from '../../../helpers/db/connectDatabase'
import { hashPassword } from '../../../helpers/util'

const handler = nextConnect()

handler.use(middleware)

handler.post(signUp)

async function signUp(req, res) {
    const { email, password, passwordConfirm } = req.body

    if (!email || !email.includes('@') || !password || password.length < 6) {
        return res.status(422).json({
            status: 'fail',
            message: 'Please provide account email and password',
        })
    }

    if (password !== passwordConfirm) {
        return res.status(422).json({
            status: 'fail',
            message: 'Passwords do not match',
        })
    }

    try {
        const existingUser = await req.db.collection('users').findOne({ email })
        if (existingUser) {
            return res.status(422).json({
                status: 'fail',
                message: 'User with that email has already existed',
            })
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await req.db.collection('users').insertOne({
            name: '',
            email,
            password: hashedPassword,
            tasks: [],
        })

        res.status(201).json({
            status: 'success',
            message: 'Account created',
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to create account!',
        })
    }
}

export default handler
