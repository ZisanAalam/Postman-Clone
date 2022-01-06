let headerContents = document.getElementById('header-content');
let bodyContents = document.getElementById('body-content');
headerContents.style.display = 'none';
bodyContents.style.display = 'none';

//true if active tab is qurey parameter;
let paramsStatus = true;


function displayContent(event, content) {
    // Declare all variables
    var i, tabcontent, tabs;

    // Get all elements with class="tabcontent" and hide them
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

    if (event.currentTarget.id === 'params-tab') {
        paramsStatus = true;
    }

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
    removeBtn.setAttribute('id', 'remove-param')
    removeBtn.setAttribute('class', 'remove-btn')


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

    key.setAttribute('type', 'text')
    key.setAttribute('id', `headerparamskey${headerParamsCounter}`);
    key.setAttribute('placeholder', 'key');

    value.setAttribute('type', 'text')
    value.setAttribute('id', `headerparamsvalue${headerParamsCounter}`);
    value.setAttribute('placeholder', 'value');

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
        if (paramsStatus) {

            getData(url, queryParamscounter);


        }

    } else if (requestType == 'POST') {
        let data = document.getElementById('json-body').value.trim();
        postData(url, data);
    }

});

String.prototype.escapeSpecialChars = function() {
    return this
        .replace(/\\n/g, '')
        .replace(/\\/g, '')
        .replace(/\\/g, '')
        .replace(/\\&/g, '')
        .replace(/\\r/g, '')
        .replace(/\\t/g, '')
        .replace(/\\b/g, '')
        .replace(/\\f/g, '')
        .replace(/\s+/g, '');
};

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