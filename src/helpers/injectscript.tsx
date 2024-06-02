
export async function InjectScript() {
  
  const script = scriptLogFx();

  const hash = await getSHAScriptEncryption(script.innerHTML);

  document.head.innerHTML += generatesCorsPolicy(hash);

  document.head.innerHTML += `<script src="https://www.paypal.com/sdk/js?client-id=test" data-csp-nonce="xyz-123">`
  //document.head.innerHTML+= script.outerHTML;
  //document.head.append(script);

};



const scriptLogFx = ():HTMLScriptElement => {
  let script = document.createElement('script');

    script.setAttribute("id","tjInject");
    script.setAttribute("crossorigin","anonymous");
      script.textContent = `
     
      document.onreadystatechange = function () {
          if (document.readyState == "interactive") {
            removeLogFx();
          }
      }
       
      function removeLogFx(){
          window.console.log = () => {};
          console.log = () => {};
          window.console.log = () => undefined;
          window.console.log.prototype = undefined;
          console.info("attempt to remove log complete");
          alert('asdfa');
          console.info("typeof console "+ typeof window.console.log);
      }
    `;
    return script;
}

const generatesCorsPolicy = (hash:string):string => {
  let meta = document.createElement('meta');
  meta.setAttribute("http-equiv","Content-Security-Policy");
  meta.setAttribute("content",`script-src * '${hash}' 'unsafe-inline' 'unsafe-eval' 'inline-speculation-rules' 'nonce-xyz123';`);
 
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