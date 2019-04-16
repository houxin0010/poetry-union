// pages/index2/dati2.js
var app = getApp();
var timer; // 计时器
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionId: 0,
    questionType: '',
    questionPaperId: 0,
    questionNumber: 0,
    questionNo: 0,
    question: '',
    answer: '',
    userAnswer: '',
    currentScore: 0,
    nextQuestionType: '',
    questionNoSrc: '',
    correctPrompt: false,
    errorHint: false,
    imgServer: app.globalData.imgServer
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("填空题页面加载:参数是" + JSON.stringify(options));
    var that = this;
    that.setData({
      questionId: options.qid,
      questionType: options.qtype
    });
    wx.request({
      url: app.globalData.host + '/questionPaper/getQuestion',
      data: {
        questionId: that.data.questionId,
        questionType: that.data.questionType
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data);
        if (res.data.code == '00') {
          let content = res.data.content;
          that.setData({
            question: content.question,
            answer: content.answer,
            questionNo: content.questionNo,
            currentScore: content.currentScore
          });
          that.setData({
            questionNoSrc: that.data.imgServer + '/img/tixu/' + app.globalData.questionNo + '.png'
          });
          util.countdown(); // 计时器
          console.log(that.data);
        }
      },
      fail: function(res) {
        console.log("--------fail--------");
      }
    });
  },

  answerInput: function(e) {
    this.setData({
      userAnswer: e.detail.value
    });
  },

  commitAnswer: function() {
    util.pause();
    let that = this;
    that.setData({
      displayBlock: '',
      displayAlert: '',
      displayContinueBtn: ''
    });
    let isCorrect;
    if (this.data.answer == this.data.userAnswer) {
      that.setData({
        correctPrompt: true
      });
      isCorrect = true;
      app.globalData.okTotal++;
    } else {
      that.setData({
        errorHint: true
      });
      isCorrect = false;
      app.globalData.errTotal++;
    }
  },

  go: function() {
    util.go();
  },

  back: function () {
    wx.navigateTo({
      url: '../index/index'
    });
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