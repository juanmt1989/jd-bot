import { runtime, storage, tabs } from 'webextension-polyfill'
import { getCurrentTab } from '../helpers/tabs'
import * as distpacher from './distpacher/backgroundservice'
import {daemon} from './daemon'



async function incrementStoredValue(tabId: string) {
  const data = await storage.local.get(tabId)
  const currentValue = data?.[tabId] ?? 0

  return storage.local.set({ [tabId]: currentValue + 1 })
}

export async function init() {
  await storage.local.clear()
//  const tab = await getCurrentTab()
  // const tabId = tab.id

  // if (tabId) {
  //   runScript(tabId);
  // }
  let isRemoved = false;
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      let tabId = sender.tab?.id ||0;
      if (request.greeting === "ping")
        sendResponse({farewell: "pong"});
        if(!isRemoved){
          runScript(tabId);
          isRemoved =true;
        }
    }
  );
}

runtime.onInstalled.addListener(() => {

  distpacher.Receiver().then(() => {
    console.log('[background] distpacher loaded ');
  });//start listen popup and content
  init();
})

const  runScript =  (tabId:number) =>{

  chrome.scripting
    .executeScript({
      target : {tabId : tabId},
      func : removeLogFx,
    })
    .then(() => console.info("injected a function") );
};

function removeLogFx(){
  console.warn("Attempt remove logs")
  window.console.log = () => {};
  console.log = () => {};
  window.console.log = () => undefined;
  window.console.log.prototype = undefined;

}

