import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TweetsComponent,TweetDetailComponent } from './tweets';

const appRootEl = document.getElementById('root')

const e = React.createElement

if (appRootEl){
  ReactDOM.render(<App />,appRootEl);
}

const myTweetEl = document.getElementById('tweetme-2')
if (myTweetEl){
  ReactDOM.render(
    e(TweetsComponent,myTweetEl.dataset),myTweetEl);
}

const tweetDetailElements = document.querySelectorAll(".tweetme-2-detail")
tweetDetailElements.forEach(container=>{
  ReactDOM.render(
    e(TweetDetailComponent, container.dataset),
    container);
})

