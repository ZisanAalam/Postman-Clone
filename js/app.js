let headerContents = document.getElementById('header-content');
let bodyContents = document.getElementById('body-content');
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
    let requestType = document.getElementById('request-type').value;
    let url = document.getElementById('url-field').value;

    url = getUrl(url);

    // console.log(url);
    if (requestType == 'GET') {
        if (paramsStatus) {
            getData(url, queryParamscounter);


        }

    } else if (requestType == 'POST') {
        let data;
        if (bodyStatus) {
            data = document.getElementById('json-body').value.trim();
        } else if (headerStatus) {
            data = JSON.stringify(getHeaderData());

        } else {
            data = JSON.stringify({});
        }
        postData(url, data);
    } else if (requestType == 'PUT') {
        let data;
        if (bodyStatus) {
            data = document.getElementById('json-body').value.trim();
        } else if (headerStatus) {
            data = JSON.stringify(getHeaderData());

        } else {
            data = JSON.stringify({});
        }
        putData(url, data);
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

function getUrl(url) {
    if (url.includes('{')) {
        const regex = /{{[a-zaA-z0-9]*}}/g;
        const found = url.match(regex);
        // console.log(found);
        for (let i = 0; i < found.length; i++) {
            let index = url.indexOf(found[i]);
            let len = found[i].length;
            // console.log(index, len)
            let variable = url.substr(index + 2, len - 4);

            for (x in localStorage) {
                if (localStorage.getItem(x) != null) {
                    let obj = localStorage.getItem(x);
                    if (obj.includes(variable)) {
                        // console.log('working');
                        obj = JSON.parse(obj)
                            // console.log(found[i], obj[variable]);
                        url = url.replace(found[i], obj[variable]);
                        // console.log(url);
                    }
                }
            }
        }
        return url;
    }
    return url
}