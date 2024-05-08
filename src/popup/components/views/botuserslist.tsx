import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import {fetchBotUsers} from '../../apicalls/botdata'
import {BotUser} from '../../../models/botusermodel'

import List from '@mui/material/List';




export default function ViewBOTUsers() {
  const [progress, setProgress] = useState(10);
  const [botList, setBotData] = useState< BotUser[]>([]);

    
  useEffect(() => {
    async function GetBotList() {
      const botList = await fetchBotUsers();
      setBotData(botList);
    }
    GetBotList();

    return;
  }, [botList.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);


  function getUsersBot(){
    return  botList.map((userbot) => {
      return (
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h5" component="div">
              {userbot.nickname}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              ${userbot.earn}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="body2" component="div">
              Today:
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              ${userbot.today}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              Current:
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              ${userbot.current}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="body2" component="div">
              Last Coin:
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {userbot.lastcoin}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="body2" component="div">
              Next Coin:
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {userbot.nextcoin}
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="body2" component="div">
              <Typography gutterBottom variant="body2" component="div">
                Current Bid
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="First" size="small" />
                <Chip label="Second" size="small" />
                <Chip label="Third" size="small" />
              </Stack>
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              <Typography gutterBottom variant="body2" component="div">
                Next Operation
              </Typography>
              <CircularProgressWithLabel value={progress} />
            </Typography>
          </Stack>
          <Typography gutterBottom variant="body2">
            {/* <Alert severity="warning">This is a warning Alert.</Alert> */}
          </Typography>
        </Box>
      </Card>
      );
    });
  }

  return (<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {getUsersBot()}
          </List>);
};



function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
