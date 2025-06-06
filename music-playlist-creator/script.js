function showPlaylistInfo(songTable, playlistTable) {
    let saveList = []

    let topModal = document.querySelector("#modal-top")
    topModal.querySelector("#icon").src = playlistTable.playlist_art
    topModal.querySelector("#icon-description").querySelector("#modal-playlist-name").innerHTML = playlistTable.playlist_name
    topModal.querySelector("#icon-description").querySelector("#modal-playlist-author").innerHTML = playlistTable.playlist_author

    for (let songName in songTable) { 
        let alternate = true
        let clone = document.querySelector("#modal-songs").cloneNode(true)
        document.getElementById("modal-bottom").appendChild(clone)

        for (let child of clone.children) {
            if (child.nodeName === "IMG") {
                child.src = songTable[songName].img
            }else if (child.nodeName === "P") {
                child.innerHTML = songTable[songName].duration
            } else if (child.nodeName == "DIV") {
                
                for (let divChild of child.children) {
                    if (divChild.nodeName === "H4") {
                        divChild.innerHTML = songName
                    } else if (divChild.nodeName === "P" && alternate === true) {
                        divChild.innerHTML = songTable[songName].author
                        alternate = false
                    }else if (divChild.nodeName === "P" && alternate === false) {
                        divChild.innerHTML = songTable[songName].album
                    }
                }
            }
        }
        saveList.push(clone)
    }

    for (let i = 0; i < 2; i++) {
        for (let child of document.querySelector("#modal-bottom").children) {
            if (saveList.indexOf(child) === -1) {
                child.remove()
            }
        }
    }
}

let likeClickId = 0
let playlistClickId = 0
function onLikeClick(image, playlistLikes) {
    if (image.className === "empty") {
        image.src = "assets/img/fullheart.png"
        image.className = "full"
        playlistLikes += 1
    } else {
        image.src = "assets/img/emptyheart.png"
        image.className = "empty"
        // playlistLikes -= 0
    }
    console.log(playlistLikes)

    likeClickId++
    // document.querySelector("#like-text").innerHTML = "Likes: "+ playlistLikes
    image.parentNode.querySelector("#like-text").innerHTML = "Likes: "+ playlistLikes
}

function shufflePlaylist() {
    //replace children
    let container = document.querySelector("#modal-bottom")
    for (let i = container.children.length; i >= 0; i--) {
        container.appendChild(container.children[Math.random() * i | 0]);
    }
}

function populatePlaylists() {
    for (let i = 0; i < playlist.length; i++) {
        let clone = document.querySelector("#song-template").cloneNode(true)
        document.getElementById("music-holder").appendChild(clone)

        
        clone.style.visibility = "visible"
        clone.id = ""

        for (let child of clone.children) {
            if (child.nodeName === "H3") {
                child.innerHTML = playlist[i].playlist_name
            }else if (child.nodeName === "P") {
                if (child.id === "like-text") {
                    child.innerHTML = "Likes: "+playlist[i].playlist_likes
                } else {
                    child.innerHTML = "Created by "+playlist[i].playlist_author
                }
            }else if (child.nodeName === "IMG") {
                child.src = playlist[i].playlist_art
            }else if (child.nodeName === "INPUT") {
                child.addEventListener("click", function() {
                    playlistClickEnabled = false
                    onLikeClick(child, playlist[i].playlist_likes)
                })
            } else if (child.id === "like-text") {
                
            }
        }

        clone.addEventListener("click", function() {
            if (likeClickId === playlistClickId) {
                document.querySelector(".modal").style.visibility = "visible"
                showPlaylistInfo(playlist[i].songs, playlist[i])
            } else {
                playlistClickId = likeClickId
            }
        })
    }
    document.querySelector("#song-template").remove()
}



document.querySelector(".close").addEventListener("click", function() {
    document.querySelector(".modal").style.visibility = "hidden"
})


populatePlaylists()


document.querySelector("#modal-button").addEventListener("click", function() {
    shufflePlaylist()
})
