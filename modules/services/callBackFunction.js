const axios = require("axios")
exports.callBackFunction = (url, payload, timeout) => {
    setTimeout(()=>{
        axios.post(url, payload);
    }, timeout);

}


