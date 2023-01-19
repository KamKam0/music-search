class base{
    constructor(datas){
        this.url = datas.list?.url || datas.url
        this.plateforme = this.#getPlatform()
    }

    #getPlatform(){
        if(this.url.includes("youtube")) return "Youtube"
        else if(this.url.includes("spotify")) return "Spotify"
        else if(this.url.includes("soundcloud")) return "SoundCloud"
        else if(this.url.includes("deezer")) return "Deezer"
        else return undefined
    }
}

module.exports = base