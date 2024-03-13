const Mock = require('mockjs');

const upload = 'POST /api/form/query-list';

function numRange(value, max) {
    return Math.max(0, Math.min(max, value));
}

function reqFilter({
    date = '',
    grade = 0,
    id = {max: -1, min: -1},
    region = 0,
    sex = 0,
    type = '',
    year = [],
}) {
    const [min, max] = Object.values(id).sort();
    const start = Math.max(1, min);
    const diff = max === -1 ? -1 : max - start;

    return {
        grade: numRange(grade, 3),
        id: start,
        region: numRange(region, 3),
        sex: numRange(sex, 2),
        total: (diff === -1 || diff >= 100) ? '1-100' : diff <= 1 ? '1' : `1-${diff}`,
        year: year.length === 0 ? [] : year.concat(['2019-11-02']).splice(0, 2).sort(),
        date,
        type,
    };
}

function template(query) {
    const { date, grade, id, region, sex, total, type, year } = query;
    const key = `table_list|${total}`;
    const type_key = type === '' ? 'type|5' : 'type';
    return {
        [key]: [{
            'assets': '@boolean(0, 1, false)',
            'id|+1': id,
            'name': '@cname',
            "sex": sex||'@integer(1,2)',
            "grade": grade||'@integer(1,3)',
            'date': date||'@date("yyyy-MM-dd")',
            'year': year.length > 0 ? year : ['@date("yyyy-MM-dd")', '@date("yyyy-MM-dd")'],
            'region': region||'@integer(1,3)',
            [type_key]: type,
        }],
    };
}

module.exports = {
    [upload](req, res) {
        const query = reqFilter(req.body);
        const data = Mock.mock(template(query));

        res.status(200).json(data);
    }
}