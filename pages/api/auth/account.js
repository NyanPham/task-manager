import nextConnect from 'next-connect'
import middleware from '../../../helpers/db/connectDatabase'
import protect from '../../../middlewares/protect'

const handler = nextConnect()
handler.use(middleware)

handler.get(protect, getAccount)

async function getAccount(req, res) {
    console.log('user: ', req.user)
    const user = await req.db
        .collection('users')
        .findOne({ email: req.user.email })

    res.status(200).json({
        status: 'success',
        data: {
            user: {
                name: user.name,
                email: user.email,
            },
        },
    })
}

export default handler
