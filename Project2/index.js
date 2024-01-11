const express = require('express')
const { v4: uuidv4 } = require('uuid')
const registeredCustomers = require('./public/models/registeredCostumers')
const favorites = require('./public/models/costumersFavorites')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 8080
app.use

app.listen(port)

/* 
    Serve static content from directory "public",
    it will be accessible under path /, 
    e.g. http://localhost:8080/index.html
*/
app.use(express.static('public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

app.get('/category?:categoryId', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }

    const categoryId = req.params.categoryId

    res.sendFile('category.html', options, function(err){
        console.log(err)
    })
})

app.get('/subcategory?:subcategoryId', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }

    const categoryId = req.params.categoryId

    res.sendFile('category.html', options, function(err){
        console.log(err)
    })
})

app.post('/login', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }

    // Get the username and password values
    const { username, password } = req.body;

    if(registeredCustomers.users.find(user => user.username === username && user.password === password)){
        const user = registeredCustomers.users.find(user => user.username === username);
        //Create Session ID
        sessionId = uuidv4()
        user.userSessionId = sessionId
        console.log(registeredCustomers)
        res.status(200).json({ sessionId : sessionId })
    }
    else{
        res.status(401).json( {message : 'Invalid username or password'})
    }
})

app.post('/afs', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }

    // Get username, sessionId, advertId, advertTitle, advertDescription, advertPrice, advertImageUr
    const { username, sessionId, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl } = req.body;

    //check if user's list exists in favorites
    if(favorites[username] === undefined){
        favorites[username] = []
        console.log('Created new list for user ' + username)
    }

    //check if advert is already in user's list
    if(favorites[username].find(advert => advert.advertId === advertId)){
        res.status(401).json( {message : 'Advert already in favorites'})
    }
    else{
        favorites[username].push({ advertId, advertTitle, advertDescription, advertPrice, advertImageUrl })
        res.status(200).json( {message : 'Advert added to favorites'})
    }

    fs.writeFile('public/models/costumersFavorites.json', JSON.stringify(favorites, null, 2), options, function(err) {
        if(err) {
            console.log('Error writing to costumersFavorites.json:', err);
        } else {
            console.log('Successfully wrote to costumersFavorites.jsons');
        }
    })

    console.log(favorites)
})

app.post('/frs', function(req, res){
    // Access the parameters
    var user = req.body.username;
    var id = req.body.sessionId
    // Find the user in registeredCustomers
    const registeredUser = registeredCustomers.users.find(u => u.username === user);

    // Check if the user exists and the sessionId matches
    if (registeredUser && registeredUser.userSessionId === id) {
        // Redirect to the URL with the desired format
        res.redirect(`/favorite-ads.html?username=${user}&sessionId=${id}`);
    } else {
        // Send an error response if the sessionId does not match
        console.log('Invalid sessionId for this user');
        res.status(403).send('Invalid sessionId for this user');
    }
});

app.post('/favorites', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }

    const username = req.body.username;
    // Read the contents of the costumersFavorites.json file
    fs.readFile('./public/models/costumersFavorites.json', 'utf8', (err, data) => {
        if (err) {
            // Handle the error if the file cannot be read
            console.error(err);
            res.status(500).send('Could not read favorites data');
        } else {
            // Parse the JSON data
            const favoritesData = JSON.parse(data);
            
            // Find the favorites for the specified username
            const userFavorites = favoritesData[username];

            if (userFavorites) {
                // Send the user's favorites as the response
                res.send(userFavorites);
            } else {
                // Send a 404 response if the user's favorites are not found
                res.status(404).send('Favorites not found for this user');
            }
        }
    });
});