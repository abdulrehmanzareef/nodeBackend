const express = require('express');
const mockFaxController = require('./controller');
const { validateCreateMockFax, validateResults } = require('./middleware');

const router = express.Router();

router.post('/mockfax', validateCreateMockFax, validateResults, mockFaxController.createMockFax)
router.get('/receiveFaxStatus/:faxId', mockFaxController.receiveFaxStatus)

module.exports = router;
