import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { changedPasswordAfter } from '../helpers/util'

export async function protect(req, res, next) {
    try {
        let token

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt
        }

        if (!token) {
            return res.status(403).json({
                status: 'fail',
                message: 'You have not logged in.',
            })
        }

        const decodedData = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        )

        const currentUser = await req.db
            .collection('users')
            .findOne({ _id: new ObjectId(decodedData.id) })

        if (!currentUser) {
            return res.status(403).json({
                status: 'fail',
                message:
                    'The user with that token has no longer exists. Please login again!',
            })
        }

        if (
            changedPasswordAfter(currentUser.passwordChangedAt, decodedData.iat)
        ) {
            return res.status(403).json({
                status: 'fail',
                message: 'Password has been changed. Please log in again!',
            })
        }

        req.user = currentUser
        delete req.user.password

        next()
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Something went wrong during authentication process',
            error: err.message,
        })
    }
}
