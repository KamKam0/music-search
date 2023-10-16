const Track = require("../Classes/track")
const Album = require("../Classes/album")
const Playlist = require("../Classes/playlist")
const Error = require("../Classes/error")
const fetch = require("node-fetch")
const analyser = require("./analyseDatas")
const validate = require("./validate")
const resolver = require("./resolve")
/**
 * @param {string} token
 * @param {string} Arg 
 * @returns {Promise<Album|Playlist|Error>}
 */
module.exports = async (token, datas, type) => {
    return new Promise(async (resolve, reject) => {
        if(datas && typeof datas === "string" && validate(datas)){
            let resolved = await resolver(token, datas).catch(err => reject(err))
            if(!resolved) return
            if(resolved.type !== "playlist") return reject(new Error("Incorrect URL", 2))
            datas = resolved.datas
        }
        if(!datas || typeof datas !== "object") return reject(new Error("No valid argument given", 1))
        let res = datas.tracks.filter(track => track.title && track.media).map(track =>  new Track({...analyser(track), token}))

        let to_search = datas.tracks.filter(track => !track.title || !track.media)

        if(to_search[0]){
            var restmusic = await fetch(`https://api-v2.soundcloud.com/tracks?ids=${to_search.map(track => track.id).toString()}&client_id=${token}`)
            restmusic = await restmusic.json()
            res.push(...restmusic.map(track =>  new Track({...analyser(track), token})))
        }
        
        let result = {
            list: {
                title: datas.permalink,
                thumbnail: datas.artwork_url,
                channel_name: datas.user.full_name,
                channel_url: `https://soundcloud.com/${datas.user.permalink}`,
                url: datas.permalink_url,
                type: datas.kind
            },
            songs: res
        }
        let resultReturn = type === "Album" ? new Album(result) : new Playlist(result)
        return resolve(resultReturn)
    })
}