const base = require("../Classes/baseStrucAl")

class Spotify extends base{
    constructor(client_id, client_secret){
        super("Spotify")
        this.__id = client_id
        this.__secret = client_secret
        this.__token = null
        this.__timestamp = null
    }

    /**
     * 
     * @returns {string}
     */
    __getToken(){
        return new Promise(async (resolve, reject) => {
            if((Date.now() - Number(this.__timestamp)) >= (1000 * 60 * 60)){
                const encode = new Buffer.from(`${this.__id}:${this.__secret}`).toString("base64")
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
                    this.__token = token
                    this.__timestamp = Date.now()
                    return resolve(token)
                }else return reject(token)
                
            }return resolve(this.__token)
        })
    }
}

module.exports = Spotify