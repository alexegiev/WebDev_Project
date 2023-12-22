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

Handlebars.registerHelper('split', function(content, options) {
    if (content) {
        var temp = content.split(options);
        return temp;
    }
});

function advertsHandlebarTemplate() {        
    advertsTemplates.adverts = Handlebars.compile(`
    {{#if advert.length}}
        {{#each advert}}
            <section class="product">
                <h1>{{this.title}}</h1>
                {{#each this.images}}
                    <img src="https://wiki-ads.onrender.com/{{this}}" alt="image">
                {{/each}}
                <p>{{this.description}}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Χαρακτηριστικά</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{#each (split this.features ';')}}
                            <tr>
                                <td>{{this}}</td>
                            </tr>
                        {{/each}}
                    </tbody>
                </table>
            </section>
        {{/each}}
    {{else}}
        <p>Συγνώμη, δεν υπάρχουν διαθέσιμες αγγελίες αυτή τη στιγμή.</p>
    {{/if}}
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


