const Album = require("../Classes/album")
/**
 * @param {string} token
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Album|Error}
 */
module.exports = async (token, datas, tag) => {
    return new Promise(async (resolve, reject) => {
        require("./treatAlbum&Playlist")(token, datas, tag, "album")
        .then(e => resolve(e))
        .catch(e => reject(e))
    })
}