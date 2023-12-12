// Authors: Alexegiev Theodore, Karagianni Andriana
phonesTemplates = {}
window.addEventListener('load', initPhones);

function phonesHandlebarsTemplate() {
   phonesTemplates.phone = Handlebars.compile(`
    {{#each phone}}
        <article class="ad_desc">
            <h1>{{name}}</h1>
            <img src="{{img}}" alt="{{id}}">
            <p>{{price}}</p> 
            <p>{{condition}}</p> 
            <p>{{os}}</p>   
            <p>{{ram}}</p>  
            <p>{{capacity}}</p>         
        </article>
    {{/each}}
    `)
}

function createPhones(phoneObj){
    let phonesPlaceholder = document.getElementById("all_phones_list")
    phonesPlaceholder.innerHTML = phonesTemplates.phone({ phone: phoneObj.phones })
}

function initPhones() {
    let phonesObj = JSON.parse(phonesJSON);
    phonesHandlebarsTemplate()
    createPhones(phonesObj)
}