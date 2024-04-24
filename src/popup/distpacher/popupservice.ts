import { runtime } from 'webextension-polyfill'
import { getCurrentTab } from '../../helpers/tabs'
import  jdbScheme,  {userformation} from './../../helpers/commonobjects/scheme'
import  jdbActions  from './../../helpers/commonobjects/enumactions'

type CustomerMessage = {
    from: string
    to: string
    action: jdbActions.CustomerAction
  }

 
async function Sender(action:jdbActions.CustomerAction) {
    return runtime.sendMessage({ from: 'popup', to: 'background', action: action })
}


  async function Receiver() {

    runtime.onMessage.addListener(async (message: CustomerMessage) => {
        if (message.to === 'background') {
          console.log('background handled: ', message.action)
          const tab = await getCurrentTab()
          const tabId = tab.id
    
          if (tabId) {
            return (tabId.toString())
          }
        }
      })
  }