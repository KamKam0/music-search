module.exports = (datas, tag) => {
    let title = datas.title
    let url = datas.permalink_url
    let time = Number(String(datas.duration / 1000).split(".")[0])
    let icon = datas.artwork_url
    let artist_nom;
    if(datas.publisher_metadata) artist_nom = datas.publisher_metadata?.artist
    else artist_nom = datas.user.username
    let artist_url;
    if(datas.publisher_metadata) artist_url = `https://soundcloud.com/secret-service-${datas.publisher_metadata?.id}`
    else artist_url = `https://soundcloud.com/secret-service-${datas.user.id}`
    let stream_url ;
    if(!datas.media) stream_url = null
    else if(datas.media.transcodings.filter( transcoding => transcoding.format.protocol === 'progressive' )[0]) stream_url = datas.media.transcodings.filter( transcoding => transcoding.format.protocol === 'progressive' )[0].url
    else if(datas.media.transcodings[0]) stream_url = datas.media.transcodings[0].url
    else stream_url = null
    let requestor = tag ? tag : null
    let place = null
    return {title, url, time, icon, artist_nom, artist_url, stream_url, requestor, place}
}