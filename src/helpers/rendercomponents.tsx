//import { Guid } from '@microsoft/sp-core-library';
import React, { ReactNode, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

export function TestComponent(Component: React.ComponentType) {
    return function () {
    const rootElement = document.createElement("div");
   // const myGuid: Guid = Guid.newGuid();
   //rootElement.id = myGuid.toString();

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <Component/>
      </StrictMode>
    );

    return rootElement;
  };
}

// const MyComponent: React.FC = () => {
//     return <div>Hello, world!</div>;
//   };
  
//   const myComponentElement = TestComponent(MyComponent)({});
//   document.body.appendChild(myComponentElement);