const track = require("./track")
const album = require("./album")
const playlist = require("./playlist")
module.exports = async (token, Arg, tag) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")

        let datas = await fetch(`https://api-v2.soundcloud.com/resolve?url=${encodeURI(Arg)}&client_id=${token}`)
        
        if(!datas) return reject('error 404')
        
        datas = await datas.json()

        switch(datas.kind){
            case("playlist"):
                playlist(token, datas, tag)
                .catch(err => {return reject(err)})
                .then(data => {return resolve(data)})
            break;
            case("album"):
                return resolve(album(token, datas, tag))
                .catch(err => {return reject(err)})
                .then(data => {return resolve(data)})
            break;
            case("track"):
                return resolve(track(datas, tag))
            break;
            default:
                return reject('error 404')
            break;
        }
    })
}