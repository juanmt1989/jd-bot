import { runtime } from 'webextension-polyfill'
import { getCurrentTab } from '../../helpers/tabs'
import  jdbotScheme,  {userformation} from './../../helpers/commonobjects/scheme'
import  jdbActions from './../../helpers/commonobjects/enumactions'

type Message = {
    from: string
    to: string
    action: any
  }
  
async function Sender() {

    // step 2
    return runtime.sendMessage({ from: 'content', to: 'background', action: 'click' })
  }


  async function Receiver() {

    runtime.onMessage.addListener(async (message: Message) => {
        if (message.from === 'popup' && message.to === 'background') {
            // if (message.action instanceof jdbActions.CustomerAction){
            //     PopupMsg(message.action)
            // }

        }
      })
  }

  async function PopupMsg(action:jdbActions.CustomerAction) {
    return runtime.sendMessage({ from: 'background', to: 'content', action: action })
}
  