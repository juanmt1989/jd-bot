import * as React from 'react';


export default function useDrawerState() {
    const [state, setState] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState<number>();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      event.preventDefault();
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
     // console.log('inside useDrawerState',open);
        setState(open)
      ;
    };

    

    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
    ) => {
      event.preventDefault();
      setSelectedIndex(index);
    };


    return {toggleDrawer,state,setState,selectedIndex,handleListItemClick}
  }



