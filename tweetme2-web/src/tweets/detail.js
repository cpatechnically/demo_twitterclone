import React, {useState} from 'react';

import {ActionBtn} from './buttons';

function UserLink(props){
    const {user,includeFullName} = props
    const nameDisp = includeFullName === true ? `${user.first_name} ${user.last_name} ` : null

    const handleUserLink = (event) =>{
        event.preventDefault()
        window.location.href=`/profile/${user.username}`
        console.log(window.location.href)
    }

    return <React.Fragment>
        {nameDisp}{' '}
        <span onClick={handleUserLink}>@{user.username}</span>
    </React.Fragment>
}

function UserPicture(props){
    const {user} = props

    return <span className="mx-1 px-3 py-2 border-rounded bg-dark text-white">
    {user.username[0]}
</span>
}

export function ParentTweet(props){
    const {tweet} = props
    return tweet.parent ? <div className="row">
    <div className="col-11 mx-auto p-3 border rounded">
        <p className='mb-0 text-muted small'>Retweet</p>
        <Tweet hideActions className={''} tweet={tweet.parent} />
    </div>
    </div> : null
}

export function Tweet(props){
    const {tweet,didRetweet, hideActions} = props
    //console.log("Called tweet funciton tweet",tweet)
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    const className = props.className ? props.className : "col-10 mx-auto col-6"
    const path = window.location.pathname
    let idRegex = /(?<tweetid>\d+)/
    const match = path.match(idRegex)
    const urlTweetId = match ? match.groups.tweetid : -1
    const isDetail = `${tweet.id}` === `${urlTweetId}`

    const handleLink = (event) =>{
        event.preventDefault()
        window.location.href = `/${tweet.id}`
    }

    const handlePerformAction = (newActionTweet, status) =>{
        if (status === 200){
            setActionTweet(newActionTweet)
        } else if (status === 201) {
            //let the tweet list know new item created
            if (didRetweet){
                didRetweet(newActionTweet)
            }
        }
    }

    return <div className={className}>
        <div className='d-flex'>
            <div className="col-1">
                <UserPicture user={tweet.user} />
            </div>
            <div className="col-11">
            <div>
                <p>
                    <UserLink includeFullName user={tweet.user} />
                </p>
                <p>{tweet.content}</p>
                <ParentTweet tweet={tweet} />
            </div>
                <div className="btn btn-group">
                {(actionTweet && hideActions !== true) && <React.Fragment> 
                        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"like",display:"Likes"}} className="btn btn-primary"/>
                        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"unlike",display:"Unlike"}} className="btn btn-primary"/>
                        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"retweet",display:"retweet"}} className="btn btn-primary"/>
                    </React.Fragment>
                }
                    {isDetail === true ? null : <button className="btn btn-outline-primary btn-small" onClick={handleLink}>View</button>}
                </div>
                </div>
            </div>
        </div>
            
}