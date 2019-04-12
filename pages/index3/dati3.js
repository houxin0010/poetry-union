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
    options: [],
    answer: '',
    userAnswer: '',
    userAnswerArray: [],
    correctPrompt: false,
    errorHint:false,
    answerLength: 0,
    currentScore: 0,
    questionNoSrc: '',
    nextQuestionType:'',
    imgServer: app.globalData.imgServer
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
      success: function(res) {
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


          if (content.questionNo == 1) {
            that.setData({
              questionNoSrc: that.data.imgServer + '/img/titlenum/one.png'
            });
          } else if (content.questionNo == 2) {
            that.setData({
              questionNoSrc: that.data.imgServer + '/img/titlenum/two.png'
            });
          } else if (content.questionNo == 3) {
            that.setData({
              questionNoSrc: that.data.imgServer + '/img/titlenum/three.png'
            });
          } else if (content.questionNo == 4) {
            that.setData({
              questionNoSrc: that.data.imgServer + '/img/titlenum/four.png'
            });
          } else if (content.questionNo == 5) {
            that.setData({
              questionNoSrc: that.data.imgServer + '/img/titlenum/five.png'
            });
          } else if (content.questionNo == 6) {
            that.setData({
              questionNoSrc: that.data.imgServer + '/img/titlenum/six.png'
            });
          } else if (content.questionNo == 7) {
            that.setData({
              questionNoSrc: that.data.imgServer + '/img/titlenum/one.png'
            });
          } else if (content.questionNo == 8) {
            that.setData({
              questionNoSrc: that.data.imgServer + '/img/titlenum/saven.png'
            });
          } else if (content.questionNo == 9) {
            that.setData({
              questionNoSrc: that.data.imgServer + '/img/titlenum/nine.png'
            });
          } else if (content.questionNo == 10) {
            that.setData({
              questionNoSrc: that.data.imgServer + '/img/titlenum/ten.png'
            });
          }
          console.log(that.data);
        }
      },
      fail: function(res) {
        console.log("--------fail--------");
      }
    });
  },

  select: function(event) {
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
      console.log("----------",this.data);
      let isCorrect;
      if (userAnswer == that.data.answer){
        that.setData({
          correctPrompt: true
        });
        isCorrect = true;
      }else{
        that.setData({
          errorHint: true
        });
        isCorrect = false;
      }

      wx.request({
        url: app.globalData.host + '/questionPaper/completeQuestion',
        data: {
          questionPaperId: that.data.questionPaperId,
          isCorrect: isCorrect
        },
        method: 'GET',
        success: function (res) {
          console.log(res.data);
          that.setData({
            nextQuestionType: res.data.content
          });
        },
        fail: function (res) {
          console.log("--------fail--------");
        }
      });
    }
  },

  go: function () {
    if (this.data.nextQuestionType == 'SINGLE_SEL') {
      wx.navigateTo({
        url: '../index1/dati1?questionPaperId=' + this.data.questionPaperId
      });
    } else if (this.data.nextQuestionType == 'COMPLETION') {
      wx.navigateTo({
        url: '../index2/dati2?questionPaperId=' + this.data.questionPaperId
      });
    } else if (this.data.nextQuestionType == 'BANKED_CLOZE') {
      wx.navigateTo({
        url: '../index3/dati3?questionPaperId=' + this.data.questionPaperId
      });
    } else {
      wx.navigateTo({
        url: '../phb/phb?questionPaperId=' + this.data.questionPaperId
      });
    }
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