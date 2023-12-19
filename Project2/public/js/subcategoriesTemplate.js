const queryStr = window.location.search;
const subcategoryId = new URLSearchParams(queryStr);

//get url for fetch()
let wikiAdsUrl = 'https://wiki-ads.onrender.com/ads?subcategory=' + subcategoryId.get('id')

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
    console.log(obj)
    initAdverts(obj)             //pass data to initIndex()
})
.catch(err => {
    console.log('Error ')       //catch error
})

//create handlebars template
const advertsTemplates = {}
window.addEventListener('load', initAdverts);

function advertsHandlebarTemplate() {        
    advertsTemplates.adverts = Handlebars.compile(`
    {{#each advert}}
        <section class="product">
            <h1>{{this.title}}</h1>     
        </section>
    {{/each}}
    `)  
}

//create categories
function createAdverts(advertsObj){
    let advertsPlaceholder = document.getElementById("adverts_container")
    advertsPlaceholder.innerHTML = advertsTemplates.adverts({ advert: advertsObj })
}

//init categories
function initAdverts(obj) {
    let advertsObj = obj
    advertsHandlebarTemplate()
    createAdverts(advertsObj)
}


