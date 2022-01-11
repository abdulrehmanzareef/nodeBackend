const { check, validationResult } = require('express-validator');
const pdf = require('pdf-parse');

exports.validateCreateMockFax = [
  check('name')
    .exists().withMessage('Empty name')
    .isString(),
  check('callback_url')
    .optional()
    .isString()
    .custom((value) => {
        if (!(value.indexOf("http://") == 0 || value.indexOf("https://") == 0)) {
          return false;
        }
        return true;
    }).withMessage('Invalid callback URL'),
  check('to_phone')
    .optional()
    .isString()
    .custom((value) => {
        if (/^\+?([1]{1})\)?([2-9]{1})\)?([0-9]{2})?([2-9]{1})?([0-9]{6})$/.test(value)) {
          return true;
        }
        return false;
    }).withMessage('Invalid number format'),

    check('file')
    .optional()
    .custom((value) => {
        pdf(value).then(function(data) {
            return true;
        }, (err) => {
            return false;
        });
    }).withMessage('The file is not PDF'),
];


exports.validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (e) {
    if (e.mapped()._error && e.mapped()._error.nestedErrors) {
      res.status(403).json({ success: false, errors: e.mapped()._error.nestedErrors });
    } else {
      res.status(403).json({ success: false, errors: e.mapped() });
    }
  }
};