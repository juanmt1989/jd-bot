import { runtime } from 'webextension-polyfill'
import { getCurrentTab } from '../../helpers/tabs'
import * as crypt from '../../helpers/encrypt'
import {BidAction}  from '../../models/eventaction'
import {GetLastCoinExecution} from '../apicalls/solescall'
import {Sender} from '../distpacher/contentservice'
import {DateTimeToString,getTimeLeftBetweenDateAndNow,StringUTCDateToLocalDate,addHoursToDate} from '../../helpers/util'
import Enumerable from 'linq'



export const RunBot = async () => {
 
    const encryptedData = await Sender(BidAction.GetBidRules)

    const bidRule =  crypt.decryptData(encryptedData);

    const history = await GetLastCoinExecution();

    const lastCoins = Enumerable.from<any>(history).select(x=> ({...x, Coin: x.Coin.split('/')[0]}))
   

    ///unificar el tiempo
    //convertirlo de utc a local
    //determinar el tiempo restante en base a 8 horas

    
    //buscar la ultima moneda
    let coinName : string = lastCoins.firstOrDefault()?.Coin;;

    // console.warn(lastCoins.toArray());
    // console.warn(coinName);

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
                                OperationDate: DateTimeToString(StringUTCDateToLocalDate(x.Date,x.Hour,"dd/MM/YYYY")), 
                                LocalDate :  StringUTCDateToLocalDate(x.Date,x.Hour,"dd/MM/YYYY")
                            })).select(x=> ({
                                ...x,
                                DueDate: addHoursToDate( x.LocalDate , nextCoinRule[0].interval)
                            })).select(x=> ({
                                Coin :  x.Coin,
                                LocalDate : x.OperationDate,
                                DueDate : x.DueDate,
                                TimeLeft: getTimeLeftBetweenDateAndNow(x.DueDate)
                            })).toArray()


    let obj = Enumerable.from<any>(nextCoin)
                        .where(x => x.TimeLeft.seconds >0)
                        .orderByDescending(x => x.TimeLeft.seconds )
                        .firstOrDefault();

    console.warn(nextCoin);

    setTimeout(() => {
        alert( obj.Coin +" coin is ready to next operation");
      }, obj.TimeLeft.seconds *1000);

    //determinar el tiempo restante en para poder operar
        // regla de las 8 horas
            // regla de tiempo entre ronda
                //disponibiliadad del balance








    //validar si se puede operar a travas de la disponibiliadad del monto

    //verificar la tolerancia
    //validar su tolerancia para poder albitrar
    //comparar su tolerancia con con el roi sugerido

    //operar

}

