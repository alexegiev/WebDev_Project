var categoriesJSON = 
`{
    "categories": 
    [
        {
            "mainHref": "#",
            "img": "./assets//desktop.png",
            "id": "Υπολογιστές",
            "buttons": 
            [
                {
                    "buttonName":"Desktops",
                    "href": "#"
                },
                {
                    "buttonName": "Laptops",
                    "href": "#"
                }
            ]
        },
        {
            "mainHref": "phone_categories.html",
            "img": "./assets//smartphones.png",
            "id": "Κινητά Τηλέφωνα",
            "buttons": 
            [
                {
                    "buttonName":"Android",
                    "href": "android_categories.html"
                },
                {
                    "buttonName": "Apple",
                    "href": "#"
                }
            ]
        },
        {
            "mainHref": "#",
            "img": "./assets//consoles.png",
            "id": "Gaming",
            "buttons": 
            [
                {
                    "buttonName":"Consoles",
                    "href": "#"
                },
                {
                    "buttonName": "Games",
                    "href": "#"
                },
                {
                    "buttonName": "Peripherals",
                    "href": "#"
                }
            ]
        },
        {
            "mainHref": "hardware_categories.html",
            "img": "./assets//hardware.png",
            "id": "Αναβαθμίσεις Υπολογιστών",
            "buttons": 
            [
                {
                    "buttonName":"CPU",
                    "href": "#"
                },
                {
                    "buttonName": "GPU",
                    "href": "gpu_categories.html"
                },
                {
                    "buttonName": "HDD",
                    "href": "#"
                },
                {
                    "buttonName": "SDD",
                    "href": "#"
                },
                {
                    "buttonName": "Motherboard",
                    "href": "#"
                },
                {
                    "buttonName": "Towers",
                    "href": "#"
                }
            ]
        }
    ]    
}
`

categoriesTemplates = {}

window.onload = function () {
    let categoriesObj = JSON.parse(categoriesJSON);
    let categoriesPlaceholder = document.getElementById("categories")
    categoriesPlaceholder.innerHTML = categoriesTemplates.categories({ categories: categoriesObj.categories })
}

categoriesTemplates.categories = Handlebars.compile(`
    {{#each categories}}
        <section class="product">
            <a href="{{this.mainHref}}">
                <img src="{{this.img}}" alt="{{this.id}}">
            </a>
            <section class="dropdown">
                <button class="dropbtn">{{this.id}}</button>
                <div class="dropdown-content">
                    {{#each this.buttons}}
                        <a href="{{this.href}}">{{this.buttonName}}</a>
                    {{/each}}
                </div>
            </section>       
        </section>
    {{/each}}
`)