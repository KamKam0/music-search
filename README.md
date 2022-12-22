# ErrorHandler
MusicSearch is a simple to use module that allows you to retrieve informations about a song on various platforms

## Installation
```js
npm i @kamkam1_0/music-search
```

## Available Platforms
- Youtube
- SoundCloud
- Deezer
- Spotify

## How to use

### Initiating the module
```js
const MusicSearch = require("@kamkam1_0/music-search")
let Youtube = new Search.Youtube()
let Deezer = new Search.Deezer()
let SoundCloud = new Search.SoundCloud()
let Spotify = new Search.Spotify("CLIENT KEY", "SECRET KEY")
```

### General
You can use the eval command to tell you the general informations about the song
```js
let song = MusicSearch.eval("URL/NAME")
//expected output: {plateforme: "", link: "URL/NAME", type: ""}
//The platform is one of the listed before
//The link corresponding to the given argument
//The type is the command to execute for the given argument
```

### Youtube Search

```js
    let songs = await Youtube.search("despacito")
    /*Expected Output:
    [
        Track {
            title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
            url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
            time: 282,
            artist_nom: 'Luis Fonsi',
            artist_url: 'https://www.youtube.com/channel/UCxoq-PAQeAdk_zyg8YS0JqA',
            requestor: null,
            icon: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBCg9eudi8DoM9M-qjPgJBGGkuIgA',
            place: null,
            format: null,
            stream_url: null,
            plateforme: 'Youtube',
            type: 'Track'
        },
        Track {
            title: 'Luis Fonsi ‒ Despacito (Lyrics / Lyric Video) ft. Daddy Yankee',
            url: 'https://www.youtube.com/watch?v=gm3-m2CFVWM',
            time: 241,
            artist_nom: 'Taz Network',
            artist_url: 'https://www.youtube.com/channel/UCJ6ERWrxZzb9Ua3oeRcIe0g',
            requestor: null,
            icon: 'https://i.ytimg.com/vi/gm3-m2CFVWM/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBdnMRJ4yJ6vHumS_nU46yxFLqRjQ',
            place: null,
            format: null,
            stream_url: null,
            plateforme: 'Youtube',
            type: 'Track'
        },
        ...
    ]
    */
```

### Deezer && SounCloud resolve

```js
    let songs = await Platform.resolve("https://deezer.page.link/E4tkv3WubWS1JP8Q6")
```

### General Use

Track Command

```js
    let song = await Platform.GetTrack("https://www.youtube.com/watch?v=kJQP7kiw5Fk")
    /*
        Track {
        title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
        url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
        time: 282,
        artist_nom: 'LuisFonsiVEVO',
        artist_url: 'https://www.youtube.com/channel/UCLp8RBhQHu9wSsq62j_Md6A',
        requestor: null,
        icon: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCuffhiAPaneh-5dnyfyvY_mDwxhQ',
        place: null,
        format: [],
        stream_url: null,
        plateforme: 'Youtube',
        type: 'Track'
    */
```

Playlist Command

```js
    let song = await Platform.GetPlaylist("https://www.youtube.com/watch?v=kJQP7kiw5Fk&list=PLVKH3RmLAlPgSVRlwh7RfbCGUO4P80i-A")
    /*
        Playlist {
            title: 'Despacito Playlist',
            icon: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg?sqp=-oaymwEWCKgBEF5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLBEbPjZNLOTWKK9IgpBYcBjav7eVw',
            channel_name: 'skassira12',
            channel_url: 'https://www.youtube.com/channel/UC65xgmFhe679BVFdML8ilgA',
            url: 'https://www.youtube.com/playlist?list=PLVKH3RmLAlPgSVRlwh7RfbCGUO4P80i-A',
            songs: [
                Track {
                title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
                url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
                time: 282,
                artist_nom: 'Luis Fonsi',
                artist_url: 'https://www.youtube.com/channel/UCxoq-PAQeAdk_zyg8YS0JqA',
                requestor: null,
                icon: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCuffhiAPaneh-5dnyfyvY_mDwxhQ',
                place: null,
                format: null,
                stream_url: null,
                plateforme: 'Youtube',
                type: 'Track'
                },
                ...
            ]
        }
    */
```

Album Command

```js
    let song = await Platform.GetAlbum("https://www.deezer.com/fr/album/15478674")
    /*
        Playlist {
            title: 'Despacito Playlist',
            icon: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg?sqp=-oaymwEWCKgBEF5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLBEbPjZNLOTWKK9IgpBYcBjav7eVw',
            channel_name: 'skassira12',
            channel_url: 'https://www.youtube.com/channel/UC65xgmFhe679BVFdML8ilgA',
            url: 'https://www.youtube.com/playlist?list=PLVKH3RmLAlPgSVRlwh7RfbCGUO4P80i-A',
            songs: [
                Track {
                title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
                url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
                time: 282,
                artist_nom: 'Luis Fonsi',
                artist_url: 'https://www.youtube.com/channel/UCxoq-PAQeAdk_zyg8YS0JqA',
                requestor: null,
                icon: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCuffhiAPaneh-5dnyfyvY_mDwxhQ',
                place: null,
                format: null,
                stream_url: null,
                plateforme: 'Youtube',
                type: 'Track'
                },
                ...
            ]
        }
    */
```