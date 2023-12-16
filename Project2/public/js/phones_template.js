import {phonesJSON} from '../models/phonesData.js'
const phonesTemplates = {}

import {hardwareJSON} from "../models/hardwareData.js";
const hardwareTemplates = {}

window.addEventListener('load', initPhones);

function phonesHandlebarsTemplate() {
   phonesTemplates.phone = Handlebars.compile(`
    {{#each phone}}
        <article class="adv">
            <h1>{{this.name}}</h1>
            <img src="{{this.img}}" alt="{{this.name}}">
            <p>{{price}}</p> 
            <p>{{condition}}</p> 
            <p>{{os}}</p>   
            <p>{{ram}}</p>  
            <p>{{capacity}}</p> 
            <p><button><a href="{{this.buttonhref}}">Δείτε περισσότερα</a></button></p>            
        </article>
    {{/each}}
    `)
}

function createPhones(phoneObj){
    let phonesPlaceholder = document.getElementById("adverts")
    phonesPlaceholder.innerHTML = phonesTemplates.phone({ phone: phoneObj.phones })
}

export function initPhones() {
    let phonesObj = JSON.parse(phonesJSON);
    phonesHandlebarsTemplate()
    createPhones(phonesObj)
}