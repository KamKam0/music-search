const Playlist = require("./playlist")
const Track = require("./track")
const Error = require("./error")
const fs = require("fs")

class Base{
    constructor(name){
        this.type = name
        this.available = ["track", "resolve", "playlist", "album", "search"].filter(element => fs.readdirSync(require.resolve(`../${this.type}/structure`).split("/structure")[0]).find(dispo => dispo.split(".")[0] === element))
    }

    /**
     * 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Track}
     */
    getTrack(Arg, tag, state){
        return new Promise(async (resolve, reject) => {
            this._requestMaker("track", Arg, tag, state)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Playlist}
     */
    getPlaylist(Arg, tag){
        return new Promise(async (resolve, reject) => {
            this._requestMaker("playlist", Arg, tag)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {string} type 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Track|Playlist|Album}
     */
    get(type, Arg, tag){
        return new Promise(async (resolve, reject) => {
            if(!this.available.includes(type)) return reject(new Error("Invalid type of research", 15))
            this._requestMaker(type, Arg, tag)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * @private
     * @param {string} type 
     * @param {string} arg 
     * @param {string} tag 
     * @param {boolean} state 
     * @returns 
     */
    _requestMaker(type, arg, tag, state){
        return new Promise(async (resolve, reject) => {
            this._getToken()
            .then(() => {
                if(this._token) require(`../${this.type}/${type}`)(this._token, arg, tag, state).catch(err => reject(err)).then(datas => resolve(datas))
                else require(`../${this.type}/${type}`)(arg, tag, state).catch(err => reject(err)).then(datas => resolve(datas))
            }).catch(err => {})
        })
    }

    /**
     * 
     * @returns {undefined}
     */
    _getToken(){
        return new Promise(async (resolve, reject) => {
            resolve()
        })
    }
}

module.exports = Base