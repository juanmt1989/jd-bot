

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

const StringUTCDateToLocalDate = (sDate:string,sTime:string, dFormat?:string) =>{

    let date: Date = new Date();

    if(sDate===null || sDate ==="") 
        console.error("Date field is required.");

        let d = {
            year:0,
            month:0,
            day:0,
            hour:0,
            minutes:0,
            second:0
        };   

    switch(dFormat) { 
        case "YYYY-MM-dd": { 
            let spread = sDate.split("-");
            d.year=Number(spread[0]);
            d.month = Number(spread[1]);
            d.day = Number(spread[2]);

            break; 
        } 
        case "MM/dd/YYYY": { 
            let spread = sDate.split("/");
            d.month = Number(spread[0]);
            d.day = Number(spread[1]);
            d.year=Number(spread[2]);

            break; 
        } 
        case "dd/MM/YYYY": { 
            let spread = sDate.split("/");
            d.month = Number(spread[1]);
            d.day = Number(spread[0]);
            d.year=Number(spread[2]);

            break; 
        } 
        default: { 
            console.error("We need to know a valid date format")
            break; 
        } 
        } 

        if(!(sTime===null) && !(sTime ==="")) {
            let spread = sTime.split(":");
            d.hour =Number(spread[0]);
            d.minutes =Number(spread[1]);
        }
        
        let utc = Date.UTC(d.year,d.month-1,d.day,d.hour,d.minutes,d.second);  //index month  
        return  new Date(utc);
    }

const DateTimeToString = (objDate:Date) =>{
    const dateLocal = objDate.toLocaleString("en-US", { timeZoneName :"short",hour12: false });
    console.warn(dateLocal);
    return dateLocal;
}


const getTimeLeftBetweenDateAndNow = (date: Date) :DueDate => {
const now = new Date();
let timeLeft : string = "" ;
let seconds = 0;
let minutes = 0;
let hours = 0;
let days = 0;

if (now < date) {
    const difference = date.getTime() - now.getTime();
    seconds = Math.floor(difference / 1000);
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);
    
    if (days > 1) {
        timeLeft = `${days} days`;
    } else if (days == 1) {
        timeLeft = `${days} day`;
    } else if (days < 1) {
        if (hours > 1) {
            timeLeft = `${hours} hours`;
        } else if (hours == 1) {
            timeLeft = `${hours} hour`;
        } else if (hours < 1) {
            if (minutes > 1) {
                timeLeft = `${minutes} minutes`;
            } else if (minutes == 1) {
                timeLeft = `${minutes} minute`;
            } else if (minutes < 1) {
                timeLeft = `0 seconds`;
            }
        }
    }
}

return { days, hours, minutes, seconds, timeLeft};
};


const addHoursToDate = (date:Date,hours:number) : Date =>{

    date.setHours(date.getHours() + hours);
    return date
}

export type DueDate = {
    days: Number, 
    hours : Number, 
    minutes : Number, 
    seconds : Number, 
    timeLeft : String
}

export enum TimeFormat {  H, M, S, ms } 

export {sleep, StringUTCDateToLocalDate, DateTimeToString, getTimeLeftBetweenDateAndNow,addHoursToDate}  