const Playlist = require("../Classes/playlist")
const Track = require("../Classes/track")

class Youtube{
    constructor(){
        /**
         * @param {string} type
         */
        this.type = 'Youtube'
        /**
         * @param {object[]} type
         */
        this.available = ["track", "search", "playlist"]
    }

    /**
     * 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Track}
     */
    GetTrack(Arg, tag){
        return new Promise(async (resolve, reject) => {
            require("./track")( Arg, tag)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

    /**
     * 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {object[]}
     */
    Search(Arg, tag){
        return new Promise(async (resolve, reject) => {
            require("./search")( Arg, tag)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

    /**
     * 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Playlist}
     */
    GetPlaylist(Arg, tag){
        return new Promise(async (resolve, reject) => {
            require("./playlist")( Arg, tag)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

    /**
     * 
     * @param {string} type 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Track|Playlist|object[]}
     */
    Get(type, Arg, tag){
        return new Promise(async (resolve, reject) => {
            if(!this.available.includes(type)) return reject("invalid type")
            require(`./${type}`)(Arg, tag)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }
}

module.exports = Youtube