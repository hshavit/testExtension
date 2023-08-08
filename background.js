// background.js
// Listen for messages from the content script
console.log('ttt');
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Check if the message contains the page title
    console.log('fff');

    //if (request.checkPopup) {
        // Determine if the popup is active and send the status back to content script
        //const popupIsActive = /* your logic to check if popup is active */;
      //  sendResponse({ popupActive: popupIsActive });
      //}
    // send it to the popup
    /* chrome.runtime.sendMessage(message.jsonString);   */
    
    

/*     const textarea = document.getElementsByTagName('zzz2');
    textarea.value = 'gotit';
    textarea.tag = jsonString;
 */

/*     if (message.pageTitle) {
 */      // Send the page title to your Angular application (you can replace this with your own logic)
/*       console.log('Page Title:', message.pageTitle);
    }
 */  });
  