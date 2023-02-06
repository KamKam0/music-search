const Base = require("./base")
class Playlist extends Base{
    constructor(datas){
        super(datas)
        this.title = datas.list.title
        this.thumbnail = datas.list.thumbnail
        this.channel_name = datas.list.channel_name
        this.channel_url = datas.list.channel_url
        this.songs = datas.songs
        this.plateform = this.getPlatform()
        this.type = "Playlist"
    }

    getPlatform(){
        if(this.url.includes("youtube")) return "Youtube"
        else if(this.url.includes("spotify")) return "Spotify"
        else if(this.url.includes("soundcloud")) return "SoundCloud"
        else if(this.url.includes("deezer")) return "Deezer"
        else return undefined
    }
}

module.exports = Playlist