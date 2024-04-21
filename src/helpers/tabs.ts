import { Tabs,tabs } from 'webextension-polyfill'


export function getCurrentTab() {
   return new Promise<Tabs.Tab>((resolve, reject) => {
    tabs.query({ active: true, currentWindow: true })
      .then((list) => {
        resolve(list[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
 
}