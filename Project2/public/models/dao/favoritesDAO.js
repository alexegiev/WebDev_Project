import favorites from "../model/costumersFavorites.js";
class FavoriteDAO{
    constructor(useDatabase = false){
        this.useDatabase = useDatabase;
    }

    addFavorites(username, sessionId, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl){
        return this.useDatabase ? this.addFavoritesFromDatabase(username, sessionId, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl) : this.addFavoritesFromMemory(username, sessionId, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl);
    }

    addFavoritesFromMemory(username, sessionId, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl){
        const userFavorites = favorites[username];
        if (userFavorites) {
            const existingAdvert = userFavorites.find(favorite => favorite.advertId === advertId);
            if (existingAdvert) {
                return Promise.resolve({ statusCode: 409, message: 'Advert already in favorites' });
            } else {
                userFavorites.push({ advertId, advertTitle, advertDescription, advertPrice, advertImageUrl });
                console.log(userFavorites)
                return Promise.resolve({ statusCode: 201, message: 'Favorite added' });
            }
        } else {
            return Promise.resolve({ statusCode: 401, message: 'Invalid username' });
        }
    }

    addFavoritesFromDatabase(username, sessionId, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl){
        const body = { username, sessionId, advertId, advertTitle, advertDescription, advertPrice, advertImageUrl };
        const headers = { 'Content-Type': 'application/json' }

        return fetch('/afs', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
    }
}

export default FavoriteDAO;