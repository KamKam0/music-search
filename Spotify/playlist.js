const Track = require("../Classes/track")
const Playlist = require("../Classes/playlist")
/**
 * @param {string} token
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Playlist}
 */
module.exports = async (token, Arg, tag) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        if(!Arg) return reject('manque d\'informations')
        if(!Arg.includes("spotify") || !Arg.includes("playlist")) return reject('error 404')
        let base = Arg.split("playlist/")[1]
        let datas = await fetch(`https://api.spotify.com/v1/playlists/${base.includes("?") ? base.split("?")[0]: base}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        datas = await datas.json()
        
        if(datas.error?.status === 404) return reject('error 404p')
        
        let result = {
            list: {
                title: datas.name,
                thumbnail: datas.images[0].url,
                channel_name: datas.owner.display_name,
                channel_url: datas.owner.external_urls.spotify,
                url: datas.external_urls.spotify
            },
            songs: datas.tracks.items.filter(song => song.track !== null).map(song => {
                song = song.track
                let dv = {title: song.name, url: song.external_urls.spotify, time: Math.round(song.duration_ms / 1000), icon: null, artist_nom: song.artists[0].name, artist_url: song.artists[0].external_urls.spotify, requestor: tag ? tag : null, place: null}
                return new Track(dv)
            })
        }
        
        return resolve(new Playlist(result))
    })
}