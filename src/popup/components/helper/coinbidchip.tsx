import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import AvailableCoinDialog,{useCoinPopupState} from './coinpopup'

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function CoinChipsArray({labelOrder}:{labelOrder:string}) {
  const {openPopUp,setOpen,openCoinPopUp} = useCoinPopupState()

  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: 'Add' },
    { key: 2, label: 'Albitrum' },
    { key: 3, label: 'Cosmos' },
    { key: 4, label: 'Filecoin' },
    
  ]);

  const addCoinPopup = () => () => {
    //setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
        <Box component="fieldset" color="text.secondary"
        sx={{ display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        p: 0.5,
        m: 0,
        width:260,}}>

            <legend>
                <Typography color="text.secondary" variant="body2">
                 {labelOrder}
                </Typography>
            </legend>
            <AvailableCoinDialog setOpen={setOpen} openCoinPopUp={openCoinPopUp} openPopUp ={openPopUp} />
            {chipData.map((data) => {
                let icon;

                if (data.label === 'Add') {
                icon = <AddCircleIcon />;
                }

        return (
          <ListItem key={data.key}>
            <Chip
                size="small"
                icon={icon}
                label={data.label}
                onClick={data.label === 'Add' ? (event) => openCoinPopUp(event, true) : undefined}
                onDelete={data.label === 'Add' ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
      </Box>
    </Paper>
  );
}
