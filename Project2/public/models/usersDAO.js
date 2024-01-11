const registeredCustomers = require('./registeredCostumers')
const { v4: uuidv4 } = require('uuid')
class UserDAO{
    constructor (useDatabase = false){
        this.useDatabase = useDatabase
    }

    login (username, password){
        if (this.useDatabase){
            return this.loginDatabase(username, password)
        } else {
            return this.loginMemory(username, password)
        }
    }

    loginMemory (username, password){
        if(registeredCustomers.users.find(user => user.username === username && user.password === password)){
            const user = registeredCustomers.users.find(user => user.username === username);
            //Create Session ID
            const sessionId = uuidv4()
            user.userSessionId = sessionId
            console.log("From dao:")
            console.log(registeredCustomers)
            return user
        } else {
            return false
        }
    }

    getUser (username){
        if (this.useDatabase){
            return this.getUserDatabase(username)
        } else {
            return this.getUserMemory(username)
        }
    }

    getUserMemory (username){
        console.log("From dao userMemory:")
        console.log(registeredCustomers)
        return registeredCustomers.users.find(user => user.username === username)
    }
}

module.exports = UserDAO;