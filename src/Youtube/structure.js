const base = require("../Classes/baseStructure")
const search = require("./search")
const streamResolver = require('./stream')
const streamDownloader = require('../utils/stream')

class Youtube extends base{
    constructor(){
        super("Youtube")
    }

    /**
     * 
     * @param {string} Arg 
     * @returns {object[]}
     */
    search(Arg){
        return new Promise(async (resolve, reject) => {
            search( Arg)
            .catch(err => reject(err) )
            .then(datas => resolve(datas) )
        })
    }

    /**
     * @param {string} link
     * @param {object} [format]
     * @param {string} [format.type]
     * @param {string} [format.codec]
     * @param {boolean} [withDetails]
     * @returns {string|object|Error}
     */
    async streamLink(link, format, withDetails){
        return new Promise(async (resolve, reject) => {
            streamResolver.link(link, format, withDetails)
            .catch(err => reject(err) )
            .then(datas => resolve(datas))
        })
    }

    /**
     * @param {string} link
     * @returns {Buffer}
     */
    async steam(link){
        return new Promise(async (resolve, reject) => {
            streamDownloader(link)
            .catch(err => reject(err) )
            .then(datas => resolve(datas))
        })
    }
}

module.exports = Youtube