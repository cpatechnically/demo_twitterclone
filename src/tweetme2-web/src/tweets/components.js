import React, {useState,useEffect} from 'react';

import { TweetCreate} from './create';
import {Tweet} from './detail';
import { apiTweetDetail } from './lookup';
import {TweetsList} from './list';

export function TweetsComponent(props){
    //ENTRY POINT FOR HTML DATA ATTRIBUTES data-....
    console.log("props",props) //react changed the casing from data-can-tweet to canTweet
    //const {canTweet} = props
    const [newTweets, setNewTweets] = useState([])
    //console.log("TweetsComponent props",props,'ABOVE handleSubmit newTweets',newTweets.length,newTweets)
    const canTweet = props.canTweet === "false" ? false : true
    const handleNewTweet = (newTweet)=>{
        //backend api response handler
        let tempNewTweets = [...newTweets]
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets)
    }
    return <div className={props.className}>
            {canTweet === true && <TweetCreate didTweet={handleNewTweet} className="col-12 mb-3" />}
            <h1>TweetsList</h1>
        <TweetsList newTweets={newTweets} {...props} />
    </div> 
}
  
export function TweetDetailComponent(props){
    const {tweetId} = props
    const [didLookup,setDidLookup] = useState(false)
    const [tweet,setTweet] = useState(null)

    const handleBackendLookup = (response,status)=>{
        if (status === 200){
            setTweet(response)
        } else {
            alert("There was an error finding your tweet")
        }
    }

    useEffect(()=>{
        if (didLookup === false){
            apiTweetDetail(tweetId, handleBackendLookup)
            setDidLookup(true)
        }
    },[tweetId,didLookup,setDidLookup])

    return tweet === null ? null : <Tweet tweet={tweet} className={props.className}/>
}


