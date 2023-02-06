const Base = require("./base")
class Track extends Base{
    #plateformToken;
    constructor(song){
        super(song)
        this.title = song.title
        this.url = song.url
        this.time = song.time
        this.artist_name = song.artist_name
        this.artist_url = song.artist_url
        this.requestor = song.requestor
        this.thumbnail = song.thumbnail
        this.place = song.place
        this.format = song.format ? song.format : null
        this.stream_url = song.stream_url ? song.stream_url : null
        this.type = "Track"
        this.#plateformToken = song.token
    }

    /**
     * @returns {object[]}
     */
    convertYTB(){
        return new Promise(async (resolve, reject) => {
            if(this.plateform === "Youtube") return resolve(this)
            else{
                require("../Youtube/search")(`${this.title} ${this.artist_name}`)
                .catch(err => reject(err))
                .then(datas => resolve(datas[0]))
            }
        })
    }

    /**
     * @returns {string}
     */
    streamLink(){
        return new Promise(async (resolve, reject) => {
            if(this.plateform === "Youtube"){
                return reject("Unavailable")
            }
            if(this.plateform === "Deezer"){
                return reject("Unavailable")
            }
            if(this.plateform === "Spotify"){
                return reject("Unavailable")
            }
            if(this.plateform === "SoundCloud"){
                require("../SoundCloud/stream")(this.#plateformToken, this.stream_url)
                .catch(err => reject(err) )
                .then(datas => resolve(datas))
            }
            else return reject("Invalid Platform")
        })
    }
}

module.exports = Track