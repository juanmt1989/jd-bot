import useMutationObserver  from '../../helpers/watcher-element';

const BtnExexute: React.FC = () => {
  
  const targetID = "button[data-bs-target='#exampleModal']"

  const config: MutationObserverInit = {
    attributes: true,
    attributeOldValue: true
  };

  useMutationObserver(targetID, (mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target instanceof HTMLInputElement || mutation.target instanceof HTMLButtonElement) {
          if (mutation.target.disabled) {
            mutation.target.disabled =false;
            console.info('Removing stupid disabled validation');
          }
        }
    })
  },config);

  return <div></div>;
};

export default  BtnExexute;