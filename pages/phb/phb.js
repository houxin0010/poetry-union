// pages/phb/phb.js
var app = getApp();
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
    imgServer: app.globalData.imgServer
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      questionPaperId: 41
    });
    wx.request({
      url: app.globalData.host + '/questionPaper/getAnswerResult',
      data: {
        questionPaperId: that.data.questionPaperId
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
    wx.request({
      url: app.globalData.host + '/questionPaper/init',
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        if (res.data.code == '00') {
          let content = res.data.content;
          if (content.firstQuestionType == 'SINGLE_SEL') {
            wx.navigateTo({
              url: '../index1/dati1?questionPaperId=' + content.questionPaperId
            });
          } else if (content.firstQuestionType == 'COMPLETION') {
            wx.navigateTo({
              url: '../index2/dati2?questionPaperId=' + content.questionPaperId
            });
          } else if (content.firstQuestionType == 'BANKED_CLOZE') {
            wx.navigateTo({
              url: '../index3/dati3?questionPaperId=' + content.questionPaperId
            });
          }
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    });

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