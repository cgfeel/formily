const proxy = {
    // 优先处理。
    // apiMocker(app, path, option)
    // 这是 apiMocker 的选项参数设置 `option`
    _proxy: {
      proxy: {
        // 将路径字符串（例如`/user/:name`）转换为正则表达式。
        // https://www.npmjs.com/package/path-to-regexp
        '/repos/(.*)': 'https://api.github.com/',
        '/:owner/:repo/raw/:ref/(.*)': 'http://127.0.0.1:2018',
        '/api/repos/(.*)': 'http://127.0.0.1:3721/'
      },
      // 重写目标网址路径。对象键将用作RegEx来匹配路径。
      // https://github.com/jaywcjlove/mocker-api/issues/62
      pathRewrite: {
        '^/api/repos/': '/repos/',
      },
      changeHost: true,
      // 修改 http-proxy 选项
      httpProxy: {
        options: {
          ignorePath: true,
        },
        listeners: {
          proxyReq: function (proxyReq, req, res, options) {
            console.log('proxyReq');
          },
        },
      },    
    },
    // =====================
    // 默认的 GET 请求。
    // https://github.com/jaywcjlove/mocker-api/pull/63
    '/api/user': {
      id: 1,
      username: 'kenny',
      sex: 6,
    },
    'GET /api/user': {
      id: 1,
      username: 'kenny',
      sex: 6
    },
    'GET /api/user/list': [
      {
        id: 1,
        username: 'kenny',
        sex: 6
      }, {
        id: 2,
        username: 'kenny',
        sex: 6
      }
    ],
    'GET /api/:owner/:repo/raw/:ref/(.*)': (req, res) => {
      const { owner, repo, ref } = req.params;
      // http://localhost:8081/api/admin/webpack-mock-api/raw/master/add/ddd.md
      // owner => admin
      // repo => webpack-mock-api
      // ref => master
      // req.params[0] => add/ddd.md
      return res.json({
        id: 1,
        owner, repo, ref,
        path: req.params[0]
      });
    },
    'POST /api/login/account': (req, res) => {
      const { password, username } = req.body;
      if (password === '888888' && username === 'admin') {
        return res.json({
          status: 'ok',
          code: 0,
          token: "sdfsdfsdfdsf",
          data: {
            id: 1,
            username: 'kenny',
            sex: 6
          }
        });
      } else {
        return res.status(403).json({
          status: 'error',
          code: 403
        });
      }
    },
    'DELETE /api/user/:id': (req, res) => {
      console.log('---->', req.body)
      console.log('---->', req.params.id)
      res.send({ status: 'ok', message: '删除成功！' });
    }
  }
  module.exports = proxy;