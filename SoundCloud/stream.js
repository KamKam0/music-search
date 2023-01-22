const Error = require("../Classes/error")
/**
 * 
 * @param {string} token 
 * @param {string} stream_url 
 * @returns {string|Error}
 */
module.exports = async (token, stream_url) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch");
        if(!stream_url) return reject(new Error("Incorrect URL", 2))
        const received = await fetch(`${stream_url}?client_id=${token}`);
        const stream = await received.json();
        if(!stream || !stream.url) return reject(new Error("The stream could not be resolved", 16))
        else return resolve(stream.url)
    })
}