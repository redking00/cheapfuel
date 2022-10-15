window.onload = () => {
  'use strict';


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }

  window.addEventListener("online",  () =>{
    document.querySelector('#offlinescreen').style.display='none';
  });
  
  window.addEventListener("offline", function(){
    document.querySelector('#offlinescreen').style.display='block';
  });

  if (!navigator.onLine) {
    document.querySelector('#offlinescreen').style.display='block';
  }



  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.querySelector('#installscreen').style.display='block';
    document.querySelector('#installscreen>#mainmessage').addEventListener('click',async ()=>{
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;      
      if (`${outcome}`==="accepted") {
        document.querySelector('#installscreen').style.display='none';
      }
    })
  });

  window.addEventListener('appinstalled', () => {
    document.querySelector('#installscreen').style.display='none';
    deferredPrompt = null;
    console.log('PWA was installed');
  });

}
