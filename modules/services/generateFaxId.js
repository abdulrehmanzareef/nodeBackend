const moment = require("moment");

exports.createUniqueFaxId = () => {
  const millisecond = moment().millisecond();
  const second = moment().second();
  const minute = moment().minute();
  const faxId = `FAX-${millisecond}${second}${minute}`.substring(0,16);
  
  return faxId;
}

