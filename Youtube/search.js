const Track = require("../Classes/track")
module.exports = async (Arg, tag) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        if(!Arg) return reject('manque d\'informations')
        let datas = await fetch(`https://www.youtube.com/results?search_query=${Arg}&sp=EgIQAQ%253D%253D`, {
            headers: {
                'accept-language': 'en-US,en;q=0.9',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
            }
        })

        
        datas = await datas.text()
        
        
        const data = datas
            .split('var ytInitialData = ')?.[1]
            ?.split(';</script>')[0]
            .split(/;\s*(var|const|let)/)[0];
        const json_data = JSON.parse(data);
        
        if(!json_data) return reject('error 404')
        

        let details = json_data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0]
            .itemSectionRenderer.contents;
        
            
        if(!details) return reject('error 404')
        
        if(!details[0]) return reject('error 404')
        
        details = details.filter(c => c.videoRenderer)
        
        if(!details[0]) return reject('error 404')
        
        details = details.filter(song => song.videoRenderer.lengthText?.simpleText).splice(0, 25)
        
        details = details.map(song => {
            song = song.videoRenderer; 
            let vd = {title: song.title.runs[0].text, url: `https://www.youtube.com/watch?v=${song.videoId}`, time: Number(`${(Number(song.lengthText.simpleText.split(":")[0]) * 60) + Number(song.lengthText.simpleText.split(":")[1])}`), icon: song.thumbnail.thumbnails[0].url, artist_nom: song.ownerText.runs[0].text, artist_url: `https://www.youtube.com/channel/${song.ownerText.runs[0].navigationEndpoint.browseEndpoint.browseId}`, requestor: tag ? tag : null, place: null}
            return new Track(vd)
        })
        
        if(!details[0]) return reject('error 404')
        return resolve(details)
    })
}