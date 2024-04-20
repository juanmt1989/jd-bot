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


// export async function getCurrentTab() {
//   const list = await tabs.query({ active: true, currentWindow: true })

//   return list[0]
// }

// export async function getCurrentTab() {
//   const tab = await tabs.getCurrent();

//   return tab
// }