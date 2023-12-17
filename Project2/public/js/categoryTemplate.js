//get windows url to get the category id
const queryStr = window.location.search;
const categoryId = new URLSearchParams(queryStr);

//get url for fetch()
let wikiAdsUrl = 'https://wiki-ads.onrender.com/categories/' + categoryId.get('id') + '/subcategories'
console.log(wikiAdsUrl)

//create nessesary headers for fetch()
const httpHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

const myHeaders = new Headers(httpHeaders)

//fetch data from wikiAdsUrl
fetch(wikiAdsUrl,myHeaders)
.then(response => response.json())
.then(obj => {
    initCategories(obj)             //pass data to initCategories()
})
.catch(err => {
    console.log('Error ')       //catch error
})

//create handlebars template
const categoriesTemplates = {}
window.addEventListener('load', initCategories);

function categoriesHandlebarTemplate() {        
    categoriesTemplates.advs = Handlebars.compile(`
    {{#each adv}}
        <article class="subcategory">
           <h1>{{this.title}}</h1>
        </article>
    {{/each}}
    `)  
}

//create categories
function createCategories(advertsObj){
    let advertsPlaceholder = document.getElementById("subcategories_container")
    advertsPlaceholder.innerHTML = categoriesTemplates.advs({ adv: advertsObj })
}

//init categories
function initCategories(obj) {
    let advertsObj = obj
    categoriesHandlebarTemplate()
    createCategories(advertsObj)
}