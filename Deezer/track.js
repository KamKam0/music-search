const Track = require("../Classes/track")
module.exports = async (Arg, tag, state) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        if(!Arg.startsWith("https://www.deezer.com/")) return reject('error deezer')
        if(!Arg.includes("deezer") || !Arg.includes("track")) return reject('error 404')
        if(!Arg) return reject('manque d\'informations')
        let ID = Arg.split("/track/")[1]
        let datas = await fetch(`https://api.deezer.com/track/${ID}`)
        datas = await datas.json()
        if(!datas) return reject('error 404')
        if(datas.error?.code === 800) return reject('error 404')
        if(state){
            let ytdb_v = (await require("../Youtube/search")(`${datas.title} ${datas.artist.name}`, tag))[0]
            return resolve(ytdb_v)
        }else{
            let title = datas.title
            let url = datas.link
            let time = Number(datas.duration)
            let icon = `https://e-cdns-images.dzcdn.net/images/cover/${datas.md5_image}/250x250-000000-80-0-0.jpg`
            let artist_nom = datas.artist.name
            let artist_url = datas.artist.link
            let requestor = tag ? tag : null
            let place = null
            let vd = {title, url, time, icon, artist_nom, artist_url, requestor, place}
            return resolve(new Track(vd))
        }
    })
}