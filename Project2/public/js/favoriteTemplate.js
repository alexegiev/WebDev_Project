// Get the username parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const sessionId = urlParams.get('sessionId');

let body = {
    username,
    sessionId
}
// Fetch the favorites data from the server
fetch('/frs', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
    })
    .then(response => {
        if(response.ok){
            fetch('/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(obj => {
                const source = document.getElementById('favorites-template').innerHTML;

                // Compile the template
                const template = Handlebars.compile(source);
            
                // Generate the HTML from the favorites data
                const html = template(favorites);
            
                // Insert the HTML into the page
                document.getElementById('favorites-container').innerHTML = html;
            })
        }
        else{
            throw new Error('Invalid username or sessionId')
        }
    })