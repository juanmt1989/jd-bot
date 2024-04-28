import { runtime } from 'webextension-polyfill'
import { getCurrentTab } from '../../helpers/tabs'
import  jdbScheme,  {userformation} from './../../helpers/commonobjects/scheme'
import {CustomerAction}  from '../../helpers/commonobjects/customeraction'
import * as crypt from '../../helpers/encrypt'
  
  export async function Sender() {

    // step 2
    return runtime.sendMessage({ from: 'content', to: 'background', action: 'click' })
  }


  export async function Receiver() {

    runtime.onMessage.addListener(async (message: any) => {
      
        if (message.from === 'popup' && message.to === 'background') {
            console.log('Receiver: from popup to backgroundadd ',message.action)
            if (message.action.toString() == CustomerAction.GetCustomer)
              {
                PopupMsg(message.action)
              }
        }

        if (message.from === 'content' && message.to === 'background') {
          console.log('Receiver: from content to backgroundadd ',message.action)
          if (message.action.toString() == CustomerAction.SaveCustomer)
          {
              let decryptdata = crypt.decryptData(message.data)
              console.log(decryptdata)
              
          }

        }
      })
  }

  async function PopupMsg(action:CustomerAction) {
    console.log('PopupMsg: from backgroundadd to content ',action)
    return runtime.sendMessage({ from: 'background', to: 'content', action: action })
}
  