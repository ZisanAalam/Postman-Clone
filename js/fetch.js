let startTime;
let endTime;

function getData(url, queryParamscounter) {
    startTime = new Date().getTime();
    for (let i = 0; i < queryParamscounter + 1; i++) {
        if (document.getElementById(`queryparamskey${i+1}`) != undefined && document.getElementById(`queryparamskey${i+1}`).value != "") {
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
    fetch(url)
        .then((response) => {
            // console.log(response);
            // console.log(response.headers.get("content-length"));
            // console.log(response.headers);
            responseHeader(response);
            return response.text();

        }).catch(e => e.response)
        .then(data => {
            document.getElementById('response').value = data;
        })


    endTime = new Date().getTime();
}



function responseHeader(response) {
    const size = new TextEncoder().encode(JSON.stringify(response)).length
    const kiloBytes = size / 1024;
    document.getElementById('response-status').textContent = response.status;
    document.getElementById('response-time').textContent = `${endTime-startTime}ms`;
    // var obj = JSON.parse(response);
    // var length = Object.keys(obj).length;
    // document.getElementById('response-size').textContent = length + 'KB';
    document.getElementById('response-size').textContent = JSON.stringify(response).length + 'KB';

}