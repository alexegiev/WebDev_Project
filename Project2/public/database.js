const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = 'mongodb+srv://Admin:rM1snTZCyjLLOTp5@cluster0.ck2m9hd.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})
    

let db

const connectDB = async () => {
    await client.connect()
    db = client.db('WebDevelopment')
}

const getDB = () => db

module.exports = { connectDB, getDB }