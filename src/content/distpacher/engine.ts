import { runtime } from 'webextension-polyfill'
import { getCurrentTab } from '../../helpers/tabs'
import {BidAction}  from '../../models/eventaction'
import soles  from '../../models/solesmodel'
import {GetLastCoinExecution,GetWaitQueueTime} from '../apicalls/solescall'
import {Sender} from '../distpacher/contentservice'
import {jsontoArray} from '../../helpers/util'
import * as DT from '../../helpers/datetime'
import Enumerable from 'linq'



export const RunBot = async () => {
 

    const bidRule = await Sender(BidAction.GetBidRules)

    const history = await GetLastCoinExecution();

    let bidQueue = await GetWaitQueueTime();

    bidQueue = jsontoArray(bidQueue);

    bidQueue =Enumerable.from<soles.solesqueue>(bidQueue)
                        .select(x=> ({
                            bidutc : (x.has?x.date:x.now),
                            balance : x.balance
                        }))
                        .select(x=> ({
                            ...x,
                           nextbid : DT.StringUTCDateToLocalDate(x.bidutc,"","YYYY/MM/dd HH:MM:ss")
                        }))
                        .select(x=> ({
                            ...x,
                            nextbid :  DT.DateTimeToString(x.nextbid),
                            TimeLeft: DT.getTimeLeftBetweenDateAndNow(x.nextbid)

                        })).toArray()

    console.warn("bidqueue")
    console.warn(bidQueue);

    const lastCoins = Enumerable.from<any>(history).select(x=> ({...x, Coin: x.Coin.split('/')[0]}))
   

    
    //buscar la ultima moneda
    let coinName : string = lastCoins.firstOrDefault()?.Coin;;


    //next coin based on priority
    let nextPriority = 1;
    let nextCoinRule = Enumerable.from<any>(bidRule)
                                 .toArray();
    let getPriority = Enumerable.from<any>(bidRule)
                                .where(coin => coin.name ===coinName)
                                .firstOrDefault();
    if(nextCoinRule.length > 1)
        nextPriority = getPriority.priority === 3 ? 1 : getPriority.priority+1;

     nextCoinRule = Enumerable.from<any>(bidRule)
                    .where(coin => coin.priority ===nextPriority).toArray();
    

    //console.warn("interval time " +nextCoinRule[0].interval);

    //Simplify the object and date conversion to local
    let nextCoin = lastCoins.where(x => x.Coin ===nextCoinRule[0].name)
                            .take(nextCoinRule.length+1)
                            .select(x=> ({
                                Coin :  x.Coin,
                                Date :  x.Date ,
                                Hour :  x.Hour,
                                OperationDate: DT.DateTimeToString(DT.StringUTCDateToLocalDate(x.Date,x.Hour,"dd/MM/YYYY")), 
                                LocalDate :  DT.StringUTCDateToLocalDate(x.Date,x.Hour,"dd/MM/YYYY")
                            })).select(x=> ({
                                ...x,
                                DueDate: DT.addHoursToDate( x.LocalDate , nextCoinRule[0].interval)
                            })).select(x=> ({
                                Coin :  x.Coin,
                                LocalDate : x.OperationDate,
                                DueDate : x.DueDate,
                                TimeLeft: DT.getTimeLeftBetweenDateAndNow(x.DueDate)
                            })).toArray()


    let obj = Enumerable.from<any>(nextCoin)
                        .where(x => x.TimeLeft.seconds >0)
                        .orderByDescending(x => x.TimeLeft.seconds )
                        .firstOrDefault();

    console.warn("nextCoin")
    console.warn(nextCoin);

    // if(obj.TimeLeft !== undefined){
    //     setTimeout(() => {
    //        alert( obj.Coin +" coin is ready to next operation");
    //     }, obj.TimeLeft.seconds *1000);
    // }
   

    //determinar el tiempo restante en para poder operar
        // regla de las 8 horas
            // regla de tiempo entre ronda
                //disponibiliadad del balance


            //     Promise.all([

            //         new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
              
            //         new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
              
            //         new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
              
            //    ]).then(
              
            //        console.log(.....);
              
            //    );





    //validar si se puede operar a travas de la disponibiliadad del monto

    //verificar la tolerancia
    //validar su tolerancia para poder albitrar
    //comparar su tolerancia con con el roi sugerido

    //operar

}

