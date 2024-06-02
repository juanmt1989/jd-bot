import React from 'react';


interface MutationObserverHook {
  (targetId: string, callback: MutationCallback, options?: MutationObserverInit): void;
}

const useMutationObserver: MutationObserverHook = (targetId, callback, options) => {
  React.useEffect(() => {
    const location = document.location.href
    const targetNode = document.querySelector(targetId);

    if (!targetNode) {
      if (location.includes("arbitrage/manual")){
        console.info(`Element with id '${targetId}' not found.`);
        return;
      }
      
    }
    else{
      
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, options);

      //Wil disconet juts after call?
      return () => {
        observer.disconnect();
      };
    }
  }, [targetId, callback, options]);
};

export default useMutationObserver;