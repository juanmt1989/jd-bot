import React from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import {HomePage,ContactPage,AboutPage} from './template-comp'



const NavMenu = () => {
  return (
    <HashRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </HashRouter>
  );
};

export default NavMenu;