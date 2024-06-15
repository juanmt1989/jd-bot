import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green, grey } from '@mui/material/colors';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { SxProps } from '@mui/system';

import {GetUserInformation,GetCoinList} from '../apicalls/solescall'
import { runtime, storage } from 'webextension-polyfill'
import * as crypt from '../../helpers/encrypt'
import {BidAction, CustomerAction}  from '../../models/eventaction'
import {Sender} from '../distpacher/contentservice'


const defStyle = {
  color: 'primary' as 'primary',
};
const linkinStyle = {
  color: 'common.white',
  bgcolor: 'secondary',
  '&:hover': {
    bgcolor: 'secondary',
  },
};
const linkedStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

const fabs = [
  {
    color: 'primary' as 'primary',
    sx: defStyle as SxProps,
    icon: <SpeedDialIcon />,
    label: 'Link Account',
  },
  {
    color: 'secondary' as 'secondary',
    sx: linkinStyle as SxProps,
    icon: <HourglassBottomIcon />,
    label: 'Linking Account..',
  },
  {
    color: green[500]  as 'success',
    sx: linkedStyle as SxProps,
    label: 'Account Linked',
    icon: <SpeedDialIcon />,
  },
];

export default function UserAction() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isLinked, setLinkedAcc] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const [index, setStatusSyle] = React.useState(0);
    const timer = React.useRef<ReturnType<typeof setTimeout>>();
  
    let icons = [
      { icon: <SyncProblemIcon />, name: 'Linking Error',id:"le" , event: handleClose,},
      { icon: <CurrencyExchangeIcon />, name: 'Refresh Coin List',id:"rcl" , event: RefreshCoins,},
      { icon: <CloudSyncIcon />, name: 'Refresh Account',id:"ra", event: handleClose,},
      { icon: <LinkOffIcon />, name: 'Un-link Account',id:"ua" , event: handleClose,},
      { icon: <AddLinkIcon />, name: 'Link Account' ,id:"la", event: linkUser,},
    ];
  let actions = icons;
  let handleEvent:any;

    React.useEffect(() => {
      return () => {
        clearTimeout(timer.current);
      };
    }, []);

    React.useEffect(() => {
      let locked = localStorage.getItem('isLinked')=== "true" || false
      setLinkedAcc(locked);
      if (locked) setStatusSyle(2);
    }, []);

    async function linkUser(){
        setStatusSyle(1);
        setLoading(true);
        let data =  await GetUserInformation()
        let encrypt = crypt.encryptData(data)
        
        const ret = await  Sender(CustomerAction.SaveCustomer,encrypt)

        localStorage.setItem('isLinked', ret.isLinked + '')
        localStorage.setItem('botUID', ret.botud + '')

        setLinkedAcc(ret.isLinked);
        setOpen(false);

        if (ret.isLinked) {
          timer.current = setTimeout(() => {
            setStatusSyle(2);
            setLoading(false);
          }, 2000);
        }
    }

    async function RefreshCoins(){
      setStatusSyle(1);
      setLoading(true);
      let data =  await GetCoinList()
      let encrypt = crypt.encryptData(data)
      
      const ret = await  Sender(BidAction.UpdateCoinList,encrypt)

      setLinkedAcc(ret.isUpdated);
      setOpen(ret.isUpdated);

      if (ret.isUpdated) {
        timer.current = setTimeout(() => {
          setStatusSyle(2);
          setLoading(false);
        }, 2000);
      }
  }


    if (isLinked){
        actions= icons.filter(x=>x.id !=="la");
    }
    else{
        actions= icons.filter(x=>x.id ==="la");
    }

  
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1}}>
      <SpeedDial
        ariaLabel="User Actions"
        sx={{ position: 'absolute', bottom: 15, right: 15 }}
        icon={fabs[index].icon}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        FabProps={fabs[index]}
        
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.event}
            
          />
        ))}
      </SpeedDial>
      {loading && (
          <CircularProgress
            size={56}
            sx={{
              color: green[500],
              position: 'absolute',
              bottom: 15,
              right: 15,
              zIndex: 5000,
            }}
          />
        )}
    </Box>
  );
}
