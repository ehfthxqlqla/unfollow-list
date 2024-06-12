const followerFile = document.querySelector(".js-follower-file"),
followingFile = document.querySelector(".js-following-file"),
followerFileName = document.querySelector(".css-follower-filename"),
followingFileName = document.querySelector(".css-following-filename")

followerFile.addEventListener("change", function(e) {
    const reader = new FileReader()
    
    reader.onload = function(event) {
        const jsonString = event.target.result;
        console.log(jsonString)
    }

    const filename = e.target.value.split(/(\\|\/)/g).pop()
    followerFileName.innerText = filename
})

followingFile.addEventListener("change", function(e) {
    const reader = new FileReader()
    const filename = e.target.value.split(/(\\|\/)/g).pop()
    followingFileName.innerText = filename
})