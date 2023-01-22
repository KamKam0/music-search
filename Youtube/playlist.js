const Track = require("../Classes/track")
const Playlist = require("../Classes/playlist")
const Error = require("../Classes/error")
/**
 * 
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Playlist|Error}
 */
module.exports = async (Arg, tag) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        if(!Arg || typeof Arg !== "string") return reject(new Error("No valid argument given", 1))
        if((!Arg.includes("youtube") || !Arg.includes("list=")) || (!Arg.includes("/watch?v=") && !Arg.includes("/playlist"))) return reject(new Error("Incorrect URL", 2))
        let ID = Arg.split("list=")[1]
        if(!ID) return reject(new Error("Could not find the ID of the playlist", 3))
        ID.split("&")[0]
        let datas = await fetch(`https://www.youtube.com/playlist?list=${ID}`, {
            headers: {
                'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8,hi;q=0.7',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
            }
        })
        datas = await datas.text()
        
        if (datas.indexOf('Our systems have detected unusual traffic from your computer network.') !== -1) return reject(new Error("Error interacting with youtube", 6))
        
        const first_datas = JSON.parse(datas.split('var ytInitialData = ')[1].split(';</script>')[0]);
        
        if(first_datas.alerts) return reject(new Error("Could not find the plyalist", 7))
        
        const playlistDetails = JSON.parse(datas.split('{"playlistSidebarRenderer":')[1].split('}};</script>')[0]).items
        
        const videos = JSON.parse(`${datas.split('{"playlistVideoListRenderer":{"contents":')[1].split('}],"playlistId"')[0]}}]`);
        
        videos.map(async music =>{
            music = music.playlistVideoRenderer
            if(music && music.lengthSeconds){
                let title = music.title.runs[0].text
                let url = `https://www.youtube.com/watch?v=${music.videoId}`
                let time = Number(music.lengthSeconds)
                let icon = music.thumbnail.thumbnails[0].url
                let artist_nom = music.shortBylineText.runs[0].text
                let artist_url = `https://www.youtube.com/channel/${music.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.browseId}`
                let requestor = tag ? tag : null
                let place = null
                return new Track({title, url, time, icon, artist_nom, artist_url, requestor, place})
            }
            return undefined
        }).filter(e => e)
        let result = {
            list: {
                title: playlistDetails[0].playlistSidebarPrimaryInfoRenderer.title.runs[0].text,
                thumbnail: playlistDetails[0].playlistSidebarPrimaryInfoRenderer.thumbnailRenderer.playlistVideoThumbnailRenderer.thumbnail.thumbnails[0].url,
                channel_name: playlistDetails[1].playlistSidebarSecondaryInfoRenderer.videoOwner.videoOwnerRenderer.title.runs[0].text,
                channel_url: `https://www.youtube.com/channel/${playlistDetails[1].playlistSidebarSecondaryInfoRenderer.videoOwner.videoOwnerRenderer.title.runs[0].navigationEndpoint.browseEndpoint.browseId}`,
                url: `https://www.youtube.com/playlist?list=${playlistDetails[0].playlistSidebarPrimaryInfoRenderer.title.runs[0].navigationEndpoint.watchEndpoint.playlistId}`
            },
            songs: videos
        }
        
        return resolve(new Playlist(result))
    })
}