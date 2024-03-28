const Mock = require('mockjs');
const delay = require('mocker-api/delay');
const random = require('../random');

const selectLinker = 'POST /api/form/tree-select-linker';
const selectSearch = 'GET /api/form/tree-select/:pid';

const datasource = ['a', 'b', 'c', 'd'].map(key => key.repeat(3));
const generate = (group, num = 3) => group.map((value, parent_key) => ({
    children: Array.from(new Array(num)).map((_, son_key) => ({
        key: `0-${parent_key}-${son_key}`,
        title: `Child Node${son_key + 1}`,
        value: `0-${parent_key}-${son_key}`,
    })),
    label: value.toUpperCase(),
    value,
}));

function searchLink({ linkage = 1 }) {
    const status = parseInt(linkage) || 1;
    return generate([...datasource].splice(status === 1 ? 0 : 2, 2));
}

function searchList(pid) {
    return {
        'result|3': [
            {
                "num|+1": 0,
                "id": "@natural",
                "value": "@id",
                "isLeaf": (params) => {
                    return params.context.currentContext.num === 0 ? false : true;
                },
                "title": (params) => {
                    return params.context.currentContext.num === 0 ? 'Expand to load' : 'Tree Node';
                },
                "pId": parseInt(pid)||0,
            },
        ],
    };
}

module.exports = delay({
    [selectLinker](req, res) {
        const data = Mock.mock(searchLink(req.body));
        res.status(200).json(data);
    },
    [selectSearch](req, res) {
        const { pid } = req.params;
        const data = Mock.mock(searchList(pid));

        res.status(200).json(data.result.map(({ num, ...item }) => item));
    }
}, random(400, 800));