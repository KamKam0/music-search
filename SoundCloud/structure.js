class SoundCloud{
    constructor(){
        this.token = null
        this.timestamp = null
        this.type = 'SoundCloud'
        this.available = ["resolve"]
    }

    GetToken(){
        return new Promise(async (resolve, reject) => {
            if((Date.now() - Number(this.timestamp)) >= (1000 * 60 * 60)){
                const fetch = require("node-fetch")
                fetch("https://soundcloud.com/").then(async res => {
                    res = await res.text()
                    res = String(res).split('</script>')
                    res = res.filter(r => r.startsWith('\n<script crossorigin src='))
                    res = res[res.length - 1].split('src="')[1].split('">')[0]
                    fetch(res).then(async datas => {
                        datas = await datas.text()
                        datas = datas.split(',client_id:"')[1]
                        datas = datas.split('"')[0]
                        this.token = datas
                        this.timestamp = Date.now()
                        return resolve(this.token)
                    })
                })
                
            }else return resolve(this.token)
        })
    }

    Resolve(Arg, tag){
        return new Promise(async (resolve, reject) => {
            this.GetToken().then(() => {
                require("./resolve")(this.token, Arg, tag)
                .catch(err => { return reject(err) })
                .then(datas => { return resolve(datas) })
            })
        })
    }

    GetStream(url){
        return new Promise(async (resolve, reject) => {
            this.GetToken().then(() => {
                require("./stream")(this.token, url)
                .catch(err => { return reject(err) })
                .then(datas => { return resolve(datas) })
            })
        })
    }

    Get(type, Arg, tag, state){
        return new Promise(async (resolve, reject) => {
            if(!this.available.includes(type)) return reject("invalid type")
            this.GetToken().then(() => {
                require(`./${type}`)(this.token, Arg, tag, state)
                .catch(err => { return reject(err) })
                .then(datas => { return resolve(datas) })
            })
        })
    }
}

module.exports = SoundCloud