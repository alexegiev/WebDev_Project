let wikiAdsUrl = 'https://wiki-ads.onrender.com/categories'
const httpHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

const myHeaders = new Headers(httpHeaders)

fetch(wikiAdsUrl,myHeaders)
.then(response => response.json())
.then(obj => {
    initCategories(obj)
    console.log(obj)
})
.catch(err => {
    console.log('Error ')
})

const categoriesTemplates = {}
window.addEventListener('load', initCategories);

function categorieHandlebarsTemplate() {
    categoriesTemplates.categories = Handlebars.compile(`
    {{#each categories}}
        <section class="product">
            <img src="{{this.img_url}}" alt="{{this.name}}">
            <h1>{{this.title}}</h1>     
        </section>
    {{/each}}
    `)  
}

function createCategories(categoriesObj){
    let categoriesPlaceholder = document.getElementById("categories")
    categoriesPlaceholder.innerHTML = categoriesTemplates.categories({ categories: categoriesObj })
}

function initCategories(obj) {
    let categoriesObj = obj
    categorieHandlebarsTemplate()
    createCategories(categoriesObj)
}


