import mongoose from 'mongoose'

export default async function connectDatabase() {
    const DB = process.env.MONGODB_URL.replace(
        '<PASSWORD>',
        process.env.MONGODB_PASSWORD
    ).replace('<DATABASE>', process.env.MONGODB_DATABASE)

    await mongoose.connect(DB)
}
