/**
 * Stocke le JWT token dans un cookie sécurisé
 * 
 * @param {String} token Le JWT token a stocké dans le cookie
 */
export function setTokenCookie(token) {
    //Création de date d'expiration du token
    const date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); //Durée de 7 jours

    //Mise en place du cookie
    document.cookie = `token=${token}; expires=${date.toUTCString()}; path=/; Secure; SameSite=Strict`;
}

/**
 * Récupére le JWT token
 * @returns Le JWT token en format String si il est présent, null dans le cas contraire
 */
export function getTokenCookie() {
    const name = "token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

/**
 * Supprime le cookie complétement
 */
export function deleteTokenCookie() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
