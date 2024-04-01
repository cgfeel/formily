const Mock = require('mockjs');
const delay = require('mocker-api/delay');
const random = require('../random');

const selectField = 'GET /api/form/select-field/:visible';
const selectLinker = 'POST /api/form/select-linker';
const selectSearch = 'GET /api/form/select-search';

function searchLink({ linkage = 1 }) {
    const status = parseInt(linkage) || 1;
    return status === 1 ? [
        { label: 'AAA', value: 'aaa' },
        { label: 'BBB', value: 'bbb' },
    ] : [
        { label: 'CCC', value: 'ccc' },
        { label: 'DDD', value: 'ddd' },
    ];
}

function searchList() {
    return {
        'result|10': [
            ['@cname', '@natural()']
        ],
    };
}

module.exports = delay({
    [selectField](req, res) {
        const { visible } = req.params;
        res.status(200).json({ visible });
    },
    [selectSearch](req, res) {
        const data = Mock.mock(searchList());
        res.status(200).json(data);
    },
    [selectLinker](req, res) {
        const data =  Mock.mock(searchLink(req.body));
        res.status(200).json(data);
    }
}, random(400, 800));