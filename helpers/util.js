import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next'

export function formatDate(date) {
    let validDate = typeof date === 'string' ? new Date(date) : date

    return validDate.toLocaleString('en-US', {
        year: 'numeric',
        day: 'numeric',
        month: 'long',
    })
}

export function getTaskSectionsFromTasks(tasks) {
    return tasks.reduce((sections, task) => {
        const processedDate = formatDate(task.date)

        const section = sections.find(
            (section) => formatDate(section.date) === processedDate
        )

        if (section) {
            section.tasks.push({
                isCompleted: task.isCompleted,
                status: task.status,
                text: task.text,
                _id: task._id.toString(),
            })
            return sections
        } else {
            const newSection = {
                date: processedDate,
                tasks: [
                    {
                        isCompleted: task.isCompleted,
                        status: task.status,
                        text: task.text,
                        _id: task._id.toString(),
                    },
                ],
            }
            sections.push(newSection)
            return sections
        }
    }, [])
}

export async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 12)

    return hashedPassword
}

export async function comparePassword(candidatePassword, password) {
    return await bcrypt.compare(candidatePassword, password)
}

export function createAuthToken(user) {
    const token = jwt.sign(
        { id: user._id.toString() },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    )

    return token
}

export function sendTokenWithCookie(token, req, res) {
    setCookie('jwt', token, {
        req,
        res,
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: true,
        sameSite: true,
    })
}
