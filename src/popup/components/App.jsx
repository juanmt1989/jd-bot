import React from 'react'
import { createRoutesFromElements, Route } from "react-router-dom";
import { HashRouter, Routes, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import MainMenu from './menu'
import './App.css'
import BodyContent from './bodycontent'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Box } from '@mui/material';

function App() {
  return (
    <div className="App">
      <MainMenu/>
      <BodyContent/>  
    </div>
  )
}

export default App



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainMenu/>} >
    </Route>
  )
);

