

function loadFeaturePage() {
    console.log(playlist[0])
    
    let SelectedPlaylist = playlist[ Math.floor( Math.random() * playlist.length) ]
    document.querySelector("#playlist-name").innerHTML = SelectedPlaylist.playlist_name
    document.querySelector("#playlist-image").src = SelectedPlaylist.playlist_art

    for (let song in SelectedPlaylist.songs) {

        let clone = document.querySelector(".song").cloneNode(true)
        document.getElementById("songs-holder").appendChild(clone)
        

        for (let child of clone.children) {
            if (child.id === "song-info") {
                console.log(SelectedPlaylist.songs[song].img)
                child.parentNode.querySelector("#song-image").src = SelectedPlaylist.songs[song].img
                
                for (let divChild of child.children) {
                    if (divChild.id === "artist-name") {
                        divChild.innerHTML = SelectedPlaylist.songs[song].author
                    } else if (divChild.id === "album-name") {
                        divChild.innerHTML = SelectedPlaylist.songs[song].album
                    } else if (divChild.id === "duration") {
                        divChild.innerHTML = SelectedPlaylist.songs[song].duration
                    } else if (divChild.id === "song-name") {
                        divChild.innerHTML = song
                    }
                }
            }
        }
    }

    document.querySelector("#song").remove()

}


loadFeaturePage()