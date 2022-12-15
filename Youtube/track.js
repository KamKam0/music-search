const Track = require("../Classes/track")
module.exports = async (Arg, tag) => {
    return new Promise(async (resolve, reject) => {

        const fetch = require("node-fetch")
        if(!Arg) return reject('manque d\'informations')
        if(!Arg.includes("youtube")) return reject('error 404')
        if(!Arg.startsWith("https://www.youtube.com/watch?v=")) return reject('error 404')
        let ID = Arg.split("?v=")[1]
        let data = await fetch(`https://www.youtube.com/watch?v=${ID}&has_verified=1`, {
            headers: {
                'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8,hi;q=0.7',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
            }
        })
        let datas = await data.text()
        if (datas.indexOf('Our systems have detected unusual traffic from your computer network.') !== -1) return reject('error 404')
        
        let vdatas = datas
        .split('var ytInitialPlayerResponse = ')

        if(!vdatas[0] || !vdatas[1]) return reject('error 404')
        
        vdatas = vdatas[1]
        .split(';</script>')
        
        if(!vdatas[0]) return reject('error 404')
        
        vdatas = vdatas[0]
        .split(/;\s*(var|const|let)/)
        
        if(!vdatas[0]) return reject('error 404')
        
        vdatas = JSON.parse(vdatas[0])
        
        if (vdatas.playabilityStatus.status !== 'OK') return reject('error 404')
        
        if(String(vdatas.videoDetails.isLiveContent) === "true") return reject('error live')

        let title = vdatas.videoDetails.title
        let url = `https://www.youtube.com/watch?v=${vdatas.videoDetails.videoId}`
        let time = Number(vdatas.videoDetails.lengthSeconds)
        let icon = vdatas.videoDetails.thumbnail.thumbnails[0].url
        let artist_nom = vdatas.videoDetails.author
        let artist_url = `https://www.youtube.com/channel/${vdatas.videoDetails.channelId}`
        let requestor = tag ? tag : null
        let place = null
        let format = [...(vdatas.streamingData.formats ?? []), ...(vdatas.streamingData.adaptiveFormats ?? [])]
        let vd = {title, url, time, icon, artist_nom, artist_url, requestor, place, format}
        return resolve(new Track(vd))
    })
}