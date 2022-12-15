class Album{
    constructor(datas){
        this.title = datas.list.title,
        this.icon = datas.list.thumbnail,
        this.channel_name = datas.list.channel_name,
        this.channel_url = datas.list.channel_url,
        this.url = datas.list.url
        this.songs = datas.songs
        this.plateforme = this.getPlatform()
        this.type = "Album"
    }

    getPlatform(){
        if(this.url.includes("youtube")) return "Youtube"
        else if(this.url.includes("spotify")) return "Spotify"
        else if(this.url.includes("soundcloud")) return "SoundCloud"
        else if(this.url.includes("deezer")) return "Deezer"
        else return undefined
    }
}

module.exports = Album