import { runtime } from 'webextension-polyfill'
import { getCurrentTab } from '../../helpers/tabs'
import * as crypt from '../../helpers/encrypt'
import {CustomerAction}  from '../../models/eventaction'
import {GetUserInformation} from '../apicalls/solescall'


export async function Sender(action:any,data?:any) {

    return runtime.sendMessage({ from: 'content', to: 'background', action: action, data: data })
}


export async function Receiver() {

  runtime.onMessage.addListener(async (message: any) => {
      if (message.from === 'background' && message.to === 'content') {
        if (message.action.toString() == CustomerAction.GetCustomer){
            let data =  await GetUserInformation()
            let encrypt = crypt.encryptData(data)
            
            Sender(CustomerAction.SaveCustomer,encrypt)
        }

      }
    })
}

