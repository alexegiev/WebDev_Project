const express = require('express')
const { v4: uuidv4 } = require('uuid')
const registeredCustomers = require('./public/models/registeredCostumers');
const path = require('path')
const app = express()
const port = 8080

let loggedUsername
let sessionId

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
        //Create Session ID
        sessionId = uuidv4()
        loggedUsername = username
        res.status(200).json({ sessionId : sessionId })
    }
    else{
        res.status(401).json( {message : 'Invalid username or password'})
    }
})

app.get('/afs', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }

    if(loggedUsername == null){
        res.status(401).json({ message : 'Unauthorized'})
    }
    else{
        res.status(200).json({ message : 'Authorized'})
    }
})