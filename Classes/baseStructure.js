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
            this.__requestMaker("track", Arg, tag, state)
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
            this.__requestMaker("playlist", Arg, tag)
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
            this.__requestMaker(type, Arg, tag)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    __requestMaker(type, arg, tag, state){
        return new Promise(async (resolve, reject) => {
            this.__getToken()
            .then(() => {
                if(this.__token) require(`../${this.type}/${type}`)(this.__token, arg, tag, state).catch(err => reject(err)).then(datas => resolve(datas))
                else require(`../${this.type}/${type}`)(arg, tag, state).catch(err => reject(err)).then(datas => resolve(datas))
            }).catch(err => {})
        })
    }

    __getToken(){
        return new Promise(async (resolve, reject) => {
            resolve()
        })
    }
}

module.exports = Base