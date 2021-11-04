import React, {useState,useEffect} from 'react';

import { apiTweetList } from './lookup';
import {Tweet} from './detail'

export function TweetsList(props) {
    const [tweetsInit,setTweetsInit] = useState([])
    const [tweets,setTweets] = useState([])
    const [tweetsDidSet, setTweetsDidSet] = useState(false)
    //console.log("TweetsList -> tweetsDidSet",tweetsDidSet," tweetsInit",tweetsInit.length,tweetsInit," props.newTweets->",props.newTweets.length,props.newTweets)
    console.log("props.username",props)
    
    useEffect(()=>{
        const final = [...props.newTweets].concat(tweetsInit)
        //console.log("concatenating to create final props.newTweets",props.newTweets.length,"tweetsInit",tweetsInit.length," final ",final.length)
        if (final.length !== tweets.length){
            //console.log("SUCCESS FINAL.length !== tweets.length")
            setTweets(final)
        }
    },[props.newTweets, tweets, tweetsInit])

    useEffect(()=>{
        if (tweetsDidSet !== true){
            const handleTweetListLookup = (response,status)=>{
                //console.log("status",status,"response",response)
                if (status === 200 || status === 201){
                    setTweetsInit(response)
                    setTweetsDidSet(true)
                } else {
                    alert("There was an error")
                }
            }
            apiTweetList(props.username,handleTweetListLookup)
        }        
    },[tweetsInit,tweetsDidSet,setTweetsDidSet, props.username])
    
    const handleDidRetweet = (newTweet) =>{
        const updateTweetsInit = [...tweetsInit]
        updateTweetsInit.unshift(newTweet)
        setTweetsInit(updateTweetsInit)
        const updateFinalTweets = [...tweets]
        updateFinalTweets.unshift(tweets)
        setTweets(updateFinalTweets)

    }

    return tweets.map((item,idx)=>{
        return <Tweet 
            tweet={item} 
            didRetweet={handleDidRetweet}
            className='my-5 py-5 border bg-white text-dark'
            key={`${idx}-${item.id}`} 
        />
    })
}

