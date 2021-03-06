let headerContents = document.getElementById('header-content');
let bodyContents = document.getElementById('body-content');
let urlField = document.getElementById('url-field');
headerContents.style.display = 'none';
bodyContents.style.display = 'none';

//true if active tab is qurey parameter;
let paramsStatus = true;
let headerStatus = false;
let bodyStatus = false;


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
        headerStatus = false;
        bodyStatus = false
    } else if (event.currentTarget.id === 'header-tab') {
        headerStatus = true;
        paramsStatus = false;
        bodyStatus = false;
    } else if (event.currentTarget.id === 'body-tab') {
        bodyStatus = true;
        paramsStatus = false;
        headerStatus = false;
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

//add query parametes on add button click
addKeyValuePairParamsBtn.addEventListener('click', () => {
    let div = document.createElement('div');
    div.setAttribute('class', 'params-div')
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


//add header key,value pair 
addKeyValuePairHeaderBtn.addEventListener('click', () => {
    let div = document.createElement('div');
    headerParamsCounter++;
    let key = document.createElement('input');
    let value = document.createElement('input');
    let removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'remove';
    removeBtn.setAttribute('id', 'remove-param')
    removeBtn.setAttribute('class', 'remove-btn')

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
    clearResponse();

    let requestType = document.getElementById('request-type').value;
    let url = document.getElementById('url-field').value;

    if (url === "") {
        document.getElementById('url-field').style.border = '1px solid red';
    } else {

        if (url.includes('{')) {
            url = getUrl(url);
        }

        // console.log(url);
        if (requestType == 'GET') {
            if (paramsStatus) {
                url = updateUrl(url);
            }

            getData(url);

        } else if (requestType == 'POST') {
            let data;
            let flag = true;
            if (bodyStatus) {
                data = document.getElementById('json-body').value.trim();
                flag = isValidJson(data);

            } else if (headerStatus) {
                data = JSON.stringify(getHeaderData());

            } else {
                data = JSON.stringify({});
            }

            if (flag) {
                postData(url, data);
            } else {
                invalidJsonBodyResponse();
            }

        }
        // PUT Request 
        else if (requestType == 'PUT') {
            let data;
            let flag = true;
            if (bodyStatus) {
                data = document.getElementById('json-body').value.trim();
                flag = isValidJson(data);
            } else if (headerStatus) {
                data = JSON.stringify(getHeaderData());

            } else {
                data = JSON.stringify({});
            }
            if (flag) {
                putData(url, data);
            } else {
                invalidJsonBodyResponse();
            }
        }
        // Delete Request 
        else if (requestType === 'DELETE') {
            if (paramsStatus) {
                url = updateUrl(url);
            }
            deleteData(url);
        }

    }


});

function getHeaderData() {
    let data = {};
    for (let i = 0; i < headerParamsCounter + 1; i++) {
        // && document.getElementById(`queryparamskey${i+1}`).value != ""
        if (document.getElementById(`headerparamskey${i+1}`) != undefined) {
            // console.log('fine');
            let key = document.getElementById(`headerparamskey${i+1}`).value.trim();
            let value = document.getElementById(`headerparamsvalue${i+1}`).value.trim();
            data[key] = value;
            // console.log(typeof key);
        }
    }
    // console.log(data);
    return data;
}

//retrive the url when variable name is used
function getUrl(url) {
    const regex = /{{[a-zaA-z0-9-_]*}}/g;
    const found = url.match(regex);
    for (let i = 0; i < found.length; i++) {
        let index = url.indexOf(found[i]);
        let len = found[i].length;
        let variable = url.substr(index + 2, len - 4);

        for (x in localStorage) {
            if (localStorage.getItem(x) != null) {
                let obj = localStorage.getItem(x);
                if (obj.includes(variable)) {
                    obj = JSON.parse(obj)
                    url = url.replace(found[i], obj[variable]);
                }
            }
        }
    }
    return url;

}

//Validate the json body data
function isValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

//shows error message when json body is invalid
function invalidJsonBodyResponse() {
    let errorSpan = document.getElementById('json-body__error-msg');
    let jsonBody = document.getElementById('json-body');
    errorSpan.classList.add('active');
    jsonBody.style.borderColor = 'red';
    setTimeout(() => {
        errorSpan.classList.remove('active');
    }, 1000);

}

//clear prevision data on every request
function clearResponse() {
    document.getElementById('response').innerHTML = '';
    document.getElementById('response-status').textContent = '';
    document.getElementById('response-time').textContent = '';
    document.getElementById('response-size').innerHTML = '';
    document.getElementById('json-body').style.borderColor = '#ccc';
    // document.getElementById('json-body__error-msg').innerHTML = '';
}


// Change border color of json body on focus
document.getElementById('json-body').addEventListener('focus', () => {
    document.getElementById('json-body').style.removeProperty('borderColor');
    document.getElementById('json-body').style.borderColor = '#ccc';
})

// Change border color of url field on focus
urlField.addEventListener('focus', () => {
    urlField.style.removeProperty('borderColor');
    urlField.style.borderColor = '#ccc';
})

//upadate url with querry parameter
function updateUrl(url) {
    for (let i = 0; i < queryParamscounter + 1; i++) {
        // && document.getElementById(`queryparamskey${i+1}`).value != ""
        if (document.getElementById(`queryparamskey${i+1}`) != undefined) {
            let key = document.getElementById(`queryparamskey${i+1}`).value.trim();
            let value = document.getElementById(`queryparamsvalue${i+1}`).value.trim();
            if (url.includes("?")) {
                url += '&' + key + '=' + value;
            } else {
                if (i === 0) {
                    url += '?' + key + '=' + value;
                } else {
                    url += '&' + key + '=' + value;
                }
            }
        }
    }
    return url;
}