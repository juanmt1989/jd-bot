import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Link,useLocation} from 'react-router-dom';
import TxnHistory from './views/transactionshistory'
import ViewUsersList from './views/userslist'
import SideDrawerMenu from './sidedrawer'
import FinanceChart from './views/finance'
import UserAccount from './views/useraccount'
import FooterMainMenu from './footermenu'

export default function BodyContent() {
    return (
     
    <BrowserRouter>
        <SideDrawerMenu/>
        <Routes >
          <Route path='/txnhistiory' element={<TxnHistory/>} />
          <Route path='/finance' element={<FinanceChart/>} />
          <Route path='/users' element={<ViewUsersList/>} />
          <Route path='/useraccount' element={<UserAccount/>} />
        </Routes>
        <FooterMainMenu/>
    </BrowserRouter>
    );
  }