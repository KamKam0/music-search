const Track = require("../Classes/track")
const Playlist = require("../Classes/playlist")
const fetch = require("node-fetch")
module.exports = async (token, datas, tag) => {
    return new Promise(async (resolve, reject) => {
        let provisoire = []
        let to_push = datas.tracks.filter(track => track.title && track.media).map(track => {
            let title = track.title
            let url = track.permalink_url
            let time = Number(String(track.duration / 1000).split(".")[0])
            let icon = track.artwork_url
            let artist_nom;
            if(track.publisher_metadata) artist_nom = track.publisher_metadata?.artist
            else artist_nom = track.user.username
            let artist_url;
            if(track.publisher_metadata) artist_url = `https://soundcloud.com/secret-service-${track.publisher_metadata?.id}`
            else artist_url = `https://soundcloud.com/secret-service-${track.user.id}`
            let stream_url; 
            if(track.media.transcodings.filter( transcoding => transcoding.format.protocol === 'progressive' )[0]) stream_url = track.media.transcodings.filter( transcoding => transcoding.format.protocol === 'progressive' )[0].url
            else stream_url = track.media.transcodings[0].url
            let requestor = tag ? tag : null
            let place = null
            let vd = {title, url, time, icon, artist_nom, stream_url, artist_url, requestor, place}
            return new Track(vd)
        })

        provisoire.push(...to_push)

        let to_search = datas.tracks.filter(track => !track.title || !track.media)

        if(to_search[0]){
            var restmusic = await fetch(`https://api-v2.soundcloud.com/tracks?ids=${to_search.map(track => track.id).toString()}&client_id=${token}`)
            restmusic = await restmusic.json()
            let to_push2 = restmusic.map(track => {
                let title = track.title
                let url = track.permalink_url
                let time = Number(String(track.duration / 1000).split(".")[0])
                let icon = track.artwork_url
                let artist_nom;
                if(track.publisher_metadata) artist_nom = track.publisher_metadata?.artist
                else artist_nom = track.user.username
                let artist_url;
                if(track.publisher_metadata) artist_url = `https://soundcloud.com/secret-service-${track.publisher_metadata?.id}`
                else artist_url = `https://soundcloud.com/secret-service-${track.user.id}`
                let stream_url; 
                if(track.media.transcodings.filter( transcoding => transcoding.format.protocol === 'progressive' )[0]) stream_url = track.media.transcodings.filter( transcoding => transcoding.format.protocol === 'progressive' )[0].url
                else stream_url = track.media.transcodings[0].url
                let requestor = tag ? tag : null
                let place = null
                let vd = {title, url, time, icon, artist_nom, stream_url, artist_url, requestor, place}
                return new Track(vd)
            })
            provisoire.push(...to_push2)
        }
        
        let result = {
            list: {
                title: datas.permalink,
                thumbnail: datas.artwork_url,
                channel_name: datas.user.full_name,
                channel_url: `https://soundcloud.com/${datas.user.permalink}`,
                url: datas.permalink_url,
                type: datas.kind
            },
            songs: provisoire
        }
        
        return resolve(new Playlist(result))
    })
}