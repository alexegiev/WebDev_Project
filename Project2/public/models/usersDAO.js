const registeredCustomers = require('./registeredCostumers')
const { connectDB, getDB } = require('../database')
const { ObjectId } = require('mongodb')
const { v4: uuidv4 } = require('uuid')

class UserDAO{
    constructor (useDatabase){
        this.useDatabase = useDatabase
    }

    login (username, password){
        if (this.useDatabase){
            return this.loginDatabase(username, password)
        } else {
            return this.loginMemory(username, password)
        }
    }

    loginMemory(username, password) {
        return new Promise((resolve, reject) => {
            try {
                const user = registeredCustomers.users.find(user => user.username === username && user.password === password);
                if (user) {
                    // Create Session ID
                    const sessionId = uuidv4();
                    user.userSessionId = sessionId;
                    console.log("From dao:");
                    console.log(registeredCustomers);
                    resolve(user);
                } else {
                    resolve(false);
                }
            } catch (err) {
                console.error(err);
                reject('Error occurred while fetching user from memory');
            }
        });
    }

    loginDatabase(username, password) {
        return new Promise((resolve, reject) => {
            const db = getDB();
            const collection = db.collection('Costumers');
            console.log(collection);
            const document = collection.findOne({ "users.username": username, "users.password": password })
            .then(users => {
                console.log(users);
                if (users) {
                    const userExists = users.users.find(user => user.username === username && user.password === password);
                    if (userExists) {
                        console.log(userExists);
                        // Create Session ID
                        const userSessionId = uuidv4();
                        userExists.userSessionId = userSessionId;
                        
                        // Update user in the database
                        collection.updateOne(
                            { "users.username": username, "users.password": password },
                            { $set: { "users.$.userSessionId": userSessionId } }
                        )
                        .then(() => {
                            resolve(userExists);
                        })
                        .catch(err => {
                            console.error(err);
                            reject('Error occurred while updating user in the database');
                        });
                    } else {
                        resolve(false);
                    }
                }
            })
        })
    }

    getUser (username){
        if (this.useDatabase){
            return this.getUserDatabase(username)
        } else {
            return this.getUserMemory(username)
        }
    }

    getUserMemory(username) {
        return new Promise((resolve, reject) => {
            console.log("From dao userMemory:");
            console.log(registeredCustomers);
            const user = registeredCustomers.users.find(user => user.username === username);
            if (user) {
                resolve(user);
            } else {
                reject('User not found');
            }
        });
    }

    getUserDatabase (username){
        return new Promise((resolve, reject) => {
            const db = getDB();
            const collection = db.collection('Costumers');
            const document = collection.findOne({ "users.username": username })
            .then(users => {
                const userExists = users.users.find(user => user.username === username);
                if (userExists) {
                    console.log("Getuser from database:");
                    console.log(userExists);
                    resolve(userExists);
                } else {
                    resolve(false);
                }
            })
        })
    }
}

module.exports = UserDAO;