import * as React from 'react';


export default function useDrawerState() {
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        console.log('inside useDrawerState',open);
         setState(open)
        ;
      };

    return {toggleDrawer,state,setState}
  }



