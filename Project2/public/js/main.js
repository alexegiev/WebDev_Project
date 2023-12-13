// Authors: Alexegiev Theodore, Karagianni Andriana
categoriesTemplates = {}
window.addEventListener('load', initCategories);

function categorieHandlebarsTemplate() {
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
}

function createCategories(catObj){
    let categoriesPlaceholder = document.getElementById("categories")
    categoriesPlaceholder.innerHTML = categoriesTemplates.categories({ categories: catObj.categories })
}

function initCategories() {
    let categoriesObj = JSON.parse(categoriesJSON);
    categorieHandlebarsTemplate()
    createCategories(categoriesObj)
}