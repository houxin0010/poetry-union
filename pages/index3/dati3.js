// pages/index3/dati3.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionPaperId: 0,
    questionNumber: 0,
    questionNo: 0,
    question: '',
    answer: '',
    currentScore: 0,
    questionNoSrc: '',
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
      url: app.globalData.host + '/questionPaper/getQuestion',
      data: {
        questionPaperId: that.data.questionPaperId
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        if (res.data.code == '00') {
          let content = res.data.content;
          that.setData({
            question: content.question,
            answer: content.answer,
            questionNo: content.questionNo,
            currentScore: content.currentScore
          });
          if (content.questionNo == 1) {
            that.setData({
              questionNoSrc: '/img/titlenum/one.png'
            });
          } else if (content.questionNo == 2) {
            that.setData({
              questionNoSrc: '/img/titlenum/two.png'
            });
          } else if (content.questionNo == 3) {
            that.setData({
              questionNoSrc: '/img/titlenum/three.png'
            });
          } else if (content.questionNo == 4) {
            that.setData({
              questionNoSrc: '/img/titlenum/four.png'
            });
          } else if (content.questionNo == 5) {
            that.setData({
              questionNoSrc: '/img/titlenum/five.png'
            });
          } else if (content.questionNo == 6) {
            that.setData({
              questionNoSrc: '/img/titlenum/six.png'
            });
          } else if (content.questionNo == 7) {
            that.setData({
              questionNoSrc: '/img/titlenum/one.png'
            });
          } else if (content.questionNo == 8) {
            that.setData({
              questionNoSrc: '/img/titlenum/saven.png'
            });
          } else if (content.questionNo == 9) {
            that.setData({
              questionNoSrc: '/img/titlenum/nine.png'
            });
          } else if (content.questionNo == 10) {
            that.setData({
              questionNoSrc: '/img/titlenum/ten.png'
            });
          }
          console.log(that.data);
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