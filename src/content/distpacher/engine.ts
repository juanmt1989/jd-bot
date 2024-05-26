import { runtime } from 'webextension-polyfill'
import { getCurrentTab } from '../../helpers/tabs'
import * as crypt from '../../helpers/encrypt'
import {BidAction}  from '../../models/eventaction'
import {GetLastCoinExecution} from '../apicalls/solescall'
import {Sender} from '../distpacher/contentservice'



export const RunBot = async () => {
    //cargar las reglas de las monedas
    const encryptedData = await Sender(BidAction.GetBidRules,null)

    const bidRule =  crypt.decryptData(encryptedData);

    console.warn(bidRule);

    //obtener la lista de monedas operadas
    const history = await GetLastCoinExecution();

    console.warn(history);

    //determinar cuando tiempo falta para siguente operacion de cada moneda

    //validar su tolerancia para poder albitrar

    //comparar su tolerancia con con el roi sugerido

    //poder operar
}

