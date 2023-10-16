const base = require("./baseStructure")

class BaseAlbum extends base{
    constructor(name){
        super(name)
    }

    /**
     * 
     * @param {string} Arg 
     * @returns {Album}
     */
    getAlbum(Arg){
        return new Promise(async (resolve, reject) => {
            this._requestMaker("album", Arg)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}

module.exports = BaseAlbum