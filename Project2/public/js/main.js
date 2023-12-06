// function countProducts(products)
// {
//     return products.length > 0 ?
//     `<p>Βρέθηκαν ${products.length} αποτελέσματα</p>` :
//     `<p>Δεν βρέθηκαν αποτελέσματα</p>`
// }

// function createProduct(products)
// {
//     let content = `
//     <h1>Αποτελέσματα Αναζήτησης</h1> 
//     ${countProducts(products)}
//     <ul id="produced_list">
//         ${products
//             .map(function (product) {
//                 return `<li>${product}</li>`
//             })
//             .join('\n')}
//     </ul>`
//     return content
// }

// window.addEventListener('load', function () {
//     let products = ['Iphone', 'Samsung', 'Huawei', 'Xiaomi', 'Sony', 'LG', 'Nokia', 'Motorola', 'OnePlus', 'Google']
//     let placeholder = document.getElementById('all_phones_list')
//     placeholder.innerHTML = createProduct(products)
// })


var templates = {}

templates.product = Handlebars.compile(`
    {{#if products.length}}
        <p>Βρέθηκαν {{products.length}} αποτελέσματα</p>
    {{else}}
        <p>Δεν βρέθηκαν αποτελέσματα</p>
    {{/if}}
    <ul id="produced_list">
        {{#each products}}
            <li>{{this}}</li>
        {{/each}}
    </ul>
`)

window.onload = function () {
    let products = ['Iphone', 'Samsung', 'Huawei', 'Xiaomi', 'Sony', 'LG', 'Nokia', 'Motorola', 'OnePlus', 'Google']
    let placeholder = document.getElementById('all_phones_list')
    placeholder.innerHTML = templates.product({ products: products })
}