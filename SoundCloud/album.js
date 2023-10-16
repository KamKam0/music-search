const Album = require("../Classes/album")
const analyseAlbumAndPlaylist = require("./treatAlbum&Playlist")
/**
 * @param {string} token
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Promise<Album|Error>}
 */
module.exports = async (token, datas, tag) => {
    return new Promise(async (resolve, reject) => {
        analyseAlbumAndPlaylist(token, datas, tag, "album")
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
}