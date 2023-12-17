//get url for fetch()
let wikiAdsUrl = 'https://wiki-ads.onrender.com/categories'

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
    initIndex(obj)             //pass data to initIndex()
    console.log(obj)
})
.catch(err => {
    console.log('Error ')       //catch error
})

//create handlebars template
const indexTemplates = {}
window.addEventListener('load', initIndex);

function indexHandlebarTemplate() {        
    indexTemplates.categories = Handlebars.compile(`
    {{#each categories}}
        <section class="product">
            <a href = "category.html?id={{this.id}}"> <img src="{{this.img_url}}" alt="{{this.name}}"></a>
            <h1>{{this.title}}</h1>     
        </section>
    {{/each}}
    `)  
}

//create categories
function createIndex(categoriesObj){
    let categoriesPlaceholder = document.getElementById("categories")
    categoriesPlaceholder.innerHTML = indexTemplates.categories({ categories: categoriesObj })
}

//init categories
function initIndex(obj) {
    let categoriesObj = obj
    indexHandlebarTemplate()
    createIndex(categoriesObj)
}


