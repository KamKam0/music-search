const Track = require("../Classes/track")
/**
 * 
 * @param {string} Arg 
 * @param {string} tag 
 * @returns {Track}
 */
module.exports = async (Arg, tag) => {
    let title = Arg.title
    let url = Arg.permalink_url
    let time = Number(String(Arg.duration / 1000).split(".")[0])
    let icon = Arg.artwork_url
    let artist_nom;
    if(Arg.publisher_metadata) artist_nom = Arg.publisher_metadata?.artist
    else artist_nom = Arg.user.username
    let artist_url;
    if(Arg.publisher_metadata) artist_url = `https://soundcloud.com/secret-service-${Arg.publisher_metadata?.id}`
    else artist_url = `https://soundcloud.com/secret-service-${Arg.user.id}`
    let stream_url ;
    if(Arg.media.transcodings.filter( transcoding => transcoding.format.protocol === 'progressive' )[0]) stream_url = Arg.media.transcodings.filter( transcoding => transcoding.format.protocol === 'progressive' )[0].url
    else stream_url = Arg.media.transcodings[0].url
    let requestor = tag ? tag : null
    let place = null
    let dv = {title, url, time, icon, artist_nom, artist_url, stream_url, requestor, place}
    return new Track(dv)
}