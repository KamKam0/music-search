const base = require("../Classes/baseStrucAl")

class Spotify extends base{
    constructor(client_id, client_secret){
        super("Spotify")
        /**
         * @private
         * @type {string}
         */
        this._id = client_id
        /**
         * @private
         * @type {string}
         */
        this._secret = client_secret
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
                const encode = new Buffer.from(`${this._id}:${this._secret}`).toString("base64")
                const opts = {
                    body: 'grant_type=client_credentials',
                    headers: {
                        'Authorization': `Basic ${encode}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: "POST",
                    json: true
                }
                const fetch = require("node-fetch")
                let datas = await fetch("https://accounts.spotify.com/api/token", opts)
                datas = await datas.json()
                let token = datas.access_token
                if(token){
                    this._token = token
                    this._timestamp = Date.now()
                    return resolve(token)
                }else return reject(token)
                
            }return resolve(this._token)
        })
    }
}

module.exports = Spotify