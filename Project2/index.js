const express = require('express')
const { v4: uuidv4 } = require('uuid')
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

app.get('/login', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }

    //Create Session ID
    sessionId = uuidv4()
    res.status(201).json({ sessionId : sessionId })
})


app.get('/afs', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }
})

app.post('/frs', function(req, res){
    // Access the parameters
    var user = req.body.username;
    var id = req.body.sessionId
    
    // Redirect to the URL with the desired format
    res.redirect(`/favorite-ads.html?username=${user}&sessionId=${id}`)
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