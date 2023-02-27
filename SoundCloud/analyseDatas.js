module.exports = (datas, tag) => {
    let title = datas.title
    let url = datas.permalink_url
    let time = Number(String(datas.duration / 1000).split(".")[0])
    let thumbnail = datas.artwork_url
    let artist_name;
    if(datas.publisher_metadata) artist_name = datas.publisher_metadata?.artist
    else artist_name = datas.user.username
    let artist_url;
    if(datas.publisher_metadata) artist_url = `https://soundcloud.com/secret-service-${datas.publisher_metadata?.id}`
    else artist_url = `https://soundcloud.com/secret-service-${datas.user.id}`
    let requestor = tag ? tag : null
    let place = null
    return {title, url, time, thumbnail, artist_name, artist_url, requestor, place}
}