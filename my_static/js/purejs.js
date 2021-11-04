console.log("Start of purjs.js")

function handleTweetFormError(msg, display){
    var myErrorDiv = document.getElementById("tweet-create-form-error")
    if (display === true) {
        // show error
        myErrorDiv.setAttribute("class", "d-block alert alert-danger")
        myErrorDiv.innerText = msg
    } else {
        // hide error
        myErrorDiv.setAttribute("class", "d-none alert alert-danger")
    }
}


function handleTweetCreateFormDidSumbit(event) {
    event.preventDefault()
    const myForm = event.target
    const myFormData = new FormData(myForm)
    const url = myForm.getAttribute("action")
    const method = myForm.getAttribute("method")
    const xhr = new XMLHttpRequest()
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.onload = function() {
        if (xhr.status === 201) {
            handleTweetFormError("", false)
            const newTweetJson = xhr.response
            const newTweetElement = formatTweetElement(newTweetJson)
            const ogHtml = tweetsContainerElement.innerHTML
            tweetsContainerElement.innerHTML = newTweetElement + ogHtml
            myForm.reset()
        } else if (xhr.status === 400) {
            const errorJson = xhr.response
            const contentError = errorJson.content
            let contentErrorMsg;
            if (contentError) {
                contentErrorMsg = contentError[0]
                if (contentErrorMsg) {
                    handleTweetFormError(contentErrorMsg, true)
                } else {
                    alert("An error occured. Please try again.")
                }
            } else {
                alert("An error occured. Please try again.")
            }   
        } else if (xhr.status === 401) {
            alert("You must login!")
            window.location.href = "/login"
        } else if (xhr.status === 403) {
            alert("You must login!")
            window.location.href = "/login"
        }
        else if (xhr.status === 500) {
            alert("There was a server error, please try again.")
        }
        
    }
    xhr.onerror = function() {
        alert("An error occurred. Please try again later.")
    }
    xhr.send(myFormData)
}
const tweetCreateFormEl = document.getElementById("tweet-create-form")
tweetCreateFormEl.addEventListener("submit", handleTweetCreateFormDidSumbit)


const tweetsContainerElement = document.getElementById("jstweets") 

//const tweetsEl = document.getElementById("tweets") //get an htlm element

function loadTweets(tweetsElement) {

    const xhr = new XMLHttpRequest()
    const method = 'GET' // "POST"
    const baseurl = "http://127.0.0.1:8005"
    const url = `${baseurl}/api/tweets`
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function() {
        const serverResponse = xhr.response
        const listedItems = serverResponse
        console.log("xhr response ->",xhr.response)
        console.log("xhr serverResponse ->",serverResponse)
        console.log("listedItems ->",listedItems)
        let finalTweetStr = ""
        let i;
        for (i=0;i<listedItems.length; i++){
            console.log(i)
            console.log(listedItems[i])
            let tweetObj = listedItems[i]
            let currentItem = formatTweetElement(tweetObj)
            finalTweetStr += currentItem
        }
        tweetsElement.innerHTML = finalTweetStr
        console.log("listed items",listedItems)
    }
    xhr.send()
}

loadTweets(tweetsContainerElement)

function RetweetBtn(tweet) {
    return "<button class='btn btn-outline-success btn-sm' onclick=handleTweetActionBtn(" + 
    tweet.id + "," + tweet.likes + ",'retweet')>Retweet</button>"
}


function UnLikeBtn(tweet) {
    return "<button class='btn btn-outline-primary btn-sm' onclick=handleTweetActionBtn(" + 
    tweet.id + "," + tweet.likes + ",'unlike')>Unlike</button>"
}

function LikeBtn(tweet) {
    return "<button class='btn btn-primary' onclick=handleDidLike(" +
    tweet.id + "," + tweet.likes + ")>" + tweet.likes + " Likes</button>"
}

// function handleDidLike(tweet_id, currentCount) {
//     console.log(tweet_id, currentCount)
//     currentCount++
//     return 
// }


// function formattedTweetElement(tweet) {
//     let formattedTweet = "<div class='col-12 col-md-10 mx-auto border rounded py-3 mb-4 tweet' id='tweet-" + tweet.id + 
//     "'><p>" + tweet.content + 
//         "</p><div class='btn-group'>" + LikeBtn(tweet) + 
//         "</div></div>"
//     return formattedTweet
// }

function formatTweetElement(tweet) {
    var formattedTweet = "<div class='col-12 col-md-10 mx-auto border rounded py-3 mb-4 tweet' id='tweet-" + tweet.id 
    + "'><p>" + tweet.content + 
        "</p><div class='btn-group'>" + 
            LikeBtn(tweet) +
            UnLikeBtn(tweet) + 
            RetweetBtn(tweet) +
        "</div></div>"
    return formattedTweet
}
