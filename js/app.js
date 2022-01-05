let headerContents = document.getElementById('header-content');
let bodyContents = document.getElementById('body-content');
headerContents.style.display = 'none';
bodyContents.style.display = 'none';


// document.getElementById('header-tab').onclick = displayContent(e, 'header-content');

function displayContent(event, content) {
    // Declare all variables
    var i, tabcontent, tabs;

    // Get all elements with class="tab-content" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tabs" and remove the class "active"
    tabs = document.getElementsByClassName("tab-items");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(content).style.display = "block";
    event.currentTarget.className += " active";

}


// adding key, value pair parameters
let addKeyValuePairParamsBtn = document.getElementById('add-key-value-pair-params');
let addKeyValuePairHeaderBtn = document.getElementById('add-key-value-pair-header');
let paramsParameterContainer = document.getElementById('params-parameters');
let headerParameterContainer = document.getElementById('header-parameters');

// to keep track of numbers of parameter added
let queryParamscounter = 0
let headerParamsCounter = 0;

addKeyValuePairParamsBtn.addEventListener('click', () => {
    let div = document.createElement('div');
    queryParamscounter++;
    let key = document.createElement('input');
    let value = document.createElement('input');
    let removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'remove';
    removeBtn.setAttribute('id', 'remove-param');
    removeBtn.setAttribute('class', 'remove-btn');

    key.setAttribute('type', 'text')
    key.setAttribute('id', `queryparamskey${queryParamscounter}`);
    key.setAttribute('placeholder', 'key');
    key.setAttribute('class', 'keys');

    value.setAttribute('type', 'text')
    value.setAttribute('id', `queryparamsvalue${queryParamscounter}`);
    value.setAttribute('placeholder', 'value');
    value.setAttribute('class', 'values');

    div.appendChild(key);
    div.appendChild(value);
    div.appendChild(removeBtn);

    paramsParameterContainer.appendChild(div);

    removeBtn.addEventListener('click', () => {
        paramsParameterContainer.removeChild(div);
    })


})

addKeyValuePairHeaderBtn.addEventListener('click', () => {
    let div = document.createElement('div');
    headerParamsCounter++;
    let key = document.createElement('input');
    let value = document.createElement('input');
    let removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'remove';
    removeBtn.setAttribute('id', 'remove-param')
    removeBtn.setAttribute('class', 'remove-btn');

    key.setAttribute('type', 'text')
    key.setAttribute('id', `headerparamskey${headerParamsCounter}`);
    key.setAttribute('placeholder', 'key');
    key.setAttribute('class', 'keys');

    value.setAttribute('type', 'text')
    value.setAttribute('id', `headerparamsvalue${headerParamsCounter}`);
    value.setAttribute('placeholder', 'value');
    value.setAttribute('class', 'values');

    div.appendChild(key);
    div.appendChild(value);
    div.appendChild(removeBtn);

    headerParameterContainer.appendChild(div);

    removeBtn.addEventListener('click', () => {
        headerParameterContainer.removeChild(div);
    })


})




let submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', (e) => {
    let requestType = document.getElementById('request-type').value;
    let url = document.getElementById('url-field').value;
    // console.log(paramscounter);

    if (requestType == 'GET') {
        getData(url);
    } else if (requestType == 'POST') {

    }

});

// function getData(url) {
//     for (let i = 0; i < queryParamscounter + 1; i++) {
//         if (document.getElementById(`queryparamskey${i+1}`) != undefined && document.getElementById(`queryparamskey${i+1}`).value != "") {
//             let key = document.getElementById(`queryparamskey${i+1}`).value.trim();
//             let value = document.getElementById(`queryparamsvalue${i+1}`).value.trim();
//             if (url.includes("?")) {
//                 url += '&' + key + '=' + value;
//             } else {
//                 if (i === 0) {
//                     url += '?' + key + '=' + value
//                 } else {
//                     url += '&' + key + '=' + value
//                 }
//             }
//         }
//     }

//     fetch(url)
//         .then((response) => {
//             // console.log(response);
//             // console.log(response.headers.get("content-length"));
//             // console.log(response.headers);
//             return response.text();

//         })
//         .then(data => {
//             document.getElementById('response').value = data;
//         })


// }

// let data;

// function getParameter() {
//     let data = {};
//     for (let i = 0; i < (queryParamscounter + 1); i++) {
//         if (document.getElementById(`queryparamskey${i+1}`) != undefined) {
//             let key = document.getElementById(`queryparamskey${i+1}`).value;
//             let value = document.getElementById(`queryparamsvalue${i+1}`).value;
//             data[key] = value;
//             console.log(key);
//             console.log(value);

//         }


//     }

//     return data;
// }