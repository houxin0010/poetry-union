//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        let openid = null;
        let that = this;
        if (res.code) {
          wx.request({
            url: that.globalData.host + '/questionPaper/getcode',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res);
              openid = res.data.content;
              console.log("我是openid：" + openid);
              that.globalData.openid = openid;
              console.log("设置openID的全局变量:" + that.globalData.openid);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    openid: null,
    userInfo: null,
    questionNo: 0,
    questionTotal: 0,
    okTotal: 0,
    errTotal: 0,
    qusetions: [],
    grade: 0,
    //host: 'https://wxdemo.010service.com:8443/poetry',
    // host: 'http://127.0.0.1:8080/poetry',
    host: 'http://127.0.0.1:10086',
    // host: 'http://39.108.154.215:10086',
    imgServer: 'http://wxdemo.010service.com/images'
  },

})