import React from 'react'
import { createRoutesFromElements, Route } from "react-router-dom";
import { HashRouter, Routes, Link } from 'react-router-dom';
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
      <MainMenu/>
      {/* <TxnHistory/> */}
      <FooterMainMenu/>
      
    </div>
  )
}

export default App



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainMenu/>} >
      {/* <Route  element={<TxnHistory/>} /> */}
    </Route>
  )
);

