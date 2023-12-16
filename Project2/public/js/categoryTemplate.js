import {phonesJSON} from '../models/phonesData.js'
import {hardwareJSON} from "../models/hardwareData.js";

const phonesTemplates = {}
const hardwareTemplates = {}

window.addEventListener('load', init);
const searchParams = new URLSearchParams(window.location.search);

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

function hardwareHandlebarsTemplate() {
    hardwareTemplates.hardware = Handlebars.compile(`
    {{#each hardware}}
        <article class="adv">
            <h1>{{this.name}}</h1>
            <img src="{{this.img}}" alt="{{this.name}}">
            <p>{{price}}</p> 
            <p>{{type}}</p>
            <p>{{condition}}</p> 
            {{#if Vram}} 
                <p>{{Vram}}</p>  
            {{/if}}
            <p>{{manufacturer}}</p> 
            <p>{{chipset}}</p>
            {{#if threads}}
                <p>{{threads}}</p>
            {{/if}}
            <p><button><a href="{{this.buttonhref}}">Δείτε περισσότερα</a></button></p>            
        </article>
    {{/each}}
    `)
}

function createPhones(phoneObj){
    let phonesPlaceholder = document.getElementById("adverts")
    phonesPlaceholder.innerHTML = phonesTemplates.phone({ phone: phoneObj.phones })
}

function createHardware(hwObj){
    let hwPlaceholder = document.getElementById("adverts")
    hwPlaceholder.innerHTML = hardwareTemplates.hardware({ hardware: hwObj.hardware})
}

function init() {

    if(searchParams.get('categoryId') == 2){
        let phonesObj = JSON.parse(phonesJSON);
        phonesHandlebarsTemplate()
        createPhones(phonesObj)
    }
    else if(searchParams.get('categoryId') == 4){
        let hardwareObj = JSON.parse(hardwareJSON);
        hardwareHandlebarsTemplate()
        createHardware(hardwareObj)
    }
}