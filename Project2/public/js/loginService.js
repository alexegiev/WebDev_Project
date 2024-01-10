// Import the UserDAO class
import UserDAO from '../models/dao/usersDAO.js'
const userDAO = new UserDAO(false)

// Initialize the local storage
window.onload = function() {
    localStorage.clear();
}

// Get the form element
const loginForm = document.querySelector('form')

// Get the message element
const messageElement = document.getElementById('message')

// Get the user login element
const userLogin = document.getElementById('user_login')

//Get the nav bar element
let navBar = document.querySelector('.main_nav > ul');

// Add event listener for form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the username and password values
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    // Reset login form
    loginForm.reset();
    userDAO.login(username, password)
    .then(response => {
        if(response.statusCode === 401){
            throw new Error(response.message)
        }
        else{
            console.log(response)
            return Promise.resolve(response)
        }
    })
    .then(obj => {
        console.log(obj)
        let favorites = document.createElement('li')
        let link = document.createElement('a')
        link.href = 'favorite-ads.html?username=' + username + '&sessionId=' + obj.sessionId
        link.textContent = 'Αγαπημένα'
        favorites.appendChild(link)
        navBar.appendChild(favorites)

        // Update the message element with the success message
        userLogin.className = 'user_login_success'
        messageElement.textContent = 'Login successful'
        messageElement.className = 'message-success'

        // Store the username and session ID in local storage
        const user = { username: username, sessionId: obj.sessionId };
        localStorage.setItem('user', JSON.stringify(user));
    })
    .catch(error => {
        // Update the message element with the error message
        messageElement.textContent = error.message
        messageElement.className = 'message-error'
    })
})

