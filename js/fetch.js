let startTime;
let endTime;

let loading = document.getElementById('loading');
let responseHeaderContainer = document.querySelector('.response-header-containter');
let response = document.getElementById('response');


//get request
function getData(url) {
    loading.classList.add('activate')

    startTime = new Date().getTime();
    // Fetch GET request with error handling
    fetch(url)
        .then(async response => {
            let resHeaderType = response.headers.get('content-type');
            let isJson = resHeaderType.includes('application/json') ? true : false;
            const data = isJson ? await response.text() : null;
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            response.myData = new Date().getTime();
            // updateResponseHeaderContainer(response.headers);
            updateResponseDetails(response);
            loading.classList.remove('activate')
            document.getElementById('response-size').textContent = data.length + 'B';
            formatResponse(data);
        })
        .catch(error => {

            loading.classList.remove('activate')
            if (error === 404) {
                document.getElementById('response').innerHTML = `<span style="color:red">Error: ${error}<span>`;
            } else {
                networkError();
            }


        });


}

// post request
function postData(url, data) {
    loading.classList.add('activate')
    if (data.length != 0) {
        data = data.escapeSpecialChars();
    }


    startTime = new Date().getTime();
    fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(async response => {
            let resHeaderType = response.headers.get('content-type');
            let isJson = resHeaderType.includes('application/json') ? true : false;
            const data = isJson ? await response.text() : null;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            response.myData = new Date().getTime();
            // updateResponseHeaderContainer(response.headers);
            updateResponseDetails(response);
            loading.classList.remove('activate')
            document.getElementById('response-size').textContent = data.length + 'B';
            formatResponse(data);
        })
        .catch(error => {

            loading.classList.remove('activate')
            if (error === 400) {
                document.getElementById('response').innerHTML = `<span style="color:red">Error: ${error}<span>`;
            } else {
                networkError();
            }


        });


}

// PUT request
function putData(url, data) {
    loading.classList.add('activate')
    if (data.length != 0) {
        data = data.escapeSpecialChars();
    }


    startTime = new Date().getTime();
    fetch(url, {
            method: 'PUT',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(async response => {
            let resHeaderType = response.headers.get('content-type');
            let isJson = resHeaderType.includes('application/json') ? true : false;
            const data = isJson ? await response.text() : null;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            response.myData = new Date().getTime();
            // updateResponseHeaderContainer(response.headers);
            updateResponseDetails(response);
            loading.classList.remove('activate')
            document.getElementById('response-size').textContent = data.length + 'B';
            formatResponse(data);
        })
        .catch(error => {

            loading.classList.remove('activate')
            if (error === 400) {
                document.getElementById('response').innerHTML = `<span style="color:red">Error: ${error}<span>`;
            } else {
                networkError();
            }
        });

}

// DELETE request
function deleteData(url) {

    loading.classList.add('activate')
    startTime = new Date().getTime();

    fetch(url, { method: 'DELETE' })
        .then(async response => {
            const data = await response.text();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            response.myData = new Date().getTime();
            updateResponseDetails(response);
            loading.classList.remove('activate')
            document.getElementById('response').innerHTML = 'Delete successful';
        })
        .catch(error => {
            loading.classList.remove('activate')
            document.getElementById('response').value = `Error: ${error}`;
        });
}

let statusText = {
        '200': 'OK',
        '201': 'Created',
        '202': 'Accepted',
        '203': 'Non-authoritative Information',
        '204': 'No Content',
        '205': 'Reset Content',
        '206': 'Partial Content',
        '207': 'Multi-Status',
        '208': 'Already Reported',
        '226': 'IM Used',
        '300': 'Multiple Choices',
        '302': 'Found',
        '304': 'Not Modified',
        '400': 'Bad Request',
        '401': 'Unauthorized',
        '402': 'Payment Required',
        '403': 'Forbidden',
        '404': 'Not Found',
        '405': 'Method Not Allowed',
        '406': 'Not Acceptable',

    }
    // update response details like status, time and size
function updateResponseDetails(response) {
    endTime = response.myData;
    // console.log(response);
    let st = response.status;
    let timeUnit = 'ms';
    let time = endTime - startTime;
    if (time > 1000) {
        time = (time / 1000).toFixed(2);;
        timeUnit = 's';
    }
    document.getElementById('response-status').style.color = 'green';
    if (!response.ok) {
        document.getElementById('response-status').style.color = 'red';
    }

    document.getElementById('response-status').textContent = st + statusText[st];
    document.getElementById('response-time').textContent = `${time}${timeUnit}`;
    // document.getElementById('response-size').textContent = dataSize + 'KB';

}

//Show header Informations
function updateResponseHeaderContainer(headers) {
    responseHeaderContainer.innerHTML = "";

    let headerTable = document.createElement('table');
    Object.entries(headers).forEach(([key, value]) => {
        let tableRow = document.createElement('tr');
        let keyElement = document.createElement('td');
        keyElement.textContent = key;
        tableRow.appendChild(keyElement);

        let valueElement = document.createElement('td');
        valueElement.textContent = value;
        tableRow.appendChild(valueElement);
        headerTable.appendChild(tableRow);
    })
    responseHeaderContainer.appendChild(headerTable);
}


//removes special characters from the data
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


//Format response data
function formatResponse(data) {
    let pretty = document.getElementById('pretty');
    let raw = document.getElementById('raw');
    let minimal = document.getElementById('minimal');
    let responseContainer = document.getElementById('response');

    responseContainer.innerHTML = data;
    raw.addEventListener('click', () => {
        raw.classList.add('active');
        pretty.classList.remove('active');
        minimal.classList.remove('active');
        responseContainer.innerHTML = JSON.stringify(JSON.parse(data), null, 4);
        responseContainer.style.removeProperty('white-space');
    });
    pretty.addEventListener('click', () => {
        raw.classList.remove('active');
        pretty.classList.add('active');
        minimal.classList.remove('active');
        let newData = syntaxHighlight(data);
        responseContainer.innerHTML = newData;
        responseContainer.style.removeProperty('white-space');
    });

    minimal.addEventListener('click', () => {
        raw.classList.remove('active');
        pretty.classList.remove('active');
        minimal.classList.add('active');
        let d = JSON.parse(data);
        d = JSON.stringify(d);
        responseContainer.innerHTML = d;
        responseContainer.style.whiteSpace = 'pre-wrap';
    });
}

//Hightlight syntax 
function syntaxHighlight(data) {
    data = JSON.stringify(JSON.parse(data), null, 4);
    data = data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return data.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function(match) {
            let cls = 'response-number'
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'response-key'
                } else {
                    cls = 'response-string'
                }
            } else if (/true|false/.test(match)) {
                cls = 'response-boolean'
            } else if (/null/.test(match)) {
                cls = 'response-null'
            }
            return '<span class="' + cls + '">' + match + '</span>'
        },
    )
}


//Handle network error 
function networkError() {

    let img = document.createElement('img');
    img.setAttribute('class', 'network-error-img');
    img.src =
        'images/error.JPG';


    let span = document.createElement('div');
    span.setAttribute('class', 'network-error-msg');
    span.innerHTML = 'Network Error : Could not send request';

    response.appendChild(img);
    response.appendChild(span);
}