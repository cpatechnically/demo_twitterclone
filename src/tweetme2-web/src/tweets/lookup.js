import { backendLookup } from "../lookup/components"

export function apiTweetCreate(newTweet,callback){
    const newData = {content:newTweet}
    console.log("apiTweetCreate newData",newData)
    backendLookup("POST", "/tweets/create/",callback,newData)
    //backendLookup("POST", "/tweets/create/",callback,newTweet)
}
  
export function apiTweetAction(tweetId, action, callback){
    const data = {id: tweetId, action:action}
    console.log("apiTweetAction data",data)
    backendLookup("POST", "/tweets/action/",callback,data)
}
  
export function apiTweetDetail(tweetId,callback) {
    let endpoint = `/tweets/${tweetId}/`
    backendLookup("GET",endpoint,callback)
}

export function apiTweetList(username,callback) {
    let endpoint = "/tweets/"
    if (username){
        endpoint = `/tweets/?username=${username}`
    }
    backendLookup("GET",endpoint,callback)
}