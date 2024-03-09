const Mock = require('mockjs');

const upload = 'POST /api/form/upload';

const uploadSuccess = Mock.mock({
    success: '@boolean(0, 9, false)',
});

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    
    // 包含最小值和最大值
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

module.exports = {
    [upload](req, res) {
        setTimeout(() => {
            res.status(200).json(uploadSuccess);
        }, getRandomInt(400, 800));
    }
}