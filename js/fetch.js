let startTime;
let endTime;

let loading = document.getElementById('loading');
let responseHeaderContainer = document.querySelector('.response-header-containter');


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
    fetch(url)
        .then((response) => {
            response.myData = new Date().getTime();
            updateResponseHeaderContainer(response.headers);
            updateResponseDetails(response);
            return response.text();

        }).catch(e => e.response)
        .then(data => {
            document.getElementById('response-size').textContent = data.length + 'B';
            loading.classList.remove('activate')
                // document.getElementById('response').value = data;
                // document.getElementById('response').innerHTML = data;
            formatResponse(data);
        })



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
        .then(response => {
            response.myData = new Date().getTime();
            updateResponseDetails(response);
            return response.text()
        })
        .then((text) => {
            loading.classList.remove('activate')
            document.getElementById('response-size').textContent = data.length + 'B';
            // document.getElementById('response').value = text;
            formatResponse(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('response').value = error;
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
        .then(response => {
            response.myData = new Date().getTime();
            updateResponseDetails(response);
            return response.text()
        })
        .then((text) => {
            loading.classList.remove('activate')
            document.getElementById('response-size').textContent = data.length + 'B';
            // document.getElementById('response').value = text;
            formatResponse(data);
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
    document.getElementById('response-status').style.color = 'green';
    if (st === 404) {
        document.getElementById('response-status').style.color = 'red';
        st = st + ' Not Found';
    } else {
        st = st + ' Ok';
    }

    document.getElementById('response-status').textContent = st;
    document.getElementById('response-time').textContent = `${endTime-startTime}ms`;
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
        // console.log(key, value);
        headerTable.appendChild(tableRow);
    })
    responseHeaderContainer.appendChild(headerTable);
}
const getSizeInBytes = obj => {
    let str = null;
    if (typeof obj === 'string') {
        // If obj is a string, then use it
        str = obj;
    } else {
        // Else, make obj into a string
        str = JSON.stringify(obj);
    }
    // Get the length of the Uint8Array
    const bytes = new TextEncoder().encode(str).length;
    console.log(bytes);
    return bytes;
};


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
    let responseContainer = document.getElementById('response');

    responseContainer.innerHTML = data;
    raw.addEventListener('click', () => {
        responseContainer.innerHTML = data;
    })
    pretty.addEventListener('click', () => {
        let newData = syntaxHighlight(data);
        responseContainer.innerHTML = newData;
    })
}

function syntaxHighlight(data) {
    data = data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return data.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function(match) {
            let cls = 'number'
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key'
                } else {
                    cls = 'string'
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean'
            } else if (/null/.test(match)) {
                cls = 'null'
            }
            return '<span class="' + cls + '">' + match + '</span>'
        },
    )
}