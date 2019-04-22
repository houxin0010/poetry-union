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
    question1: '',
    question2: '',
    residueNo: 0,
    answer: '',
    options: [],
    userAnswer: '',
    userAnswerArray: [],
    answerLength: 0,
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
  onLoad: function (options) {
    console.log("填空题页面加载:参数是" + JSON.stringify(options));
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
          console.log(content.question);
          let quesitonArray = content.question.split("，");
          console.log(quesitonArray);
          that.setData({
            question1: quesitonArray[0],
            question2: quesitonArray[1],
            answer: content.answer,
            options: content.options,
            questionNo: content.questionNo,
            answerLength: content.answer.length,
            currentScore: content.currentScore
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

  answerInput: function (e) {
    this.setData({
      userAnswer: e.detail.value
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
    console.log("----------", this.data);
    if (userAnswer.length >= that.data.answer.length) {
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
    }
  },

  go: function () {
    util.go();
  },

  skip: function () {
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