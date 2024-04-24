import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';

const AddUser = () => {
  const [clicked, setClicked] = useState(false);

  const handleIconClick = () => {
    setClicked(!clicked); 
  };

  return (
    <IconButton onClick={handleIconClick}>
      {clicked ? <BlockIcon /> : <AddIcon />}
    </IconButton>
  );
};

export default AddUser;