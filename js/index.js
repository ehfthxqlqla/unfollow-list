const followerFile = document.querySelector(".js-follower-file"),
followingFile = document.querySelector(".js-following-file"),
followerFileName = document.querySelector(".css-follower-filename"),
followingFileName = document.querySelector(".css-following-filename"),
container = document.querySelector(".css-file-input")

function findUniqueValues(arr1, arr2) {
    // Extract values from array2 for comparison
    const values2 = arr2.map(item => item.string_list_data[0].value);

    console.log(values2)

    // Filter out values from array1 that are not in array2
    const uniqueValues = arr1.filter(item => {
        // console.log(item)
        return !values2.includes(item.string_list_data[0].value)
    });

    const result = uniqueValues.map(item => item.string_list_data[0].value)

    return result;
}

let followerList = null
let followingList = null

followerFile.addEventListener("change", function(e) {
    const files = e.target.files

    if (!files) {
        alert(`파일을 선택해 주세요.`)
        return
    }

    if (files[0].type !== "application/json") {
        alert(`유효한 json 파일이 아닙니다. 다시 선택해 주세요.`)
        return
    }

    const reader = new FileReader()
    
    reader.onload = function(event) {
        const jsonString = event.target.result;
        console.log(JSON.parse(jsonString))
        followerList = JSON.parse(jsonString)
        // console.log(jsonString)
    }
    
    reader.readAsText(files[0])

    const filename = e.target.value.split(/(\\|\/)/g).pop()
    followerFileName.innerText = filename
})

followingFile.addEventListener("change", function(e) {
    const files = e.target.files

    if (!files) {
        alert(`파일을 선택해 주세요.`)
        return
    }

    if (files[0].type !== "application/json") {
        alert(`유효한 json 파일이 아닙니다. 다시 선택해 주세요.`)
        return
    }

    const reader = new FileReader()
    
    reader.onload = function(event) {
        const jsonString = event.target.result;
        console.log(JSON.parse(jsonString))
        followingList = JSON.parse(jsonString).relationships_following
        // console.log(jsonString)
    }
    
    reader.readAsText(files[0])

    const filename = e.target.value.split(/(\\|\/)/g).pop()
    followingFileName.innerText = filename
})

const submitBtn = document.querySelector(".js-submit-json")

submitBtn.addEventListener("click", function() {
    if (!followerList || !followingList) {
        alert(`파일을 선택하지 않았습니다.`)
        return
    }

    const checkedValue_unfollowed = findUniqueValues(followingList, followerList)
    const checkedValue_userNotFollowing = findUniqueValues(followerList, followingList)

    let temp = ``

    for (const user of checkedValue_unfollowed) {
        temp += `<div class="js-unfollower" style="margin-left: 10px; margin-top: 10px; width: 550px; height: 30px; font-size: 18px; border: 1px solid #000000; border-radius: 5px; vertical-align: middle; line-height: 30px; padding-left: 10px; color: #FF0000;">
                <a href="https://www.instagram.com/${user}" target="_blank">@${user}</a>
                <span>상대가 팔로우하지 않습니다.</span>
            </div>
        `
    }

    for (const user of checkedValue_userNotFollowing) {
        temp += `<div class="js-unfollower" style="margin-left: 10px; margin-top: 10px; width: 550px; height: 30px; font-size: 18px; border: 1px solid #000000; border-radius: 5px; vertical-align: middle; line-height: 30px; padding-left: 10px; color: #00FF00;">
                <a href="https://www.instagram.com/${user}" target="_blank">@${user}</a>
                <span>유저가 팔로우하지 않습니다.</span>
            </div>
        `
    }

    container.innerHTML = temp

})