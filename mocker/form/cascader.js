const Mock = require('mockjs');
const delay = require('mocker-api/delay');
const random = require('../random');

const cascaderLinker = 'POST /api/form/cascader-linker';

function searchLink({ linkage = 1, name = "" }) {
    const num = Math.max(1, parseInt(linkage)||1);
    const start = 10 * num;
    const group = [name, 'Dynamic'].filter(Boolean).join(" ");

    return {
        [`result|${start > 990 ? 0 : 10}`]: [{
            "value|+1": start,
            "isLeaf": start >= 100,
            "label": group + ": @value",
        }],
    };
}

module.exports = delay({
    [cascaderLinker](req, res) {
        const data = Mock.mock(searchLink(req.body));
        res.status(200).json(data.result);
    }
}, random(400, 800));