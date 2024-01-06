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
                console.log(obj)
                initFavorites(obj)
            })
        }
        else{
            throw new Error('Invalid username or sessionId')
        }
    })
    .catch(err => {
        console.log(err)
    })

//create handlebars template
const favoritesTemplates = {}

function createFavorites(favoritesObj){
    let favoritesPlaceholder = document.getElementById("subcategories_container")
    favoritesPlaceholder.innerHTML = favoritesTemplates.favorites({ favorites: favoritesObj })
}

//init categories
function initFavorites(obj){
    favoritesTemplates.favorites = Handlebars.compile(`
    {{#if favorite.length}}
        {{#each favorite}}
            <section class="favorites">
                <h1>{{this.title}}</h1>
                <img src="https://wiki-ads.onrender.com/{{this.images.[0]}}" alt="image">
                <p>{{this.description}}</p>
            </section>
        {{/each}} 
    {{else}}
        <p>Δεν έχετε αγαπημένες αγγελίες.</p>
    {{/if}}
    `)  
    createFavorites(obj)
}