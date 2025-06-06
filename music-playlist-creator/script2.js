
console.log(playlist)




function loadFeaturePage() {
    console.log(playlist[0])
    
    let SelectedPlaylist = playlist[ Math.floor( Math.random() * playlist.length) ]
    document.querySelector("#playlist-name").innerHTML = SelectedPlaylist.playlist_name
    document.querySelector("#playlist-image").src = SelectedPlaylist.playlist_art

    for (let song in SelectedPlaylist.songs) {
        console.log(song)

        let clone = document.querySelector(".song").cloneNode(true)
        document.getElementById("songs-holder").appendChild(clone)
        
        
        

        for (let child of clone.children) {
            if (child.id === "song-info") {
                // child.src = SelectedPlaylist.songs.img
                
                for (let divChild of child.children) {
                    if (divChild.id === "artist-name") {
                        divChild.innerHTML = SelectedPlaylist.songs[song].author
                    } else if (divChild.id === "album-name") {
                        divChild.innerHTML = SelectedPlaylist.songs[song].album
                    } else if (divChild.id === "duration") {
                        divChild.innerHTML = SelectedPlaylist.songs[song].duration
                    } 
                }
            }
        }

    }

    // for (let child of clone.children) {
    //     if (child.nodeName === "IMG") {
    //         child.src = songTable[songName].img
    //     }else if (child.nodeName === "P") {
    //         child.innerHTML = songTable[songName].duration
    //     } else if (child.nodeName == "DIV") {
            
    //         for (let divChild of child.children) {
    //             if (divChild.nodeName === "H4") {
    //                 divChild.innerHTML = songName
    //             } else if (divChild.nodeName === "P" && alternate === true) {
    //                 divChild.innerHTML = songTable[songName].author
    //                 alternate = false
    //             }else if (divChild.nodeName === "P" && alternate === false) {
    //                 divChild.innerHTML = songTable[songName].album
    //             }
    //         }
    //     }
    // }
}


loadFeaturePage()