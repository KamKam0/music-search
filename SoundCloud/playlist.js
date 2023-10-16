const Playlist = require("../Classes/playlist")
const analyseAlbumAndPlaylist = require("./treatAlbum&Playlist")
/**
 * @param {string} token
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Promise<Playlist|Error>}
 */
module.exports = async (token, datas, tag) => {
    return new Promise(async (resolve, reject) => {
        analyseAlbumAndPlaylist(token, datas, tag, "playlist")
        .then(e => resolve(e))
        .catch(e => reject(e))
    })
}