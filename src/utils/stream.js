const fetch = require('node-fetch')

module.exports = async (downloadLink) => {
    return new Promise(async (resolve, reject) => {
        if (typeof downloadLink !== 'string') {
            return reject('Invalid link type')
        }

        if (!downloadLink.startsWith('https://wwww.')) {
            return reject('Invalid link')
        }

        if (!downloadLink.includes('www.youtube') && !downloadLink.includes('www.soundcloud')) {
            return reject('Invalid link')
        }

        try {
            let streamRequest = await fetch(downloadLink)
            
        } catch (error) {
            console.log(error)
            return reject('An error occured')
        }
    })
}