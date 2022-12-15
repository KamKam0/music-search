class Youtube{
    constructor(){
        this.type = 'Youtube'
        this.available = ["track", "search", "playlist"]
    }

    GetTrack(Arg, tag){
        return new Promise(async (resolve, reject) => {
            require("./track")( Arg, tag)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

    Search(Arg, tag){
        return new Promise(async (resolve, reject) => {
            require("./search")( Arg, tag)
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

    GetPlaylist(Arg, tag){
        return new Promise(async (resolve, reject) => {
            require("./playlist")( Arg, tag)
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

module.exports = Youtube