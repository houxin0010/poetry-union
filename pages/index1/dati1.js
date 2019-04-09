// pages/index1/dati1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionPaperId: 0,
    question: '',
    answer: '',
    choiceA:'',
    choiceB:'',
    choiceC:'',
    choiceD:''
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
      url: 'http://localhost:10086/questionPaper/getQuestion',
      data: {
        questionPaperId: that.data.questionPaperId,
        questionNumber: 1
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        if(res.data.code == '00'){
          let content = res.data.content;
          that.setData({
            question: content.question,
            answer: content.answer,
            choiceA: content.options[0],
            choiceB: content.options[1],
            choiceC: content.options[2],
            choiceD: content.options[3]
          });
          console.log(that.data);
        }
      },
      fail: function(res) {
        console.log("--------fail--------");
      }
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