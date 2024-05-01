import React from 'react'
import { Outlet } from "react-router-dom";
import Container from '@mui/material/Container';
import MainMenu from './menu'
import FooterMainMenu from './footermenu'
import './App.css'
import TxnHistory from './views/TxnHistory'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Box } from '@mui/material';

function App() {
  return (
    <div className="App">
      <MainMenu />
      <RouterProvider router={router} />
      <Container sx={{ bgcolor: '#cfe8fc', height: '10vh' }} > 
       test
      </Container>
      <FooterMainMenu/>
    </div>
  )
}

export default App



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />,
    children: [
      {
        element: <TxnHistory />,
      },
    ],
  },
]);

