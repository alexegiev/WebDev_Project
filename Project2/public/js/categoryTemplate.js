import { initButtonFunctionality } from './favoriteService.js';

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

// --------- FILTERS -------------

// Fetch subcategories from the API
fetch(wikiAdsUrl, myHeaders)
.then(response => response.json())
.then(subcategories => {
    // Create sidebar menu dynamically
    let filters = document.createElement('section');
    filters.id = 'filters';
    let allOption = document.createElement('input');
    allOption.type = 'radio';
    allOption.id = 'all';
    allOption.name = 'subcategory';
    allOption.value = 'all';
    allOption.checked = true;
    let allLabel = document.createElement('label');
    allLabel.htmlFor = 'all';
    allLabel.textContent = 'All';
    filters.appendChild(allOption);
    filters.appendChild(allLabel);
    for (let subcategory of subcategories) {
        console.log(subcategory);
        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = subcategory.id;
        radio.name = 'subcategory';
        radio.value = subcategory.id;
        let label = document.createElement('label');
        label.htmlFor = subcategory.id;
        label.textContent = subcategory.title;
        filters.appendChild(radio);
        filters.appendChild(label);
    }
    document.body.appendChild(filters); // Append the sidebar menu to the body or wherever you want it to appear
})
.catch(err => {
    console.log(err); // Catch error
});

// Function to filter adverts
function filterAdverts(selectedSubcategory) {
    let filteredAdverts;
    if (selectedSubcategory === 'all') {
        //fetch data from wikiAdsUrl
        fetch(wikiAdsUrlSubcategories, myHeaders)
        .then(response => response.json())
        .then(obj => {
            initCategories(obj)             //pass data to initCategories()
        })
        .catch(err => {
            console.log(err)       //catch error
        })
    } else {
        fetch('https://wiki-ads.onrender.com/ads?subcategory=' + selectedSubcategory, myHeaders)
            .then(response => response.json())
            .then(obj => {
                console.log(obj)
                if(obj.length != 0){
                    updatePage(obj);
                }
            })
    }
    // Now you have an array of filtered adverts. Use this to update your page.
    createCategories(filteredAdverts);
}

function updatePage(filteredAdverts) {
    // Prepare the new adverts HTML
    let newAdvertsHtml = '';

    // Add the filtered adverts
    if (filteredAdverts.length > 0) {
        for (let advert of filteredAdverts) {
            newAdvertsHtml += categoriesTemplates.adverts({ advert: [advert] });
        }
    } else {
        newAdvertsHtml = '<p>No adverts found for the selected subcategories.</p>';
    }

    // Update the adverts on the page
    let advertsPlaceholder = document.getElementById("subcategories_container");
    advertsPlaceholder.innerHTML = newAdvertsHtml;

    // Re-initialize button functionality
    initButtonFunctionality();
}

// ----------------------

//create handlebars template
const categoriesTemplates = {}

function categoriesHandlebarTemplate() {   
    //-------- FILTERS TEMPLATE ------------
    categoriesTemplates.filters = Handlebars.compile(`
        <form id="filterForm">
            {{#each this.subcategories}}
                <input type="radio" id="{{this.id}}" name="subcategory" value="{{this.id}}">
                <label for="{{this.id}}">{{this.title}}</label><br>
            {{/each}}
        </form>
    `);  
    //--------------------

    categoriesTemplates.adverts = Handlebars.compile(`
    {{#if advert.length}}
        {{#each advert}}
            <section class="subcategories">
                <h1>{{this.title}}</h1>
                <img src="https://wiki-ads.onrender.com/{{this.images.[0]}}" alt="image">
                <p>{{this.description}}</p>
                <p class="advId">{{this.id}}</p>
                <p class="subcategoryId">{{this.subcategory_id}}</p>
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
    document.getElementById('filters').addEventListener('change', function(event) {
        let selectedSubcategory = event.target.value;
        // Now you have the selected subcategory. Use this to filter your adverts.
        console.log(selectedSubcategory);
        filterAdverts(selectedSubcategory);
    });
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
            const flattenedAdvertsContainer = advertsContainer.flat();
            createCategories(flattenedAdvertsContainer);
            initButtonFunctionality();
        })
        .catch(err => {
            console.log('Error ', err); //catch error
        });
}