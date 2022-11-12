import nextConnect from 'next-connect'
import middleware from '../../../helpers/db/connectDatabase'
import {
    comparePassword,
    createAuthToken,
    sendTokenWithCookie,
} from '../../../helpers/util'

const handler = nextConnect()

handler.use(middleware)

handler.post(login)

async function login(req, res) {
    const { email, password } = req.body

    if (!email || !email.includes('@') || !password || password.length < 6) {
        return res.status(422).json({
            status: 'fail',
            message: 'Please provide account email and password',
        })
    }

    try {
        const user = await req.db.collection('users').findOne({ email })
        const isCorrectPassword = await comparePassword(
            password,
            user?.password
        )

        if (!user || !isCorrectPassword) {
            return res.status(403).json({
                status: 'fail',
                message: 'Incorrect Email or Password!',
            })
        }

        const token = createAuthToken(user)
        sendTokenWithCookie(token, req, res)

        res.status(201).json({
            status: 'success',
            message: 'Account created',
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Failed to sign in!',
        })
    }
}

export default handler
