class Deezer{
    constructor(){
        this.type = 'Deezer'
        this.available = ["track", "resolve", "playlist", "album"]
    }

    GetTrack(Arg, tag, state){
        return new Promise(async (resolve, reject) => {
            require("./track")(Arg, tag, state)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

    GetAlbum(Arg, tag){
        return new Promise(async (resolve, reject) => {
            require("./album")(Arg, tag)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

    GetPlaylist(Arg, tag){
        return new Promise(async (resolve, reject) => {
            require("./playlist")(Arg, tag)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

    Resolve(Arg){
        return new Promise(async (resolve, reject) => {
            require("./resolve")(Arg)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

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