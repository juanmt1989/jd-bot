import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import Fab from '@mui/material/Fab';
import {Sender} from '../distpacher/popupservice'
import {CustomerAction}  from '../../models/customeraction'

const AddUser = () => {
  const [clicked, setClicked] = useState(false);
   console.log('def add user button..')
  const handleIconClick = () => {
    setClicked(!clicked); 
    console.log('add user button..')
    
    Sender(CustomerAction.GetCustomer)
    
  };

  return (
    <Fab
          color="secondary"
          sx={{
            position: 'absolute',
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
        >
           
        <IconButton onClick={handleIconClick}>
          {clicked ? <BlockIcon /> : <AddIcon />}
        </IconButton>
    </Fab>
  );
};

export default AddUser;

