const HttpUtil = {

    getHostUrl(){
        return 'http://10.58.81.138:3000';
    },

    postRequest(url, body, successCallback, failCallback) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => response.json())
            .then((responseData) => successCallback(responseData))
            .catch((error) => failCallback(error));
    }
};

module.exports = HttpUtil;