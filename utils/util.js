var app = getApp();
var timer; // 计时器
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function countdown() {
  timer = setTimeout(function () {
    console.log("----countdown----");
    app.globalData.skipTotal++;
    go();
  }, 31 * 1000);
};

function pause() {
  clearTimeout(timer);
}

function go() {
  clearTimeout(timer);
  app.globalData.questionNo = app.globalData.questionNo + 1;
  if (app.globalData.questionNo > app.globalData.questionTotal) {
    wx.redirectTo({
      url: '../phb/phb'
    });
    return;
  }
  console.info("下一题序号是：" + app.globalData.questionNo);
  var curQuestion = app.globalData.qusetions[app.globalData.questionNo - 1];
  console.info("下一题是:" + JSON.stringify(curQuestion));
  if (curQuestion.questionType == 'SINGLE_SEL') {
    wx.redirectTo({
      url: '../index1/dati1?qid=' + curQuestion.questionId + '&qtype=' + curQuestion.questionType
    });
  } else if (curQuestion.questionType == 'COMPLETION') {

    wx.redirectTo({
      url: '../index2/dati2?qid=' + curQuestion.questionId + '&qtype=' + curQuestion.questionType
    });
  } else if (curQuestion.questionType == 'BANKED_CLOZE') {

    wx.redirectTo({
      url: '../index3/dati3?qid=' + curQuestion.questionId + '&qtype=' + curQuestion.questionType
    });
  } else {
    wx.redirectTo({
      url: '../phb/phb'
    });
  }
};

function init(grade) {
  console.log("init：" + grade);
  wx.request({
    url: app.globalData.host + '/questionPaper/init',
    method: 'GET',
    data: {
      grade: grade
    },
    success: function (res) {
      console.log("考题初始化返回结果:" + JSON.stringify(res));
      if (res.data.code == '00') {
        let content = res.data.content;
        app.globalData.okTotal = 0;
        app.globalData.errTotal = 0;
        app.globalData.skipTotal = 0;
        app.globalData.questionNo = 1;
        app.globalData.qusetions = content.questions;
        app.globalData.questionTotal = content.questions.length;
        console.log(app.globalData.questionTotal);
        // console.log("考题初始化测试全局数据:" + app.globalData.questionNo);
        //console.log("考题初始化测试全局数据:" +JSON.stringify(app.globalData.qusetions));
        //console.log("考题初始化测试单个数据:" +JSON.stringify(app.globalData.qusetions[app.globalData.questionNo]));

        var curQuestion = app.globalData.qusetions[app.globalData.questionNo - 1];
        if (curQuestion.questionType == 'SINGLE_SEL') {
          wx.redirectTo({
            url: '../index1/dati1?qid=' + curQuestion.questionId + '&qtype=' + curQuestion.questionType
          });
        } else if (content.firstQuestionType == 'COMPLETION') {
          wx.redirectTo({
            url: '../index2/dati2?qid=' + curQuestion.questionId + '&qtype=' + curQuestion.questionType
          });
        } else if (content.firstQuestionType == 'BANKED_CLOZE') {
          wx.redirectTo({
            url: '../index3/dati3?qid=' + curQuestion.questionId + '&qtype=' + curQuestion.questionType
          });
        }
      }
    },
    fail: function (res) {
      console.log("初始化是");
    }
  });
}

module.exports = {
  formatTime: formatTime,
  go: go,
  init: init,
  countdown: countdown,
  pause: pause
}