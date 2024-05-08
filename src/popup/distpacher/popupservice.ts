import { runtime } from 'webextension-polyfill'
import { getCurrentTab } from '../../helpers/tabs'
import  jdbScheme,  {userformation} from '../../models/scheme'
import {CustomerAction,CustomerMessage}  from '../../models/customeraction'

export async function Sender(action:CustomerAction) {
    console.log('Sender: from popup to backgroundadd ',action)
   runtime.sendMessage({ from: 'popup', to: 'background', action: action })
   
}


export async function Receiver() {

    // runtime.onMessage.addListener(async (message: CustomerMessage) => {
    //     if (message.to === 'background') {
    //       console.log('background handled: ', message.action)
    //       const tab = await getCurrentTab()
    //       const tabId = tab.id
    
    //       if (tabId) {
    //         return (tabId.toString())
    //       }
    //     }
    //   })
  }