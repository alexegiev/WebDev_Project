//this module is used to make a request to the server to login the user
import registeredCustomers from '../model/registeredCostumers.js'

class UserDAO {
    constructor(useDatabase = false) {
        this.useDatabase = useDatabase;
    }

    login(username, password) {
        return this.useDatabase ? this.loginFromDatabase(username, password) : this.loginFromMemory(username, password);
    }

    loginFromMemory(username, password) {
        const user = registeredCustomers.users.find(user => user.username === username && user.password === password);
        if (user) {
            return fetch('/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                localStorage.setItem(username, data.sessionId);
                return Promise.resolve({ statusCode: 201, sessionId: `${data.sessionId}` })
            })
        } else {
            return Promise.resolve({ statusCode: 401, message: 'Invalid username or password' });
        }
    }

    loginFromDatabase(username, password) {
        const body = { username, password };
        const headers = { 'Content-Type': 'application/json' }

        return fetch('/login', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
    }

    checkSession(username, sessionId) {
        console.log(localStorage)
        const storedSessionId = localStorage.getItem(username);
        console.log(storedSessionId)
        console.log(sessionId)
        if (storedSessionId) {
            if (storedSessionId === sessionId) {
                return Promise.resolve({ statusCode: 201, message: 'Session is valid' });
            } else {
                return Promise.resolve({ statusCode: 401, message: 'Invalid sessionId' });
            }
        } else {
            return Promise.resolve({ statusCode: 401, message: 'Invalid username or sessionId' });
        }
    }

    getSessionId(username) {
        const user = registeredCustomers.users.find(user => user.username === username);
        if (user) {
            return Promise.resolve({ statusCode: 201, sessionId: user.sessionId });
        } else {
            return Promise.resolve({ statusCode: 401, message: 'Invalid username' });
        }
    }
}

export default UserDAO;