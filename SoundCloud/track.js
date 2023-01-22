const Track = require("../Classes/track")
const Error = require("../Classes/error")
const analyser = require("./analyseDatas")
/**
 * 
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Track|Error}
 */
module.exports = async (token, Arg, tag) => {
    return new Promise(async (resolve, reject) => {
        if(!Arg || typeof Arg !== "object") return reject(new Error("No valid argument given", 1))
        return resolve(new Track({...analyser(Arg, tag), token}))
    })
}