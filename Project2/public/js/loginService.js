// Get the form element
const loginForm = document.querySelector('form')

// Get the message element
const messageElement = document.getElementById('message')

// Add event listener for form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the username and password values
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    // Reset login form
    loginForm.reset();

    // Create the fetch request body
    const body = {
        username,
        password
    }

    // Create the fetch request headers
    const headers = {
        'Content-Type': 'application/json'
    }

    // Create the fetch request
    fetch('/login', {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    })
    .then(response => {
        if(response.ok){
            return response.json()
        }
        else{
            throw new Error('Invalid username or password')
        }
    })
    .then(obj => {
        // Update the message element with the success message
        localStorage.loggedUser = ('user', JSON.stringify({username: username, password: password, sessionId: obj.sessionId}))
        messageElement.textContent = 'Login successful'
        messageElement.className = 'message-success'
    })
    .catch(error => {
        // Update the message element with the error message
        messageElement.textContent = error.message
        messageElement.className = 'message-error'
    })
})

