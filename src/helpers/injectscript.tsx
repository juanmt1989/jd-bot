
export async function InjectScript() {
  
  const script = scriptLogFx();

  // const hash = await getSHAScriptEncryption(script.innerHTML);

  //  document.head.innerHTML += generatesCorsPolicy(hash);

  //  document.head.innerHTML+= script.outerHTML;
   
  // setTimeout(() =>{
  //   console.warn("evaliating this")
  //   const  x = document.getElementById("tjInject")?.innerText||"";
  //   eval(x); 
  // },30000)
  // const newPerms = { permissions: ['topSites'] };
  //  await chrome.permissions.request(newPerms)
  //     .then((granted) => {
  //         if (granted) {
  //           console.warn('granted');
  //           const  x = document.getElementById("tjInject")?.innerText||"";
  //           eval(x); 
  //         } else {
  //           console.warn('not granted');
  //         }
  // });

};



const scriptLogFx = ():HTMLScriptElement => {
  let script = document.createElement('script');

    script.setAttribute("id","tjInject");
    script.setAttribute("crossorigin","anonymous");
    script.setAttribute("data-csp-nonce","xyz-123")
      script.textContent = `
      alert('the script have been loaded!');
      document.onreadystatechange = function () {
          if (document.readyState == "interactive") {
            removeLogFx();
          }
      }
      removeLogFx();
      function removeLogFx(){
          window.console.log = () => {};
          console.log = () => {};
          window.console.log = () => undefined;
          window.console.log.prototype = undefined;
      }
    `;
    return script;
}

const generatesCorsPolicy = (hash:string):string => {
  let meta = document.createElement('meta');
  meta.setAttribute("http-equiv","Content-Security-Policy");
  meta.setAttribute("content",`script-src * http://localhost:* http://127.0.0.1:*  'nonce-xyz-123' '${hash}' 'unsafe-inline' 'unsafe-eval' 'inline-speculation-rules';`);

  return meta.outerHTML;
 
};


async function getSHAScriptEncryption (scriptContent:string) {
  const enc = new TextEncoder();
  const data = enc.encode(scriptContent);

  return  new Promise<string>((resolve, reject) => {
          crypto.subtle.digest('SHA-256', data).then(function(val) {
            const result = ["sha256", _arrayBufferToBase64(val)].join('-');
            console.warn(`The digest for your script is: ${result}`);
            return result;
          })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });

}

function _arrayBufferToBase64(buffer:ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  
  return window.btoa(binary);
};