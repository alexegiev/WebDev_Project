export function initButtonFunctionality(){

    // Find all buttons with the class fave
    const faveButtons = document.querySelectorAll('.fave')

    // Add onclick event listener to each button
    faveButtons.forEach(button => {
        button.addEventListener('click', handleClick)
    })

    function handleClick(event) {
        // Find the parent section of the clicked button
        const parentSection = event.target.closest('.subcategories');

        // Find the <p> element with the class advId within the parent section
        const advIdElement = parentSection.querySelector('.advId');

        // Get the content from the <p> element
        const advId = advIdElement.textContent;

        // Find the <p> element with the class subcategoryId within the parent section
        const subcategoryIdElement = parentSection.querySelector('.subcategoryId');

        // Get the content from the <p> element
        const subcategoryId = subcategoryIdElement.textContent;

        
        //get windows url to get the category id
        const queryStr = window.location.search;
        const categoryId = new URLSearchParams(queryStr);

        //get url for fetch(), to fetch all adverts from a specific subcategory, then we will find the advert we want
        const wikiAdsUrlAdvert = 'https://wiki-ads.onrender.com/ads?subcategory=' + subcategoryId

        //create nessesary headers for fetch()
        const httpHeaders = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        //create options for fetch()
        const options = {
            method: 'GET',
            headers: httpHeaders
        }

        const myHeaders = new Headers(options)

        //fetch data from wikiAdsUrl
        if(!(JSON.parse(localStorage.getItem('user')) === null)){
            const user = JSON.parse(localStorage.getItem('user'))            
            const username = user.username
            const sessionId = user.sessionId

            //create fetch request to get the advert we want
            fetch(wikiAdsUrlAdvert, myHeaders)
            .then(response => response.json())
            .then(obj => obj.find(advert => advert.id == advId))
            .then(advert => { 
                const advertId = advert.id
                const advertTitle = advert.title
                const advertDescription = advert.description
                const advertPrice = advert.cost
                const advertImageUrl = 'https://wiki-ads.onrender.com/' + advert.images[0]
                console.log('Added to favorites')
            })
        }
        else{
            alert('Παρακαλώ συνδεθείτε για προσθήκη στη λίστα αγαπημένων')
        }
    } 
}
