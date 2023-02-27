const base = require("../Classes/baseStructure")

class Youtube extends base{
    constructor(){
        super("Youtube")
    }

    /**
     * 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {object[]}
     */
    search(Arg, tag){
        return new Promise(async (resolve, reject) => {
            require("./search")( Arg, tag)
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
            require("./stream").link(link, format, withDetails)
            .catch(err => reject(err) )
            .then(datas => resolve(datas))
        })
    }
}

module.exports = Youtube