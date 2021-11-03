import React from 'react';
import { apiTweetAction } from './lookup';


export function ActionBtn(props) {
    //console.log("Called ActionBtn funciton props",props)
    const {tweet,action, didPerformAction} = props
    const likes = tweet.likes ? tweet.likes : 0
    //const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    //const [userLike,setUserLike] = useState(tweet.userLike === true ? false : false)
    const className = props.className ? props.className : "btn btn-primary btn-sm"
    const actionDisplay = action.display ? action.display : "Action"

    const handleActionBackendEvent = (response,status)=>{
        console.log("handleActionBackendEvent -> ",status,response)
        if ((status === 200 || status === 201) && didPerformAction){
            //setLikes(response.likes)
            didPerformAction(response,status)
            //setUserLike(true)
        }
    }

    const handleClick = (event) =>{
        event.preventDefault()
        apiTweetAction(tweet.id, action.type,handleActionBackendEvent)
        
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display} </button>
}