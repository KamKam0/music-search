const Album = require("../Classes/album")
const Playlist = require("../Classes/playlist")
const Track = require("../Classes/track")

class Spotify{
    constructor(client_id, client_secret){
        this.id = client_id
        this.secret = client_secret
        this.token = null
        this.timestamp = null
        this.type = 'Spotify'
        this.available = ["track", "album", "playlist"]
    }

    /**
     * 
     * @returns {string}
     */
    GetToken(){
        return new Promise(async (resolve, reject) => {
            if((Date.now() - Number(this.timestamp)) >= (1000 * 60 * 60)){
                const encode = new Buffer.from(`${this.id}:${this.secret}`).toString("base64")
                const opts = {
                    body: 'grant_type=client_credentials',
                    headers: {
                        'Authorization': `Basic ${encode}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: "POST",
                    json: true
                }
                const fetch = require("node-fetch")
                let datas = await fetch("https://accounts.spotify.com/api/token", opts)
                datas = await datas.json()
                let token = datas.access_token
                if(token){
                    this.token = token
                    this.timestamp = Date.now()
                    return resolve(token)
                }else return reject(token)
                
            }return resolve(this.token)
        })
    }

    /**
     * @param {string} Arg 
     * @param {string} tag 
     * @param {boolean} state 
     * @returns {Track}
     */
    GetTrack(Arg, tag, state){
        return new Promise(async (resolve, reject) => {
            this.GetToken().then(() => {
                require("./track")(this.token, Arg, tag, state)
                .catch(err => { return reject(err) })
                .then(datas => { return resolve(datas) })
            })
        })
    }

    /**
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Album}
     */
    GetAlbum(Arg, tag){
        return new Promise(async (resolve, reject) => {
            this.GetToken().then(() => {
                require("./album")(this.token, Arg, tag)
                .catch(err => { return reject(err) })
                .then(datas => { return resolve(datas) })
            })
        })
    }


    /**
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Playlist}
     */
    GetPlaylist(Arg, tag){
        return new Promise(async (resolve, reject) => {
            this.GetToken().then(() => {
                require("./playlist")(this.token, Arg, tag)
                .catch(err => { return reject(err) })
                .then(datas => { return resolve(datas) })
            })
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

module.exports = Spotify