import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import GlobalStyles from '@mui/material/GlobalStyles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import useDrawerState from './helper/eventhandler'
import { BrowserRouter, Route, Routes, Link,useLocation} from 'react-router-dom';
import TxnHistory from './views/transactionshistory'
import ViewBOTUsers from './views/botuserslist'
import SideDrawerMenu from './sidedrawer'
import FinanceChart from './views/finance'
import UserAccount from './views/useraccount'
import FooterMainMenu from './footermenu'

export default function MainMenu() {
  const ref = React.useRef<HTMLDivElement>(null);
  const {toggleDrawer,state} = useDrawerState();


  return (
    <React.Fragment>
      <GlobalStyles
        styles={(theme) => ({
          body: { backgroundColor: theme.palette.background.paper },
        })}
      />
      <div>
        <AppBar position="fixed" className='' color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              sx={{ mr: 2 }}
              color="inherit"
              aria-label="menu">

            <MenuIcon  onClick={toggleDrawer(true)} />

            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              JD Bot
            </Typography>
          </Toolbar>
        </AppBar>
        <div className='header-size'></div>
      </div>
      <BrowserRouter>
          <SideDrawerMenu state={state} toggleDrawer={toggleDrawer}/>
          <Routes >
            <Route path='/txnhistiory' element={<TxnHistory/>} />
            <Route path='/finance' element={<FinanceChart/>} />
            <Route path='/bots' element={<ViewBOTUsers/>} />
            <Route path='/useraccount' element={<UserAccount/>} />
          </Routes>
          <FooterMainMenu/>   
      </BrowserRouter>
    </React.Fragment>
  );
}
