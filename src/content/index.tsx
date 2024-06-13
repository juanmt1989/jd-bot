import React from 'react';
import ReactDOM from 'react-dom/client';
import BtnExexute from './observer/btnexecute'
import * as distpacher from './distpacher/contentservice'
import {RunBot} from './distpacher/engine'
import {refreshPage,keepBackgroundAlive} from './../helpers/util'
import {InjectScript} from './../helpers/injectscript'
import UserAction from './componets/useraction'

const InjectBot = async () =>{
  
  if(!document.location.href.includes("manual"))
   return;

  const rootElement = document.createElement("div");
  rootElement.style.position = "sticky";
  rootElement.style.bottom = "10px";
  rootElement.style.left = "95%";
  rootElement.style.width = "100px";
  
  rootElement.id = "jd-bot";

  document.getElementsByTagName('body')[0].appendChild(rootElement);

  const root = ReactDOM.createRoot(rootElement);
  root.render(
  <React.StrictMode>
      <BtnExexute />
      <UserAction/>
  </React.StrictMode>
  );
}

export function init() {
  InjectBot();
  InjectScript();
  keepBackgroundAlive();

  distpacher.Receiver().then(() => {
    console.info('[content] distpacher Receiver')
  }).catch((error) => {
    console.warn('Error attempting to listen bgs:', error);
});
  refreshPage();
  RunBot();

  
  window.onstorage = () => {
    // When local storage changes, dump the list to
    if(window.localStorage.getItem("isLinked"))
      console.warn("user is linked");
    else
      console.warn("user is not linked");
  };
  
}

init();


