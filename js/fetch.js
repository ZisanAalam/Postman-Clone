let startTime;
let endTime;

let loading = document.getElementById('loading');
let responseHeaderContainer = document.querySelector('.response-header-containter');
let response = document.getElementById('response');


function getData(url, queryParamscounter) {
    loading.classList.add('activate')
    for (let i = 0; i < queryParamscounter + 1; i++) {
        // && document.getElementById(`queryparamskey${i+1}`).value != ""
        if (document.getElementById(`queryparamskey${i+1}`) != undefined) {
            let key = document.getElementById(`queryparamskey${i+1}`).value.trim();
            let value = document.getElementById(`queryparamsvalue${i+1}`).value.trim();
            if (url.includes("?")) {
                url += '&' + key + '=' + value;
            } else {
                if (i === 0) {
                    url += '?' + key + '=' + value
                } else {
                    url += '&' + key + '=' + value
                }
            }
        }
    }
    startTime = new Date().getTime();
    // Fetch GET request with error handling
    fetch(url)
        .then(async response => {
            response.myData = new Date().getTime();
            updateResponseHeaderContainer(response.headers);
            updateResponseDetails(response);
            let resHeaderType = response.headers.get('content-type');
            let isJson = resHeaderType.includes('application/json') ? true : false;
            const data = isJson ? await response.text() : null;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
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
            response.myData = new Date().getTime();
            updateResponseHeaderContainer(response.headers);
            updateResponseDetails(response);
            let resHeaderType = response.headers.get('content-type');
            let isJson = resHeaderType.includes('application/json') ? true : false;
            const data = isJson ? await response.text() : null;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
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
            response.myData = new Date().getTime();
            updateResponseHeaderContainer(response.headers);
            updateResponseDetails(response);
            let resHeaderType = response.headers.get('content-type');
            let isJson = resHeaderType.includes('application/json') ? true : false;
            const data = isJson ? await response.text() : null;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
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
            response.myData = new Date().getTime();
            updateResponseDetails(response);
            const data = await response.text();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            loading.classList.remove('activate')
            document.getElementById('response').innerHTML = 'Delete successful';
        })
        .catch(error => {
            loading.classList.remove('activate')
            document.getElementById('response').value = `Error: ${error}`;
        });
}

// update response details like status, time and size
function updateResponseDetails(response) {
    endTime = response.myData;
    let st = response.status;
    let timeUnit = 'ms';
    let time = endTime - startTime;
    if (time > 1000) {
        time = (time / 1000).toFixed(2);;
        timeUnit = 's';
    }
    document.getElementById('response-status').style.color = 'green';
    if (st === 404) {
        document.getElementById('response-status').style.color = 'red';
        st = st + ' Not Found';
    } else {
        st = st + ' OK';
    }

    document.getElementById('response-status').textContent = st;
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
    });
    pretty.addEventListener('click', () => {
        raw.classList.remove('active');
        pretty.classList.add('active');
        minimal.classList.remove('active');
        let newData = syntaxHighlight(data);
        responseContainer.innerHTML = newData;
    });

    minimal.addEventListener('click', () => {
        raw.classList.remove('active');
        pretty.classList.remove('active');
        minimal.classList.add('active');
        let d = JSON.parse(data);
        d = JSON.stringify(d);
        responseContainer.innerHTML = d;
    });
}

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
    // down.innerHTML = "Image Element Added.";
}