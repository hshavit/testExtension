let isDragging = false;
let offsetX, offsetY;

const titleBar = document.querySelector('.title-bar');
const popup = document.querySelector('.popup');

titleBar?.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - popup.offsetLeft;
  offsetY = e.clientY - popup.offsetTop;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    popup.style.left = (e.clientX - offsetX) + 'px';
    popup.style.top = (e.clientY - offsetY) + 'px';
  }
});

// popup.js

// Listen for messages from content scripts
var request = "";
chrome.runtime.onMessage.addListener(function(requestt, sender, sendResponse) {


  if (requestt.checkPopup) {
    sendResponse({ popupActive: true });
  }
  if (requestt.jsonString) {
    sendResponse({ popupResponse: requestt.jsonString }); 
  }

  return;

  console.log('ddddddddddddddffff'); 
  if(requestt!=undefined)
    request = requestt;
  if (request) {
    console.log("Message from content script:", request.jsonString);
    // Use a regular expression to match characters that are not letters, numbers, commas, or colons
  /* const regex =  /[^a-zA-Z0-9\u0590-\u05FF,:{}]/g;
  const cleanedString = request.jsonString.replace(regex, ''); */
  localStorage.clear();
  localStorage.setItem("myData", request.jsonString);
    
    // Send a response back to the content script
    sendResponse({ popupResponse: request.jsonString }); 
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

function onClick(){
  alert('onClock');
  console.log('onClock');
}
/* // Popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('ddddddddddddddffff'); 
  console.log(message); 
  if(message.jsonString && message.jsonString!=undefined)
      localStorage.setItem("myData",message.jsonString );
}); */

/* document.addEventListener('DOMContentLoaded', function() {
   const textarea = document.createElement('textarea');
   textarea.placeholder = 'Type here...';
   document.body.appendChild(textarea);
});
 */

/* document.addEventListener('DOMContentLoaded', () => {
  debugger
});
 */

/* document.addEventListener('DOMContentLoaded', function() {

  debugger
  const changeUrlButton = document.getElementById('changeUrlButton');

  changeUrlButton.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs && tabs[0] && tabs[0].id) {
        const newUrl = 'https://example.com'; // Change this URL
        chrome.tabs.update(tabs[0].id, { url: newUrl });
      }
    });
  });
}); */