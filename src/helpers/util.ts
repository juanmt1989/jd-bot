import { json } from "stream/consumers";

const keepBackgroundAlive = () =>{
    setTimeout(function(){
        chrome.runtime.sendMessage('ping', function(){
            console.log("pong");
        });
        keepBackgroundAlive();
    }, 10000);
  };

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

const StringUTCDateToLocalDate = (sDate:string,sTime?:string, dFormat?:string) =>{

    let date: Date = new Date();

    if(sDate===null || sDate ===""){
        console.error("Date field is required.");
    } 
    
   // console.warn(`date: ${sDate}, formart: ${dFormat}`)

    let d = {year:0,month:0,day:0,hour:0, minutes:0,second:0};   
    let spread = dFormat?.includes("/") ? sDate.split("/") : sDate.split("-");

    if(dFormat?.includes("YYYY-MM-dd") ||  dFormat?.includes("YYYY/MM/dd")){

        let day = dFormat?.includes("HH:MM:ss")? spread[2].split(" ")[0]: spread[2];
        d.year=Number(spread[0]);
        d.month = Number(spread[1]);
        d.day = Number(day);
       
    }

    if(dFormat?.includes("MM-dd-YYYY") ||  dFormat?.includes("MM/dd/YYYY")){

       
        d.month = Number(spread[0]);
        d.day = Number(spread[1]);
        d.year=Number(spread[2]);
    }

    if(dFormat?.includes("dd-MM-YYYY") ||  dFormat?.includes("dd/MM/YYYY")){
    
        
        d.day = Number(spread[0]);
        d.month = Number(spread[1]);
        d.year=Number(spread[2]);
    }

    //"2024/04/19 21:39:23"
    if(!(sTime===null) && !(sTime ==="")) {
        spread = sTime?.split(":")||[];
        d.hour =Number(spread[0]);
        d.minutes =Number(spread[1]);
    }
    else if(dFormat?.includes("HH:MM:ss")){
        spread = sDate.split(" ")[1].split(":")
        d.hour =Number(spread[0]);
        d.minutes =Number(spread[1]);
        d.second =Number(spread[2]);
    }
    //console.warn(`join date: ${JSON.stringify(d)}`)

    let utc = Date.UTC(d.year,d.month-1,d.day,d.hour,d.minutes,d.second);  //index month  
    return  new Date(utc);
}

const DateTimeToString = (objDate:Date) =>{
    const dateLocal = objDate.toLocaleString("en-US", { timeZoneName :"short",hour12: false });
    return dateLocal;
}


const getTimeLeftBetweenDateAndNow = (date: Date) :DueDate => {
const now = new Date();
let timeLeft = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let days = 0;

if (now < date) {
   
    seconds = Math.floor(date.getSeconds() - now.getSeconds());
    minutes = Math.floor(date.getMinutes() - now.getMinutes());
    hours = Math.floor(date.getHours() - now.getHours());
    days = Math.floor(date.getDay() - now.getDay());
    timeLeft = Math.floor(date.getTime() - now.getTime());
}

return { days, hours, minutes, seconds, timeLeft};
};


const addHoursToDate = (date:Date,hours:number) : Date =>{

    date.setHours(date.getHours() + hours);
    return date;
}

export type DueDate = {
    days: number, 
    hours : number, 
    minutes : number, 
    seconds : number, 
    timeLeft : number
}

export enum TimeFormat {  H, M, S, ms } 

export {keepBackgroundAlive,sleep,jsontoArray}

export { StringUTCDateToLocalDate, DateTimeToString, getTimeLeftBetweenDateAndNow,addHoursToDate}  