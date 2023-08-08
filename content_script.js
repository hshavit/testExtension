// content_script.js
// This function will be executed when the content script is injected into the webpage

function isSiblingOfTable(element) {
  const table = element.closest('table');
  return table; /* && element !== table && element.parentNode === table.parentNode; */
}


var jsonString = '';

// This function gets the table element corresponding to a clicked sibling element
function getTableFromSibling(siblingElement) {
  const table = siblingElement.closest('table');
  return table;
}

console.log('vvvv');
function handleDblClick(event) {
  
  var table;
  const clickedElement = event.target;

  // Check if the clicked element is a sibling of a table
  if (isSiblingOfTable(clickedElement)) {
    table = getTableFromSibling(clickedElement);
    /* if (table) {
      table = table.outerHTML;
    } */
  }

  if (table) {

     rows = Array.from(table.rows).slice(1);
     jsonData = [];
    rows.forEach(row => {
       rowData = {};
      Array.from(row.cells).forEach((cell, index) => {
        const headerCell = table.rows[0].cells[index];
        if(headerCell && headerCell != undefined  ){
        const key = headerCell.textContent.trim();
        const value = cell.textContent.trim();
        rowData[key] = value;}
      });

      jsonData.push(rowData);
    });

    Object.keys(jsonData[0])
    jsonData = jsonData.reduce((acc, value, indx, arr)=>{
        acc.forEach((element, index)  => {
          if( Object.keys(element).length <  Object.keys(value).length )
            acc.splice(index,1 );
        }
        );
       
        acc.push(value);
       
       return acc;
    },[])

  

    jsonString = JSON.stringify(jsonData, null, 2);

    localStorage.setItem("myData", jsonString);
    /* chrome.runtime.sendMessage({ jsonString }); */

  }
}


document.addEventListener('dblclick', function (event) {
  console.log('dblclick');
  handleDblClick(event);
});

yyy = 0;
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  const table = document.querySelector("table");
  if (table) {
    // Your code here
    console.log(table);
    yyy = 1;
  }
  else {
    console.log("xxxxx no table");
  }
});

// contentScript.js

// This function sends a message to the popup script to check if it's active
function checkPopupStatus() {

  kkk = setInterval(() => {
      chrome.runtime.sendMessage({ checkPopup: true }, (response) => {
      if (response.popupActive) {
        console.log('Popup is active');
        /* clearInterval(kkk); */
        if(jsonString!='')
          chrome.runtime.sendMessage({ jsonString });
        jsonString = '';
      } else {
        // Popup is not active, do something else
        console.log('Popup is not active');
      }
    });
  }, 3000);
  
}


checkPopupStatus(); 
