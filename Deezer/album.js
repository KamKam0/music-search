const Album = require("../Classes/album")
const Track = require("../Classes/track")
const Error = require("../Classes/error")
/**
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Promise<Album|Error>}
 */
module.exports = async (Arg, tag) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        if(!Arg || typeof Arg !== "string") return reject(new Error("No valid argument given", 1))
        if(Arg.startsWith("https://deezer.page.link")) {
            let resolved = await require("./resolve")(Arg).catch(err => reject(err))
            Arg = resolved?.link
            if(!Arg) return
        }
        if(!require("./validate")(Arg, "album")) return reject(new Error("Incorrect URL", 2))

        let ID = Arg.split("/album/")[1]
        let datas = await fetch(`https://api.deezer.com/album/${ID.includes("?") ? ID.split("?")[0]: ID}`)
        datas = await datas.json()

        if(!datas || datas.error?.code === 800) return reject(new Error("Could not find the album", 8))

        let result = {
            list: {
                title: datas.title,
                thumbnail: `https://e-cdns-images.dzcdn.net/images/cover/${datas.md5_image}/250x250-000000-80-0-0.jpg`,
                channel_name: datas.artist.name,
                channel_url: `https://www.deezer.com/fr/artist/${datas.artist.id}`,
                url: `https://www.deezer.com/fr/album/${datas.id}`
            },
            songs: datas.tracks.data.map(song => {
                let title = song.title
                let url = song.link
                let time = Number(song.duration)
                let thumbnail = `https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/250x250-000000-80-0-0.jpg`
                let artist_name = song.artist.name
                let artist_url = `https://www.deezer.com/fr/artist/${datas.artist.id}`
                let requestor = tag ? tag : null
                let place = null
                return new Track({title, url, time, thumbnail, artist_name, artist_url, requestor, place})
            })
        }
        return resolve(new Album(result))
    })
}