//get url for fetch()
let wikiAdsUrl = 'https://wiki-ads.onrender.com/categories'

//create nessesary headers for fetch()
const httpHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

const myHeaders = new Headers(httpHeaders)

let completeList = []
let categoriesContainer = []         //contains an array with all categories
let subcategoriesContainer = [] //contains all subcategories
//fetch data from wikiAdsUrl
fetch(wikiAdsUrl,myHeaders)
.then(response => response.json())
.then(obj => {
    categoriesContainer = obj 
    getSubcategories(categoriesContainer)
})
.catch(err => {
    console.log('Error ')       //catch error
})

function getSubcategories(categoriesObj){
    let fetchSubcategories = categoriesObj.filter(item => item !== false).map(item => 
        fetch('https://wiki-ads.onrender.com/categories/' + item.id + '/subcategories', myHeaders)
            .then(response => response.json())
            .then(obj => {
                subcategoriesContainer.push(obj) 
            })
    );
    
    Promise.all(fetchSubcategories)
        .then(() => {
            for(let i = 0; i <= categoriesContainer.length - 1; i++){
                let complete = false
                completeList.push(categoriesContainer[i])
                let j = 0
                while(!complete){
                    if (completeList[i].id == subcategoriesContainer[j][0].category_id){
                        completeList[i].subcategories = subcategoriesContainer[j]
                        complete = true
                    }
                    else{
                        j++
                    }
                }
            }
            createIndex(completeList)
        })
        .catch(err => {
            console.log('Error ', err); //catch error
        });
}


//create handlebars template
const indexTemplates = {}
window.addEventListener('load', initIndex);

function indexHandlebarTemplate() {        
    indexTemplates.categories = Handlebars.compile(`
    {{#each categories}}
        <section class="product">
            <a href = "category.html?id={{this.id}}"> <img src="https://wiki-ads.onrender.com/{{this.img_url}}" alt="{{this.name}}"></a>
            <h1>{{this.title}}</h1>
            <section class="dropdown">
                <button class="dropbtn">Υποκατηγορίες</button>
                <div class="dropdown-content">
                    {{#each this.subcategories}}
                        <a href = "subcategory.html?id={{this.id}}"<h3>{{this.title}}</h3></a>
                    {{/each}}
                </div>
            </section>      
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


