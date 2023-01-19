const Album = require("../Classes/album")
const Playlist = require("../Classes/playlist")
const Track = require("../Classes/track")

class Deezer{
    constructor(){
        this.type = 'Deezer'
        this.available = ["track", "resolve", "playlist", "album"]
    }


    /**
     * 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Track}
     */
    GetTrack(Arg, tag, state){
        return new Promise(async (resolve, reject) => {
            require("./track")(Arg, tag, state)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

    /**
     * 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Album}
     */
    GetAlbum(Arg, tag){
        return new Promise(async (resolve, reject) => {
            require("./album")(Arg, tag)
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
            require("./playlist")(Arg, tag)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

    /**
     * 
     * @param {string} Arg 
     * @returns {Playlist|Album|Track}
     */
    Resolve(Arg){
        return new Promise(async (resolve, reject) => {
            require("./resolve")(Arg)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

    /**
     * 
     * @param {string} type 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Track|Playlist|Album}
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

module.exports = Deezer