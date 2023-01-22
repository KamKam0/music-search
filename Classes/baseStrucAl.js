const base = require("./baseStructure")

class BaseAlbum extends base{
    constructor(name){
        super(name)
    }

    /**
     * 
     * @param {string} Arg 
     * @param {string} tag 
     * @returns {Album}
     */
    getAlbum(Arg, tag){
        return new Promise(async (resolve, reject) => {
            this._requestMaker("album", Arg, tag)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}

module.exports = BaseAlbum