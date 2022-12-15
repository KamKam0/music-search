module.exports = async (Arg) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        if(!Arg) return reject('manque d\'informations')
        
        if(!Arg.startsWith("https://deezer.page.link")) return reject('error deezer')

        let first_data = await fetch(Arg)
        first_data = await first_data.text()

        first_data = String(first_data)

        first_data = String(first_data.split('{"DATA":{')[1])


        if(first_data.startsWith('"SNG_ID"')){
            first_data = String(first_data.slice(10))
            if(!first_data) return reject('error 404')
            let ID = first_data.split('"')[0]
            if(!ID) return reject('error 404')
            return resolve({id: ID, type: "track", link: `https://www.deezer.com/fr/track/${ID}`})
        }else if(first_data.startsWith('"ALB_ID"')){
            first_data = String(first_data.slice(10))
            if(!first_data) return reject('error 404')
            let ID = first_data.split('"')[0]
            if(!ID) return reject('error 404')
            return resolve({id: ID, type: "album", link: `https://www.deezer.com/fr/album/${ID}`})
        }else if(first_data.startsWith('"PLAYLIST_ID"')){
            first_data = String(first_data.slice(15))
            if(!first_data) return reject('error 404')
            let ID = first_data.split('"')[0]
            if(!ID) return reject('error 404')
            return resolve({id: ID, type: "playlist", link: `https://www.deezer.com/fr/playlist/${ID}`})
        }else return reject('error 404')
    })
}