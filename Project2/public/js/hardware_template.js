// Authors: Alexegiev Theodore, Karagianni Andriana
hardwareTemplates = {}
window.addEventListener('load', initHardware);

function hardwareHandlebarsTemplate() {
    hardwareTemplates.hardware = Handlebars.compile(`
    {{#each hardware}}
        <article class="adv">
            <h1>{{this.name}}</h1>
            <img src="{{this.img}}" alt="{{this.id}}">
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

function createHardware(hwObj){
    let hwPlaceholder = document.getElementById("all_hardware_list")
    hwPlaceholder.innerHTML = hardwareTemplates.hardware({ hardware: hwObj.hardware})
}

function initHardware() {
    let hardwareObj = JSON.parse(hardwareJSON);
    hardwareHandlebarsTemplate()
    createHardware(hardwareObj)
}