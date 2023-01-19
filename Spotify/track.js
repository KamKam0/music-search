const Track = require("../Classes/track")
/**
 * @param {string} token 
 * @param {string} Arg 
 * @param {string} tag 
 * @param {boolean} state 
 * @returns {Track}
 */
module.exports = async (token, Arg, tag, state) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        if(!Arg) return reject('manque d\'informations')
        if(!Arg.includes("spotify") || !Arg.includes("track")) return reject('error 404')
        let base = Arg.split("track/")[1]
        let datas = await fetch(`https://api.spotify.com/v1/tracks/${base.includes("?") ? base.split("?")[0]: base}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        datas = await datas.json()
        if(datas.error?.status === 404) return reject('error 404')

        if(state){
            let ytdb_v = (await require("../Youtube/search")(`${datas.name} ${datas.artists[0].name}`, tag))[0]
            return resolve(ytdb_v)
        }else{
            let title = datas.name
            let url = datas.external_urls.spotify
            let time = Math.round(datas.duration_ms / 1000)
            let icon = null
            let artist_nom = datas.artists[0].name
            let artist_url = datas.artists[0].external_urls.spotify
            let requestor = tag ? tag : null
            let place = null
            let vd = {title, url, time, icon, artist_nom, artist_url, requestor, place}
            return resolve(new Track(vd))
        }
    })
}