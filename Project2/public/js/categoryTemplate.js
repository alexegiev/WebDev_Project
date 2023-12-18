//get windows url to get the category id
const queryStr = window.location.search;
const categoryId = new URLSearchParams(queryStr);

//get url for fetch()
let wikiAdsUrl = 'https://wiki-ads.onrender.com/categories/' + categoryId.get('id') + '/subcategories'
let wikiAdsUrlSubcategories = 'https://wiki-ads.onrender.com/subcategories'

let sub = []
let advertsContainer = []

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
    console.log('Error ')       //catch error
})

//create handlebars template
const categoriesTemplates = {}

function categoriesHandlebarTemplate() {        
    categoriesTemplates.advs = Handlebars.compile(`
    {{#each adv}}
        <article class="subcategory">
           <h1>{{title}}</h1>
        </article>
    {{/each}}
    `)  
}

//create categories
function createCategories(advertsObj){
    console.log(advertsObj)
    let advertsPlaceholder = document.getElementById("subcategories_container")
    advertsPlaceholder.innerHTML = categoriesTemplates.advs({ adv: advertsObj })
}

//init categories
function initCategories(obj) {        
    sub = obj.map(id => (id.category_id == categoryId.get('id') && id))
    createSubcategories(sub)
}


function createSubcategories(sub){
    categoriesHandlebarTemplate()
    new Promise((getAllAdverts) =>{
        for(let i = 0; i <= sub.length - 1; i++){
            if(sub[i] != false){
                fetch('https://wiki-ads.onrender.com/ads?subcategory=' + sub[i].id, myHeaders)
                .then(response => response.json())
                .then(obj => {
                    addAdverts(obj)             //pass data to initCategories()
                })
                .catch(err => {
                    console.log('Error ')       //catch error
                })
            }
        }
    }
    .then(createCategories(advertsContainer))
}

function addAdverts(obj){
    advertsContainer.push(obj)
}