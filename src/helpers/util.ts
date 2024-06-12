import { json } from "stream/consumers";
import { runtime } from 'webextension-polyfill'

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
    

    // do{
    //   console.info("sleep started");
    //   sleep(90000);
    //   console.info("sleep ended");

    // }while(isProcessActive())

    let session = {
      LastExecution:Date.now(),
      ExecutionCount: ++total
    }
    
    localStorage.setItem("sessionSB",JSON.stringify(session) );
     document.location.reload();
   
  }, randomTime);
};

const keepBackgroundAlive = () =>{
    setTimeout(function(){
    
        runtime.sendMessage({ from: 'content', to: 'background', action: 'ping' });
        keepBackgroundAlive();
    }, 10000);
  };

export enum TimeFormat {  H, M, S, ms } 

async function sleep(time:number,format?:TimeFormat) {
    let millisecond:number;
    switch(format) { 
        case TimeFormat.H: { 
            const ms = 3.6e+6;
            millisecond = Math.floor(time * ms );
            break; 
        }  
        case TimeFormat.M: { 
            const ms = 60000;
            millisecond = Math.floor(time * ms );
            break; 
        }  
        case TimeFormat.S: { 
            const ms = 1000;
            millisecond = Math.floor(time * ms );
            break; 
        }  
        default: { 
            millisecond = Math.floor(time);
            break; 
        } 
    }

    return new Promise(resolve => setTimeout(resolve, millisecond));
}

const jsontoArray = (jsonObj:any) =>
{
    let array = [];
    array.push(jsonObj);
    return array;
};

export {keepBackgroundAlive,sleep,jsontoArray,refreshPage}
