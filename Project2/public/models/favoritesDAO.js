const favorites = require('./costumersFavorites')
const fs = require('fs')
const path = require('path')

class FavoriteDAO{
    constructor(useDatabase){
        this.useDatabase = useDatabase
    }

    addFavorite (username, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl){
        if (this.useDatabase){
            return this.addFavoriteDatabase(username, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl)
        } else {
            return this.addFavoriteMemory(username, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl)
        }
    }

    addFavoriteMemory (username, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl){
            //check if user's list exists in favorites
        if(favorites[username] === undefined){
            favorites[username] = []
            console.log('Created new list for user ' + username)
        }

        //check if advert is already in user's list
        if(favorites[username].find(advert => advert.advertId === advertId)){
            return "Already exists"
        }
        else{
            //add advert to user's list
            favorites[username].push({
                advertId,
                advertTitle,
                advertDescription,
                advertPrice,
                advertImageUrl
            })
            console.log('Added advert ' + advertId + ' to user ' + username + ' favorites')

            fs.writeFile(path.join(__dirname, 'costumersFavorites.json'), JSON.stringify(favorites, null, 2), function(err) {
                if(err) {
                    console.log('Error writing to costumersFavorites.json:', err);
                } else {
                    console.log('Successfully wrote to costumersFavorites.json');
                }
            })
            return "Added"
        }
    }

    getFavorites (username){
        if (this.useDatabase){
            return this.getFavoritesDatabase(username)
        } else {
            return this.getFavoritesMemory(username)
        }
    }

    getFavoritesMemory(username) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, 'costumersFavorites.json'), 'utf8', (err, data) => {
                if (err) {
                    // Handle the error if the file cannot be read
                    console.error(err);
                    reject('Could not read favorites data');
                } else {
                    // Parse the JSON data
                    const favoritesData = JSON.parse(data);
                    console.log("From favoritesDAO:")
                    console.log(favoritesData)
                    // Find the favorites for the specified username
                    const userFavorites = favoritesData[username];
                    console.log("From favoritesDAO:")
                    console.log(userFavorites)
    
                    if (userFavorites) {
                        // Resolve the promise with the user's favorites
                        resolve(userFavorites);
                    } else {
                        // Reject the promise if the user's favorites are not found
                        reject('Favorites not found for this user');
                    }
                }
            });
        });
    }
    
}

module.exports = FavoriteDAO;