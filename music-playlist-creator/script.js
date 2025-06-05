// async function getJsonData() {
//   try {
//     const response = await fetch('./data.json');
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching JSON:', error);
//   }
// }


// function populatePlaylists() {
//     console.log(playlist)
//     let jsData
//     getJsonData().then(function(data) {
//         jsData = data

//         for (let i = 0; i < jsData.length; i++) {
//             let clone = document.querySelector("#song-template").cloneNode(true)
//             document.getElementById("music-holder").appendChild(clone)
            
//             clone.style.visibility = "visible"
//             clone.id = ""

//             for (let child of clone.children) {
//                 if (child.nodeName === "H3") {
//                     child.innerHTML = jsData[i].playlist_name
//                 }else if (child.nodeName === "P") {
//                     child.innerHTML = jsData[i].playlist_author
//                 }else if (child.nodeName === "IMG") {
//                     child.src = jsData[i].playlist_art
//                 }
//             }

//             clone.addEventListener("click", function() {
//                 console.log(document.querySelector(".modal"))
//                 document.querySelector(".modal").style.visibility = "visible"
//             })
//         }
//         document.querySelector("#song-template").remove()
//     })
//     return jsData
// }

function showPlaylistInfo(songTable) {
    // console.log(songTable)
    
    // for (let child of document.querySelector("#modal-bottom").children) {
    //     console.log(child)
    //     if (child.id !== "modal-songs") {
    //         child.remove()
    //     }
    // }
    
    let saveList = []

    console.log(songTable)
    for (let songName in songTable) { 
        let alternate = true
        let clone = document.querySelector("#modal-songs").cloneNode(true)
        document.getElementById("modal-bottom").appendChild(clone)
        // console.log(clone)
        // clone.id = ""

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
                child.innerHTML = "Created by "+playlist[i].playlist_author
            }else if (child.nodeName === "IMG") {
                child.src = playlist[i].playlist_art
            }
        }

        clone.addEventListener("click", function() {
            document.querySelector(".modal").style.visibility = "visible"
            showPlaylistInfo(playlist[i].songs)
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