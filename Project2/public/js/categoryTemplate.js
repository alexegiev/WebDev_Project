//get windows url to get the category id
const queryStr = window.location.search;
const categoryId = new URLSearchParams(queryStr);

//get url for fetch()
let wikiAdsUrl = 'https://wiki-ads.onrender.com/categories/' + categoryId.get('id') + '/subcategories'
let wikiAdsUrlSubcategories = 'https://wiki-ads.onrender.com/subcategories'

let subcategories = []    //array for subcategories
let advertsContainer = []   //array for adverts

//create nessesary headers for fetch()
const httpHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

const myHeaders = new Headers(httpHeaders)

//fetch data from wikiAdsUrl
fetch(wikiAdsUrlSubcategories, myHeaders)
.then(response => response.json())
.then(obj => {
    initCategories(obj)             //pass data to initCategories()
})
.catch(err => {
    console.log(err)       //catch error
})

//create handlebars template
const categoriesTemplates = {}

function categoriesHandlebarTemplate() {        
    categoriesTemplates.adverts = Handlebars.compile(`
    {{#if advert.length}}
        {{#each advert}}
            <section class="subcategories">
                <h1>{{this.title}}</button></h1>
                <img src="https://wiki-ads.onrender.com/{{this.images.[0]}}" alt="image">
                <p>{{this.description}}</p>
                <button class="fave"><img src ="./assets//favourites.png"></button> 
            </section>
        {{/each}} 
    {{else}}
        <p>Συγγνώμη, δεν υπάρχουν διαθέσιμες αγγελίες αυτή τη στιγμή.</p>
    {{/if}}
    `)  
}

//create categories
function createCategories(advertsObj){
    console.log(advertsObj)
    let advertsPlaceholder = document.getElementById("subcategories_container")
    advertsPlaceholder.innerHTML = categoriesTemplates.adverts({ advert: advertsObj })
}

//init categories
function initCategories(obj) {        
    subcategories = obj.map(id => (id.category_id == categoryId.get('id') && id))
    createSubcategories(subcategories)
}

//create subcategories
function createSubcategories(sub){
    categoriesHandlebarTemplate()

    //create array of promises
    let fetchPromises = sub.filter(item => item !== false).map(item => 
        fetch('https://wiki-ads.onrender.com/ads?subcategory=' + item.id, myHeaders)
            .then(response => response.json())
            .then(obj => {
                if(obj.length != 0){
                    advertsContainer.push(obj);
                }
            })
    );
    
    //wait for all promises to resolve
    Promise.all(fetchPromises)
        .then(() => {
            console.log(advertsContainer);
            const flattenedAdvertsContainer = advertsContainer.flat();
            console.log(flattenedAdvertsContainer);
            createCategories(flattenedAdvertsContainer);
        })
        .catch(err => {
            console.log('Error ', err); //catch error
        });
}

// Get the form element
const loginForm = document.querySelector('form');

// Add event listener for form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
    .then(response => response.json())
    .then(obj => {console.log(obj)})
});