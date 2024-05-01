import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Paper from '@mui/material/Paper';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import {HomePage,ContactPage,AboutPage} from './template-comp'

export default function FooterMainMenu() {
    const [value, setValue] = React.useState('home');
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
      alert(newValue)
    };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <HashRouter>
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="Accounts"
            value="accounts"
            icon={<AccountBoxIcon />}>
            <Link to="/accounts"></Link>
          </BottomNavigationAction>
          <BottomNavigationAction 
            label="Home" 
            value="home" 
            icon={<HomeIcon />} >
            <Link to="/"></Link>
          </BottomNavigationAction>
          <BottomNavigationAction
            label="Finance"
            value="finance"
            icon={<LeaderboardIcon />}> 
            <Link to="/finance"></Link>
          </BottomNavigationAction>
        </BottomNavigation>
        {/* <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accounts" element={<AboutPage />} />
          <Route path="/finance" element={<ContactPage />} />
        </Routes> */}
      </HashRouter>
    </Paper>
  );
}