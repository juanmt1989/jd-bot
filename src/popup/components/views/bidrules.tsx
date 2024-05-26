import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MultipleSelectCoin from './../helper/coinbidselector'
import CoinChipsArray from './../helper/coinbidchip'
//import { Paper } from '@mui/material';

export default function ViewBidRules() {

    function AddEditButtons() {
        return (
            <Stack direction="row" spacing={1}>
                <Typography gutterBottom variant="body2">
                    Coin Bid order: 
                </Typography>
                <Chip label="Add Single" size="small" />
                <Chip label="Add Group" size="small"  />
            </Stack>
        );
    }
    
  return (
    <Card variant="outlined" sx={{ maxWidth: 360 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            Bid Rule
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            #1
          </Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          This rules is for those account with an inverstmen of 800 USD.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
         Coin Bid order: 
        </Typography>
        <Stack spacing={1} >
            <CoinChipsArray labelOrder="First Coin(s)"/>
            <CoinChipsArray labelOrder="Second Coin(s)"/>
            <CoinChipsArray labelOrder="Third Coin(s)"/>
        </Stack>
      </Box>
      
    </Card>
  );
}


