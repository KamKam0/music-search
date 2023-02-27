const Playlist = require("../Classes/playlist")
/**
 * @param {string} token
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Promise<Playlist|Error>}
 */
module.exports = async (token, datas, tag) => {
    return new Promise(async (resolve, reject) => {
        require("./treatAlbum&Playlist")(token, datas, tag, "playlist")
        .then(e => resolve(e))
        .catch(e => reject(e))
    })
}