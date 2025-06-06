let deletedSongs = []

function showPlaylistInfo(songTable, playlistTable) {
    let saveList = []

    let topModal = document.querySelector("#modal-top")
    // topModal.querySelector("#icon").src = playlistTable.playlist_art
    topModal.querySelector("#icon-description").querySelector("#modal-playlist-name").innerHTML = playlistTable.playlist_name
    topModal.querySelector("#icon-description").querySelector("#modal-playlist-author").innerHTML = playlistTable.playlist_author
    topModal.querySelector("#modal-img").src = playlistTable.playlist_art

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


    let childElementsArray = [...document.querySelector("#modal-bottom").children];
    for (let i = 0; i < childElementsArray.length; i++) {
        if (saveList.includes(childElementsArray[i]) == false) {
            console.log(childElementsArray[i])
            childElementsArray[i].remove()
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

function createPlaylistSong(playlistTable) { 
    let clone = document.querySelector(".song").cloneNode(true)
    document.querySelector("#music-holder").appendChild(clone)

    
    clone.style.visibility = "visible"
    clone.id = ""

    for (let child of clone.children) {
        if (child.nodeName === "H3") {
            child.innerHTML = playlistTable.playlist_name
        }else if (child.nodeName === "P") {
            if (child.id === "like-text") {
                child.innerHTML = "Likes: "+playlistTable.playlist_likes
            } else {
                child.innerHTML = "Created by "+playlistTable.playlist_author
            }
        }else if (child.nodeName === "IMG") {
            child.src = playlistTable.playlist_art
        }else if (child.nodeName === "DIV" && child.id == "likes") {
            child.querySelector("#like-button").addEventListener("click", function() {
                playlistClickEnabled = false
                onLikeClick(child.querySelector("#like-button"), playlistTable.playlist_likes)
            })

            child.querySelector("#like-text").innerHTML = "Likes: "+playlistTable.playlist_likes
        }
    }

    clone.addEventListener("click", function() {
        console.log()
        // if (disableSong ==  true) return
        if (likeClickId === playlistClickId) {
            document.querySelector(".modal").style.visibility = "visible"
            showPlaylistInfo(playlistTable.songs, playlistTable)
        } else {
            playlistClickId = likeClickId
        }
    })

    clone.querySelector("#delete-holder").querySelector("#delete-button").addEventListener("click", function() {
        // disableSong = true
        deletedSongs.push(playlistTable.playlist_name)
        event.stopPropagation()
        clone.remove()
    })
}

function populatePlaylists() {
    for (let i = 0; i < playlist.length; i++) {
        if (deletedSongs.includes(playlist[i].playlist_name)) {
            console.log("continue")
            continue
        }
    //     let clone = document.querySelector(".song").cloneNode(true)
    //     document.getElementById("music-holder").appendChild(clone)

        
    //     clone.style.visibility = "visible"
    //     clone.id = ""

    //     for (let child of clone.children) {
    //         if (child.nodeName === "H3") {
    //             child.innerHTML = playlist[i].playlist_name
    //         }else if (child.nodeName === "P") {
    //             if (child.id === "like-text") {
    //                 child.innerHTML = "Likes: "+playlist[i].playlist_likes
    //             } else {
    //                 child.innerHTML = "Created by "+playlist[i].playlist_author
    //             }
    //         }else if (child.nodeName === "IMG") {
    //             child.src = playlist[i].playlist_art
    //         }else if (child.nodeName === "DIV" && child.id == "likes") {
    //             child.querySelector("#like-button").addEventListener("click", function() {
    //                 playlistClickEnabled = false
    //                 onLikeClick(child.querySelector("#like-button"), playlist[i].playlist_likes)
    //             })

    //             child.querySelector("#like-text").innerHTML = "Likes: "+playlist[i].playlist_likes
    //         }
    //     }

    //     clone.addEventListener("click", function() {
    //         console.log()
    //         // if (disableSong ==  true) return
    //         if (likeClickId === playlistClickId) {
    //             document.querySelector(".modal").style.visibility = "visible"
    //             showPlaylistInfo(playlist[i].songs, playlist[i])
    //         } else {
    //             playlistClickId = likeClickId
    //         }
    //     })

    //     clone.querySelector("#delete-holder").querySelector("#delete-button").addEventListener("click", function() {
    //         // disableSong = true
    //         event.stopPropagation()
    //         clone.remove()
    //     })
    // }
        createPlaylistSong(playlist[i]) 
    }
    if (document.querySelector("#song-template") != null) {
        document.querySelector("#song-template").remove()
    }
// document.querySelector("#song-template").style.visibility = "hidden"
}

function deletePlaylist(song) {
    song:remove()
}


document.querySelector(".close").addEventListener("click", function() {
    document.querySelector(".modal").style.visibility = "hidden"
})


populatePlaylists()


document.querySelector("#modal-button").addEventListener("click", function() {
    shufflePlaylist()
})

function deleteAll() {
    if (document.querySelector("#music-holder") != null) {
        document.querySelector("#music-holder").remove()
    }
  
    let clone = document.querySelector("#holder-clone").cloneNode(true)
    document.querySelector("main").appendChild(clone)
    clone.id = "music-holder"
}

function searchPress() {
    let searchValue = document.querySelector("#search-field").value
    deleteAll()

    if ( searchValue == " ") {
        deletedSongs = []
        populatePlaylists()
    }
    for (let i = 0; i < playlist.length; i++) {
        let substring = playlist[i].playlist_name.substring(0, searchValue.length)
        if (substring.toUpperCase() === searchValue.toUpperCase()) {
            createPlaylistSong(playlist[i])
        }
    }
}




let filterInfo = {
    0: "Sort by",
    1: "Playlist Name",
    2: "Likes",
    3: "Author Name"
}

document.querySelector("#filter-field").addEventListener("change", function(event) {
    let selectedValue = event.target.value

    console.log(filterInfo[event.target.value])

    if (selectedValue == "1") {
        console.log("Sorting by Name")
        playlist.sort((a,b) => a.playlist_name.localeCompare(b.playlist_name))
        console.log(playlist)
    } else if (selectedValue == "2") {
        playlist.sort((a,b) => b.playlist_likes - a.playlist_likes)
        console.log(playlist)
    } else if (selectedValue == "3") {
        playlist.sort((a,b) => a.playlist_author.localeCompare(b.playlist_author))
        console.log(playlist)
    }

    deleteAll()
    populatePlaylists()
})