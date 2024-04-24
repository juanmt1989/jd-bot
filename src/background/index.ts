import { runtime, storage } from 'webextension-polyfill'
import { getCurrentTab } from '../helpers/tabs'
import * as distpacher from './distpacher/backgroundservice'


async function incrementStoredValue(tabId: string) {
  const data = await storage.local.get(tabId)
  const currentValue = data?.[tabId] ?? 0

  return storage.local.set({ [tabId]: currentValue + 1 })
}

export async function init() {
  await storage.local.clear()

  runtime.onMessage.addListener(async (message: any) => {
    if (message.to === 'background' && message.action === 'click' ) {
      console.log('background handled: ', message.action)
      // const tab = await getCurrentTab()
      // const tabId = tab.id

      // if (tabId) {
      //   return incrementStoredValue(tabId.toString())
      // }
    }
  })
}

runtime.onInstalled.addListener(() => {

  distpacher.Receiver().then(() => {
    console.log('[background] distpacher loaded ')
  });//start listen popup and content

})
