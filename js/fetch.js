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
            document.getElementById('response').value = data;
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
            document.getElementById('response').value = text;
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
            document.getElementById('response').value = text;
        });

}

// update response details like status, time and size
function updateResponseDetails(response) {
    endTime = response.myData;
    let st = response.status;
    if (st === 404) {
        document.getElementById('response-status').style.color = 'red';
    }
    document.getElementById('response-status').textContent = response.status;
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