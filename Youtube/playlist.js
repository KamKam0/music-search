const Track = require("../Classes/track")
const Playlsit = require("../Classes/playlist")
module.exports = async (Arg, tag) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        if(!Arg) return reject('manque d\'informations')
        
        if(!Arg.includes("youtube") || !Arg.includes("list")) return reject('error 404')
        if(!Arg.startsWith("https://www.youtube.com/watch?v=")) return reject('error 404')
        if(!Arg.includes("&list=")) return reject('error 404')
        let ID = Arg.split("&list=")[1]
        let datas = await fetch(`https://www.youtube.com/playlist?list=${ID}`, {
            headers: {
                'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8,hi;q=0.7',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
            }
        })
        datas = await datas.text()
        
        if (datas.indexOf('Our systems have detected unusual traffic from your computer network.') !== -1) return reject('error 404')
        
        const first_datas = JSON.parse(datas.split('var ytInitialData = ')[1].split(';</script>')[0]);
        
        if(first_datas.alerts) return reject('error 404')
        
        const playlistDetails = JSON.parse(datas.split('{"playlistSidebarRenderer":')[1].split('}};</script>')[0]).items
        
        const videos = JSON.parse(`${datas.split('{"playlistVideoListRenderer":{"contents":')[1].split('}],"playlistId"')[0]}}]`);
        let provisoire = []
        
        videos.forEach(async music =>{
            music = music.playlistVideoRenderer
            if(music.lengthSeconds){
                let title = music.title.runs[0].text
                let url = `https://www.youtube.com/watch?v=${music.videoId}`
                let time = Number(music.lengthSeconds)
                let icon = music.thumbnail.thumbnails[0].url
                let artist_nom = music.shortBylineText.runs[0].text
                let artist_url = `https://www.youtube.com/channel/${music.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.browseId}`
                let requestor = tag ? tag : null
                let place = null
                let vd = {title, url, time, icon, artist_nom, artist_url, requestor, place}
                provisoire.push(new Track(vd))
            }
        })
        let result = {
            list: {
                title: playlistDetails[0].playlistSidebarPrimaryInfoRenderer.title.runs[0].text,
                thumbnail: playlistDetails[0].playlistSidebarPrimaryInfoRenderer.thumbnailRenderer.playlistVideoThumbnailRenderer.thumbnail.thumbnails[0].url,
                channel_name: playlistDetails[1].playlistSidebarSecondaryInfoRenderer.videoOwner.videoOwnerRenderer.title.runs[0].text,
                channel_url: `https://www.youtube.com/channel/${playlistDetails[1].playlistSidebarSecondaryInfoRenderer.videoOwner.videoOwnerRenderer.title.runs[0].navigationEndpoint.browseEndpoint.browseId}`,
                url: `https://www.youtube.com/playlist?list=${playlistDetails[0].playlistSidebarPrimaryInfoRenderer.title.runs[0].navigationEndpoint.watchEndpoint.playlistId}`
            },
            songs: provisoire
        }
        
        return resolve(new Playlsit(result))
    })
}