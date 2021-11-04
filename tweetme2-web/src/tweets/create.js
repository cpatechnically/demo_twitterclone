import React from 'react';

import { apiTweetCreate} from './lookup';

export function TweetCreate(props){
    const textAreaRef = React.createRef()
    const {didTweet} = props
    
    const handleBackendUpdate = (response,status)=>{
        //backend api response handler
        if (status === 201){
            didTweet(response)
        } else {
            console.log(response)
            alert("An error occured")
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        const newVal = textAreaRef.current.value
        //console.log("newVal",newVal)
        //backend api request
        apiTweetCreate(newVal,handleBackendUpdate) 
        textAreaRef.current.value = ""
        //console.log("IN handleSubmitFunction AFTER setNewTweets update newTweets -> ",newTweets.length,newTweets)
    }
    return <div className={props.className ? props.className : "col-12 mb-3"}>
            <form onSubmit={handleSubmit}>
                <textarea ref={textAreaRef} required={true} className='form-control'>

                </textarea>
                <button type="submit" className="btn btn-primary my-3">Tweet</button>
            </form>
    </div>
}
