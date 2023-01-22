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
            .catch(err => { return reject(err) })
            .then(datas => { return resolve(datas) })
        })
    }

}

module.exports = Youtube