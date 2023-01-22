const Track = require("../Classes/track")
const Playlist = require("../Classes/playlist")
const Error = require("../Classes/error")
const fetch = require("node-fetch")
const analyser = require("./analyseDatas")
/**
 * @param {string} token
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Playlist|Error}
 */
module.exports = async (token, datas, tag) => {
    return new Promise(async (resolve, reject) => {
        if(!datas || typeof datas !== "object") return reject(new Error("No valid argument given", 1))
        let res = datas.tracks.filter(track => track.title && track.media).map(track => new Track({...analyser(track, tag), token}))

        let to_search = datas.tracks.filter(track => !track.title || !track.media)

        if(to_search[0]){
            var restmusic = await fetch(`https://api-v2.soundcloud.com/tracks?ids=${to_search.map(track => track.id).toString()}&client_id=${token}`)
            restmusic = await restmusic.json()
            res.push(...restmusic.map(track => new Track({...analyser(track, tag), token})))
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
        
        return resolve(new Playlist(result))
    })
}