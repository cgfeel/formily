const Mock = require('mockjs');
const delay = require('mocker-api/delay');
const random = require('../random');

const upload = 'POST /api/form/upload';
const uploadSuccess = Mock.mock({
    success: '@boolean(0, 1, false)',
});

module.exports = delay({
    [upload](req, res) {
        res.status(200).json(uploadSuccess);
    }
}, random(400, 800))