const Playlist = require("../Classes/playlist")
const Track = require("../Classes/track")
module.exports = async (Arg, tag) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        if(!Arg) return reject('manque d\'informations')
        if(!Arg.startsWith("https://www.deezer.com/")) return reject('error deezer')
        if(!Arg.includes("deezer") || !Arg.includes("playlist")) return reject('error 404')
        let ID = Arg.split("/playlist/")[1]
        let datas = await fetch(`https://api.deezer.com/playlist/${ID}`)
        datas = await datas.json()
        if(datas.error?.type === "OAuthException" && datas.error?.code === 200) return reject('error private')
        if(!datas) return reject('error 404p')
        if(datas.error?.code === 800) return reject('error 404p')
        let result = {
            list: {
                title: datas.title,
                thumbnail: `https://e-cdns-images.dzcdn.net/images/cover/${datas.md5_image}/250x250-000000-80-0-0.jpg`,
                channel_name: datas.creator.name,
                channel_url: `https://www.deezer.com/fr/${datas.creator.type}/${datas.creator.id}`,
                url: `https://www.deezer.com/fr/album/${datas.id}`
            },
            songs: datas.tracks.data.map(song => {
                let title = song.title
                let url = song.link
                let time = Number(song.duration)
                let icon = `https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/250x250-000000-80-0-0.jpg`
                let artist_nom = song.artist.name
                let artist_url = `https://www.deezer.com/fr/artist/${song.artist.id}`
                let requestor = tag ? tag : null
                let place = null
                let vd = {title, url, time, icon, artist_nom, artist_url, requestor, place}
                return new Track(vd)
            })
        }
        return resolve(new Playlist(result))
    })
}