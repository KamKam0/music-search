const Base = require("./base")
class Track extends Base{
    #plateformeToken;
    constructor(song){
        super(song)
        this.title = song.title
        this.url = song.url
        this.time = song.time
        this.artist_nom = song.artist_nom
        this.artist_url = song.artist_url
        this.requestor = song.requestor
        this.icon = song.icon
        this.place = song.place
        this.format = song.format ? song.format : null
        this.stream_url = song.stream_url ? song.stream_url : null
        this.type = "Track"
        this.#plateformeToken = song.token
    }

    convertYTB(){
        return new Promise(async (resolve, reject) => {
            if(this.plateforme === "Youtube") return resolve(this)
            else{
                require("../Youtube/search")(`${this.title} ${this.artist_nom}`)
                .catch(err => reject(err))
                .then(datas => resolve(datas[0]))
            }
        })
    }

    streamLink(){
        return new Promise(async (resolve, reject) => {
            if(this.plateforme === "Youtube"){
                return reject("Unavailable")
            }
            if(this.plateforme === "Deezer"){
                return reject("Unavailable")
            }
            if(this.plateforme === "Spotify"){
                return reject("Unavailable")
            }
            if(this.plateforme === "SoundCloud"){
                require("../SoundCloud/stream")(this.#plateformeToken, this.stream_url)
                .catch(err => reject(err) )
                .then(datas => resolve(datas))
            }
            else return reject("Invalid Platform")
        })
    }
}

module.exports = Track