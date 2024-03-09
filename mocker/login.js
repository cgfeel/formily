const Mock = require('mockjs');

const login = 'POST /api/login';

const loginDB = Mock.mock({
  success: '@boolean(1, 9, false)',
  errorCode: '@integer(0, 10)',
  message: '@cword(2,10)',
  data: {
    userName: '@cword(2,4)',
    userId: '@integer(1000, 9999)',
  }
});

const loginErr = Mock.mock({
  success: false,
  errorCode: 4001,
  message: '用户名或密码不正确',
  data: null
})

module.exports = {
  // express 框架，有兴趣自行了解一下
  [login](req, res) {
    const { userName, password } = req.body;
    if (userName === 'admin' && password === '123') {
      res.status(200).json(loginDB);
    } else {
      res.status(200).json(loginErr);
    }
  }
}