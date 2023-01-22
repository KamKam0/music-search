const base = require("../Classes/baseStrucRes")

class SoundCloud extends base{
    constructor(){
        super("SoundCloud")
        /**
         * @private
         * @type {string}
         */
        this._token = null
        /**
         * @private
         * @type {string}
         */
        this._timestamp = null
    }

    /**
     * @private
     * @returns {string}
     */
    _getToken(){
        return new Promise(async (resolve, reject) => {
            if((Date.now() - Number(this._timestamp)) >= (1000 * 60 * 60)){
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
                        this._token = datas
                        this._timestamp = Date.now()
                        return resolve(this._token)
                    })
                })
                
            }else return resolve(this._token)
        })
    }

    getStream(url){
        return new Promise(async (resolve, reject) => {
            this._getToken().then(() => {
                require("./stream")(this._token, url)
                .catch(err => { return reject(err) })
                .then(datas => { return resolve(datas) })
            })
        })
    }
}

module.exports = SoundCloud