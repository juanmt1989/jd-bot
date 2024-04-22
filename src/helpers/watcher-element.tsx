import React from 'react';


interface MutationObserverHook {
  (targetId: string, callback: MutationCallback, options?: MutationObserverInit): void;
}

const useMutationObserver: MutationObserverHook = (targetId, callback, options) => {
  React.useEffect(() => {
    const targetNode = document.querySelector(targetId)

    if (!targetNode) {
      console.warn(`Element with id '${targetId}' not found.`);
      return;
    }

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, options);

    //Wil disconet juts after call?
    return () => {
      observer.disconnect();
    };
  }, [targetId, callback, options]);
};

export default useMutationObserver;