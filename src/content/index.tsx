import { runtime } from 'webextension-polyfill'
import {initBtnExexute} from './observer/btnexecute'
import * as distpacher from './distpacher/contentservice'
import {RunBot} from './distpacher/engine'
import {sleep} from './../helpers/util'
import {InjectScript} from './../helpers/injectscript'



type Listener = (event: MouseEvent) => void

let count = 0

function registerClickListener(listener: Listener) {
  window.addEventListener('click', listener)

  // step 2
  return function cleanup() {
    window.removeEventListener('click', listener)
  }
}

async function countClicks() {
  count++
  console.info('click(): ', count)
  console.log = () =>{};
  // step 2
  return runtime.sendMessage({ from: 'content', to: 'background', action: 'click' })
}

const isProcessActive= ()=>{ return (localStorage.getItem("isProcessActive")==="true"); };

function refreshPage() {
  var min = 7.6 * 60 * 1000; // 7.6 minutes in milliseconds
  var max = 13.27 * 60 * 1000; // 13.27 minutes in milliseconds
  var randomTime = Math.floor(Math.random() * (max - min + 1)) + min;

  console.info("Next refresh in "+randomTime);

  let sessionSB = localStorage.getItem("sessionSB");
  localStorage.setItem("isProcessActive","false");
  let total: number = 0;

  if(sessionSB!= null) total=JSON.parse(sessionSB).ExecutionCount


  setTimeout(function() {
    

    do{
      console.info("sleep started");
      sleep(90000);
      console.info("sleep ended");

    }while(isProcessActive())

    let session = {
      LastExecution:Date.now(),
      ExecutionCount: ++total
    }
    
    localStorage.setItem("sessionSB",JSON.stringify(session) );
     document.location.reload();
   
  }, randomTime);
}

export function init() {
  //registerClickListener(countClicks)
  
  initBtnExexute();
  InjectScript();
  distpacher.Receiver().then(() => {
    console.info('[content] distpacher Receiver')
  }).catch((error) => {
    console.warn('Error attempting to listen bgs:', error);
});
  refreshPage();
  RunBot();
}

init();
keepBackgroundAlive();


function keepBackgroundAlive(){
  setTimeout(function(){
      chrome.runtime.sendMessage('ping', function(){
          console.log("pong");
      });
      keepBackgroundAlive();
  }, 10000);
};


