
import { runtime, storage, tabs } from 'webextension-polyfill'
import { getCurrentTab } from '../../helpers/tabs'
import  jdbScheme,  {userformation} from '../../models/scheme'
import {CustomerAction,BidAction}  from '../../models/eventaction'
import {SaveUserInfo,GetBidRules,SaveBotInfo} from '../apicalls/dataAcces'
import {GetGenderByMail,GetUserByGender,GetGenderByName} from '../apicalls/parsercall'
import * as crypt from '../../helpers/encrypt'
  
  export async function Sender() {

    // step 2
    return runtime.sendMessage({ from: 'content', to: 'background', action: 'click' })
  }


  export async function Receiver() {

    runtime.onMessage.addListener(async (message: any) => {
      
        if (message.from === 'popup' && message.to === 'background') {
            console.info('Receiver: from popup to backgroundadd ',message.action)
            if (message.action.toString() === CustomerAction.GetCustomer)
              {
                PopupMsg(message.action)
              }
        }

        if (message.from === 'content' && message.to === 'background') {
          console.info('Receiver: from content to backgroundadd ',message.action)

          if (message.action.toString() === CustomerAction.SaveCustomer)
          {
              let decryptdata = crypt.decryptData(message.data);
              let uid =  await SaveUserInfo(decryptdata);
              let gender1 = await GetGenderByMail(decryptdata.email);
              let gender2 = await GetGenderByName(decryptdata.name);

              const randomUser = await GetUserByGender(gender1||gender2||"");
             
              let bot ={
                idUser: uid,
                gender:  randomUser[0].gender,
                name: decryptdata.name.split(" ")[0],
                salutation: randomUser[0].salutation,
                nickname: randomUser[0].nickname,
              }

              const botud = await SaveBotInfo(bot);
              
              return Promise.resolve({botud :botud,isLinked:true});
          }

          if (message.action.toString() === BidAction.GetBidRules)
          {
              const result = await GetBidRules();
              let encryptdata = crypt.encryptData(result);
              return Promise.resolve(encryptdata);
              
          }

        }
      })
  }

  async function PopupMsg(action:CustomerAction) {
    console.log('PopupMsg: from backgroundadd to content ',action);
    return runtime.sendMessage({ from: 'background', to: 'content', action: action });
}
  