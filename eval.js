module.exports = (url) => {
    if(!url) return 'informations manquantes'
    let result = {plateforme: null, type: null, emoji: null, link: null}
    if(url.startsWith("https://youtu.be/")) url = `https://www.youtube.com/watch?v=${url.split(".be/")[1]}`
    
    if(url.includes("https")){
        if(url.includes("youtube")) {
            result.plateforme = 'Youtube'
            result.emoji = "<:YouTube:888357874043084821>"
            result.link = url
            if(url.includes("list")) result.type = "playlist"
            else result.type = "track"
        }
        if(url.includes("spotify")){
            result.plateforme = 'Spotify'
            result.emoji = "<:Spotify:888359604956823552>"
            result.link = url
            if(url.includes("playlist")) result.type = "playlist"
            else if(url.includes("album")) result.type = "album"
            else result.type = "track"
        }
        if(url.includes("soundcloud")){
            result.plateforme = 'SoundCloud'
            result.emoji = "<:SoundCloud:888359649198362635>"
            result.link = url
            result.type = "resolve"
        }
        if(url.includes("deezer")){
            result.plateforme = 'Deezer'
            result.emoji = "<:Deezer:900062780005183508>"
            result.link = url
            if(url.includes("deezer.page.link")) result.type = "resolve"
            else if(url.includes("playlist")) result.type = "playlist"
            else if(url.includes("album")) result.type = "album"
            else result.type = "track"
        }
    }else {
        result.plateforme = 'Youtube'
        result.emoji = "<:YouTube:888357874043084821>"
        result.link = url
        result.type = "search"
    }
    return result
}