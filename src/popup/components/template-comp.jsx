import React from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';

// Components
const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page content.</p>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page content.</p>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>This is the contact page content.</p>
    </div>
  );
};



export  {HomePage,ContactPage,AboutPage};