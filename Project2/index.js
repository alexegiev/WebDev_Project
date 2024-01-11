const express = require('express')
const UserDAO = require('./public/models/usersDAO')
const FavoriteDAO = require('./public/models/favoritesDAO')
const registeredCustomers = require('./public/models/registeredCostumers')
const fs = require('fs')
const path = require('path')
const { log } = require('console')
const app = express()
const port = 8080
const useDB = false
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
app.use(express.urlencoded({ extended: false }));

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
    const user = new UserDAO(useDB)
    loggedUser = user.login(username, password)
    if(loggedUser){
        res.status(200).json( {sessionId : loggedUser.userSessionId})
    }
    else{
        res.status(401).json( {message : 'Invalid username or password'})
    }
}) 

app.post('/afs', function(req, res){

    // Get username, sessionId, advertId, advertTitle, advertDescription, advertPrice, advertImageUr
    const { username, sessionId, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl } = req.body;

    const favorite = new FavoriteDAO(useDB)
    if(favorite.addFavorite(username, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl) === "Already exists"){
        res.status(401).json( {message : 'Advert already in favorites'})
    }
    else{
        res.status(200).json( {message : 'Advert added to favorites'})
        console.log("From index.js after added to favorites:")
        console.log(registeredCustomers)
    }


})

app.post('/frs', function(req, res){
    // Access the parameters
    var username = req.body.username;
    var id = req.body.sessionId

    const findUser = new UserDAO(useDB)
    const registeredUser = findUser.getUser(username)
    console.log("From index.js:")
    console.log(registeredUser)
    // Check if the user exists and the sessionId matches
    if (registeredUser && registeredUser.userSessionId === id) {
        // Redirect to the URL with the desired format
        res.redirect(`/favorite-ads.html?username=${username}&sessionId=${id}`);
    } else {
        // Send an error response if the sessionId does not match
        res.status(403).send('Invalid sessionId for this user');
    }
});

app.post('/favorites', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }

    const username = req.body.username;
    const favorites = new FavoriteDAO(useDB)
    favorites.getFavorites(username)
    .then(favoritesData => {
        console.log("From index.js favorites:")
        console.log(favoritesData)
        // If getFavorites resolves, send the favorites data
        res.status(200).json(favoritesData);
    })
    .catch(error => {
        // If getFavorites rejects, send the error message
        res.status(401).json({message: error});
    });
});