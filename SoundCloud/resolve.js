const Track = require("../Classes/track")
const Album = require("../Classes/album")
const Playlist = require("../Classes/playlist")
const Error = require("../Classes/error")
/**
 * @param {string} token
 * @param {string} Arg 
 * @returns {Track|Album|Playlist|Error}
 */
module.exports = async (token, Arg) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")

        if(!Arg || typeof Arg !== "string") return reject(new Error("No valid argument given", 1))

        let datas = await fetch(`https://api-v2.soundcloud.com/resolve?url=${encodeURI(Arg)}&client_id=${token}`)
        
        if(!datas) return reject(new Error("Cannot resolve this URL", 14))
        
        datas = await datas.json()

        if(["playlist", "track", "album"].includes(datas.kind)) return resolve({type: datas.kind, datas})
        return reject(new Error("Cannot resolve this URL", 14))
    })
}