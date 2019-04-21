// pages/index1/dati1.js
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
    residueNo: 0,
    answer: '',
    currentScore: 0,
    choiceA: '',
    choiceB: '',
    choiceC: '',
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
    console.log("单选题页面加载:参数是" + JSON.stringify(options));
    var that = this;
    that.setData({
      questionId: options.qid,
      questionType: options.qtype,
      residueNo: app.globalData.questionTotal - app.globalData.questionNo
    });
    wx.request({
      url: app.globalData.host + '/questionPaper/getQuestion',
      data: {
        questionId: that.data.questionId,
        questionType: that.data.questionType
      },
      method: 'GET',
      success: function(res) {
        console.log("获取单选题数据:" + JSON.stringify(res.data));
        if (res.data.code == '00') {
          let content = res.data.content;
          that.setData({
            question: content.question,
            answer: content.answer,
            questionNo: content.questionNo,
            currentScore: content.currentScore,
            choiceA: content.options[0],
            choiceB: content.options[1],
            choiceC: content.options[2]
          });

          that.setData({
            questionNoSrc: that.data.imgServer + '/img/tixu/' + app.globalData.questionNo + '.png'
          });
          util.countdown(); // 计时器
          console.log(that.data);
        }
      },
      fail: function(res) {
        console.log("获取单选题异常:" + res.errMsg);
      }
    });
  },

  select: function(event) {
    util.pause();
    let that = this;
    that.setData({
      displayBlock: '',
      displayAlert: '',
      displayContinueBtn: ''
    });
    let selectAnswer = event.currentTarget.dataset.selectd;
    console.log(selectAnswer);
    let isCorrect;
    if (selectAnswer == this.data.answer) {
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

  back: function() {
    wx.redirectTo({
      url: '../index/index',
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