import ReactDOM from 'react-dom/client';
import React from 'react';
import useMutationObserver  from '../../helpers/watcher-element';

const BtnExexute: React.FC = () => {
  
  console.log(`attempt listen execute.`);

  const targetID = "button[data-bs-target='#exampleModal']"

  const config: MutationObserverInit = {
    attributes: true,
    attributeOldValue: true
  };

  useMutationObserver(targetID, (mutations) => {
    console.log('Mutation detected:', mutations);
    mutations.forEach((mutation) => {
        if (mutation.target instanceof HTMLInputElement || mutation.target instanceof HTMLButtonElement) {
          if (mutation.target.disabled) {
            mutation.target.disabled =false
          }
        }
    })
  },config);

  return <div>hello me!</div>;
};


export function initBtnExexute() {
    const rootElement = document.createElement("div");
    rootElement.id = "jd-bot";
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
    <React.StrictMode>
        <BtnExexute />
    </React.StrictMode>
    );
  }


