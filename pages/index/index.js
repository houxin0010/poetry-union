// pages/index2/dati2.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgServer
  },

  go: function() {
    wx.request({
      url: app.globalData.host + '/questionPaper/init',
      method: 'GET',
       
      success: function(res) {
        console.log("考题初始化返回结果:"+JSON.stringify(res));
        if (res.data.code == '00') {
          let content = res.data.content;
          app.globalData.questionNo=1;
          app.globalData.qusetions = content.questions;
          app.globalData.questionTotal = content.questions.length;
         // console.log("考题初始化测试全局数据:" + app.globalData.questionNo);
          //console.log("考题初始化测试全局数据:" +JSON.stringify(app.globalData.qusetions));
          //console.log("考题初始化测试单个数据:" +JSON.stringify(app.globalData.qusetions[app.globalData.questionNo]));


          var curQuestion = app.globalData.qusetions[app.globalData.questionNo-1];
          if (curQuestion.questionType == 'SINGLE_SEL') {
            wx.navigateTo({
              url: '../index1/dati1?qid=' + curQuestion.questionId + '&qtype=' + curQuestion.questionType
            });
          } else if (content.firstQuestionType == 'COMPLETION') {
            wx.navigateTo({
              url: '../index2/dati2?qid=' + curQuestion.questionId + '&qtype=' + curQuestion.questionType
            });
          } else if (content.firstQuestionType == 'BANKED_CLOZE') {
            wx.navigateTo({
              url: '../index3/dati3?qid=' + curQuestion.questionId + '&qtype=' + curQuestion.questionType
            });
          }
        }
      },
      fail: function(res) {
        console.log("初始化是");
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})