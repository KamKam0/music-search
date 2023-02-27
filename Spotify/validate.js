/**
* 
* @param {string} url 
* @param {string} [filter]
* @returns {boolean}
*/
module.exports = (url, filter) => {
    if(typeof url !== "string" || !url.includes("https://") || (filter && !["track", "album", "playlist"].includes(filter))) return false
    if(url.startsWith("https://www.")) url = url.split("https://www.")[1]
    else if(url.startsWith("https://")) url = url.split("https://")[1]
    if(!url) return false

    if(!url.startsWith("open.spotify.com/")) return false
    
    url = url.split("open.spotify.com/")[1]

    if(!url) return false

    url = url.split("/")

    if(url.length !== 2) return false
    console.log(url)

    if(!["track", "album", 'playlist'].includes(url[0])) return false

    if(filter && url[0] !== filter) return false

    url = url[1]

    if(!url) return false

    if(url.includes("?")) url = url.split("?")[0]

    if(!url) return false


    url = url.split("")
    let compare = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    url = url.filter(caracter => caracter.toLowerCase() === caracter.toUpperCase() && !compare.includes(caracter))
    if(url.length) return false

    return true
}