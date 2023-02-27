const Track = require("../Classes/track")
const Playlist = require("../Classes/playlist")
const Error = require("../Classes/error")
/**
 * @param {string} token
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Promise<Playlist|Error>}
 */
module.exports = async (token, Arg, tag) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        if(!Arg || typeof Arg !== "string") return reject(new Error("No valid argument given", 1))
        if(!require("./validate")(Arg, "playlist")) return reject(new Error("Incorrect URL", 2))
        let base = Arg.split("playlist/")[1]
        let datas = await fetch(`https://api.spotify.com/v1/playlists/${base.includes("?") ? base.split("?")[0]: base}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        datas = await datas.json()
        
        if(datas.error?.status === 404) return reject(new Error("Could not find the playlist", 7))
        
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
                if(song) return new Track({title: song.name, url: song.external_urls.spotify, time: Math.round(song.duration_ms / 1000), thumbnail: null, artist_name: song.artists[0].name, artist_url: song.artists[0].external_urls.spotify, requestor: tag ? tag : null, place: null})
                return undefined
            }).filter(e => e)
        }
        
        return resolve(new Playlist(result))
    })
}