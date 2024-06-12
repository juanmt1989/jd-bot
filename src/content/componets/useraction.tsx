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
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { SxProps } from '@mui/system';

import {GetUserInformation} from '../apicalls/solescall'
import { runtime, storage } from 'webextension-polyfill'
import * as crypt from '../../helpers/encrypt'
import {CustomerAction}  from '../../models/eventaction'
import {Sender} from '../distpacher/contentservice'


let icons = [
    { icon: <CloudSyncIcon />, name: 'Refresh Account',id:"ra"},
    { icon: <LinkOffIcon />, name: 'Un-link Account',id:"ua" },
    { icon: <AddLinkIcon />, name: 'Link Account' ,id:"la"},
  ];
let actions = icons;
let handleEvent:any;

const defStyle = {
  color: 'primary' as 'primary',
};
const linkinStyle = {
  color: 'common.white',
  bgcolor: grey[500],
  '&:hover': {
    bgcolor: grey[600],
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
    color: grey[500] as 'secondary',
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

        if (isLinked) {
          timer.current = setTimeout(() => {
            setStatusSyle(2);
            setLoading(false);
          }, 2000);
        }
    }


    if (isLinked){
        actions= icons.filter(x=>x.id !=="la");
        handleEvent =handleClose;
    }
    else{
        actions= icons.filter(x=>x.id ==="la");
        handleEvent =linkUser;
    }

  //the link button should get the user info from soles and send it to the background to store it.
  //then a progress should be shown to the user, 
    //where the background process is storing the data
    //get a nickname 
    //and link the nickname with the real user
  
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
            onClick={handleEvent}
            
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
