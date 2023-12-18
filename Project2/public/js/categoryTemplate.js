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
    {{#each advert}}
        <section class="subcategories">
            <h1>{{title}}</h1>
            <p>{{description}}</p>
        </section>
    {{/each}}
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


function createSubcategories(sub){
    categoriesHandlebarTemplate()
    let fetchPromises = sub.filter(item => item !== false).map(item => 
        fetch('https://wiki-ads.onrender.com/ads?subcategory=' + item.id, myHeaders)
            .then(response => response.json())
            .then(obj => {
                if(obj.length != 0){
                    advertsContainer.push(obj);
                }
            })
    );
    
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
