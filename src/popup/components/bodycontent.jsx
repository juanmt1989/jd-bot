import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Link,useLocation} from 'react-router-dom';
import TxnHistory from './views/transactionshistory'
import viewBOTUsers from './views/botuserslist'
import SideDrawerMenu from './sidedrawer'
import FinanceChart from './views/finance'
import UserAccount from './views/useraccount'
import FooterMainMenu from './footermenu'
import useDrawerState from './helper/eventhandler'


export default function BodyContent() {
    const {toggleDrawer,state} = useDrawerState();

    return (
    <BrowserRouter>
        <SideDrawerMenu open={state}/>
        <Routes >
          <Route path='/txnhistiory' element={<TxnHistory/>} />
          <Route path='/finance' element={<FinanceChart/>} />
          <Route path='/bots' element={<viewBOTUsers/>} />
          <Route path='/useraccount' element={<UserAccount/>} />
        </Routes>
        <FooterMainMenu/>
    </BrowserRouter>
    );
  }