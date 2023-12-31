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

//create handlebars template
const categoriesTemplates = {}

function categoriesHandlebarTemplate() {        
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