let headerContents = document.getElementById('header-content');
let jsonContents = document.getElementById('json-content');
headerContents.style.display = 'none';
jsonContents.style.display = 'none';

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
}


// adding key, value pair parameters
let addKeyValuePairParamsBtn = document.getElementById('add-key-value-pair-params');
let addKeyValuePairHeaderBtn = document.getElementById('add-key-value-pair-header');
let paramsParameterContainer = document.getElementById('params-parameters');
let headerParameterContainer = document.getElementById('header-parameters');
let paramscounter = 0

addKeyValuePairParamsBtn.addEventListener('click', () => {
    let div = document.createElement('div');
    paramscounter++;
    let key = document.createElement('input');
    let value = document.createElement('input');
    let removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'remove';
    removeBtn.setAttribute('id', 'remove-param')

    key.setAttribute('type', 'text')
    key.setAttribute('id', `paramskey${paramscounter}`);
    key.setAttribute('placeholder', 'key');

    value.setAttribute('type', 'text')
    value.setAttribute('id', `paramsvalue${paramscounter}`);
    value.setAttribute('placeholder', 'value');

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
    paramscounter++;
    let key = document.createElement('input');
    let value = document.createElement('input');
    let removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'remove';
    removeBtn.setAttribute('id', 'remove-param')

    key.setAttribute('type', 'text')
    key.setAttribute('id', `paramskey${paramscounter}`);
    key.setAttribute('placeholder', 'key');

    value.setAttribute('type', 'text')
    value.setAttribute('id', `paramsvalue${paramscounter}`);
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

    console.log(url)

});