// pages/phb/phb.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionPaperId: 0,
    currentScore: 0,
    hisScore: [{
      hisScore:0,
      date:'',
    }],
    questionTotal: app.globalData.questionTotal,
    okTotal: app.globalData.okTotal,
    errTotal: app.globalData.errTotal,
    imgServer: app.globalData.imgServer
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      questionPaperId: options.questionPaperId
    });
    wx.request({
      url: app.globalData.host + '/questionPaper/getAnswerResult',
      data: {
        questionPaperId: that.data.questionPaperId,
        openId: app.globalData.openid
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        if (res.data.code == '00') {
          let content = res.data.content;
          that.setData({
            currentScore: content.currentScore,
            hisScore: content.hisScore,
          });
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    });
  },

  go: function () {
    
    util.init();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})