import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

const DB_LINK = process.env.MONGODB_URL.replace(
    '<PASSWORD>',
    process.env.MONGODB_PASSWORD
).replace('<DATABASE>', process.env.MONGODB_DATABASE)

const db = { isConnected: false }

db.client = new MongoClient(DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

db.client.on('open', () => {
    db.isConnected = true
})

db.client.on('topologyClosed', () => {
    db.isConnected = false
})

async function database(req, res, next) {
    if (!db.isConnected) await db.client.connect()

    req.dbClient = db.client
    req.db = db.client.db(process.env.MONGODB_DATABASE)
    return next()
}

const middleware = nextConnect()
middleware.use(database)

export default middleware
