// pages/index3/dati3.js
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
    options: [],
    answer: '',
    userAnswer: '',
    userAnswerArray: [],
    correctPrompt: false,
    errorHint: false,
    answerLength: 0,
    currentScore: 0,
    questionNoSrc: '',
    nextQuestionType: '',
    imgServer: app.globalData.imgServer
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("九宫格页面加载:参数是" + JSON.stringify(options));
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
      success: function (res) {
        console.log(res.data);
        if (res.data.code == '00') {
          let content = res.data.content;
          that.setData({
            question: content.question,
            answer: content.answer,
            options: content.options,
            questionNo: content.questionNo,
            currentScore: content.currentScore,
            answerLength: content.answer.length
          });

          that.setData({
            questionNoSrc: that.data.imgServer + '/img/tixu/' + app.globalData.questionNo + '.png'
          });
          util.countdown(); // 计时器
          console.log(that.data);
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    });
  },

  select: function (event) {
    util.pause();
    let that = this;
    let index = event.currentTarget.dataset.selectd;
    let options = that.data.options;
    let userAnswer = that.data.userAnswer + options[index];
    let userAnswerArray = that.data.userAnswerArray;
    userAnswerArray.push(options[index]);
    options[index] = '';
    that.setData({
      options: options,
      userAnswer: userAnswer,
      userAnswerArray: userAnswerArray
    });
    if (userAnswer.length >= that.data.answer.length) {
      console.log("----------", this.data);
      let isCorrect;
      if (userAnswer == that.data.answer) {
        that.setData({
          correctPrompt: true
        });
        isCorrect = true;
      } else {
        that.setData({
          errorHint: true
        });
        isCorrect = false;
      }
      if (isCorrect) {
        app.globalData.okTotal++;
      }
      else {
        app.globalData.errTotal++;
      }


    }
  },

  go: function () {
    util.go();
  },

  skip: function () {
    util.pause(); 
    app.globalData.skipTotal++;
    util.go();
  },

  back: function () {
    wx.redirectTo({
      url: '../index/index',
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