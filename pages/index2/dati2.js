// pages/index2/dati2.js
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
    userAnswer: '',
    currentScore: 0,
    nextQuestionType: '',
    questionNoSrc: '',
    displayBlock: 'display: none;',
    displayAlert: 'display: none;',
    displayYes: 'display: none;',
    displayNo: 'display: none;',
    displayYespic: 'display: none;',
    displaynopic: 'display: none;',
    displayContinueBtn: 'display: none;'
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
      url: getApp().globalData.host + '/questionPaper/getQuestion',
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
              questionNoSrc: '/img/titlenum/seven.png'
            });
          } else if (content.questionNo == 8) {
            that.setData({
              questionNoSrc: '/img/titlenum/eight.png'
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
    let that = this;
    that.setData({
      displayBlock: '',
      displayAlert: '',
      displayContinueBtn: ''
    });
    let isCorrect;
    if (this.data.answer == this.data.userAnswer) {
      that.setData({
        displayYes: '',
        displayYespic: ''
      });
      isCorrect = true;
    } else {
      that.setData({
        displayNo: '',
        displaynopic: ''
      });
      isCorrect = false;
    }
    wx.request({
      url: getApp().globalData.host + '/questionPaper/completeQuestion',
      data: {
        questionPaperId: that.data.questionPaperId,
        isCorrect: isCorrect
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data);
        that.setData({
          nextQuestionType: res.data.content
        });
      },
      fail: function(res) {
        console.log("--------fail--------");
      }
    });
  },

  go: function() {
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