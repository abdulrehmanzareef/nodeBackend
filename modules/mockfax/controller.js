const { createUniqueFaxId } = require("../services/generateFaxId.js")
const { callBackFunction } = require("../services/callBackFunction")
const fs = require('fs');
const mocFaxData = [];

const receiveFaxStatus = (req, res) => {
	const { faxId } = req.params;
    const data = mocFaxData.find((value)=> value.faxId === faxId)
    if (data) {
        return res.status(200).json({ data });
    }
	return res.status(404).json({ error: "cannot find any result" });
}

const createMockFax = (req, res) => {
	const faxId = createUniqueFaxId();

	const { name, callback_url, file, to_phone} = req.body;
    const filename = req.body.files[0].filename
    fs.writeFile('../../files/', file, err => {
        if (err) {
          console.error(err)
          return
        }
      })
	 
	const faxData = {
		fax_id: faxId,
		name,
        file: `files/${filename}`,
		callback_url,
		to_phone
	}
	mocFaxData.push(faxData);

	res.status(200).json({
		fax_id: faxId,
		status: "queued",
		error: null
	});

    const firstAttempt = {
        fax_id: faxId,
        status: "error",
        error: "Busy Line",
        attempt: 1
    } 
    callBackFunction(callback_url, firstAttempt, 5000)

    const secondAttempt = {
        fax_id: faxId,
        status: "“success”",
        error: null,
        attempt: 2
    }
    callBackFunction(callback_url, secondAttempt, 10000)
}

module.exports = {
	receiveFaxStatus,
	createMockFax
}
