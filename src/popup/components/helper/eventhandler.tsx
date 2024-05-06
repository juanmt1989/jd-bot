import * as React from 'react';
import { runtime } from 'webextension-polyfill'

export default function useDrawerState() {
 
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
          console.log("sending message to SideDrawerMenu ",open)
          const sending = runtime.sendMessage({ to: 'SideDrawerMenu', state: open })
          sending.then(handleResponse, handleError);
        ;
      };

      function handleResponse(message:any) {
        console.log(`SideDrawerMenu sent a response: ${message.response}`);
      }
      
      function handleError(error:any) {
        console.log(`SideDrawerMenu Error: ${error}`);
      }
    return {toggleDrawer}
  }



