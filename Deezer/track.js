const Track = require("../Classes/track")
const Error = require("../Classes/error")
/**
 * 
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Promise<Track|Error>}
 */
module.exports = async (Arg, tag, state) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        if(!Arg || typeof Arg !== "string") return reject(new Error("No valid argument given", 1))
        if(Arg.startsWith("https://deezer.page.link")) {
            let resolved = await require("./resolve")(Arg).catch(err => reject(err))
            Arg = resolved?.link
            if(!Arg) return
        }
        if(!require("./validate")(Arg, "track")) return reject(new Error("Incorrect URL", 2))

        let ID = Arg.split("/track/")[1]
        let datas = await fetch(`https://api.deezer.com/track/${ID.includes("?") ? ID.split("?")[0]: ID}`)
        datas = await datas.json()

        if(!datas || datas.error?.code === 800) return reject(new Error("Could not find the track", 9))
        
        let title = datas.title
        let url = datas.link
        let time = Number(datas.duration)
        let thumbnail = `https://e-cdns-images.dzcdn.net/images/cover/${datas.md5_image}/250x250-000000-80-0-0.jpg`
        let artist_name = datas.artist.name
        let artist_url = datas.artist.link
        let requestor = tag ? tag : null
        let place = null
        let track = new Track({title, url, time, thumbnail, artist_name, artist_url, requestor, place})
        if(!state) return resolve(track)
        track.convertYTB()
        .then(e => resolve(e))
        .reject(e => reject(e))
    })
}