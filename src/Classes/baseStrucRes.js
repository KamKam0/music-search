const base = require("./baseStrucAl")

class BaseResolve extends base{
    constructor(name){
        super(name)
    }

    /**
     * 
     * @param {string} Arg 
     * @returns {Playlist|Album|Track}
     */
    resolve(Arg){
        return new Promise(async (resolve, reject) => {
            this._requestMaker("resolve", Arg)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}

module.exports = BaseResolve