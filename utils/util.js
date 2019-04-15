var app = getApp();

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

 function go() {
 
  app.globalData.questionNo = app.globalData.questionNo + 1;
   if (app.globalData.questionNo > app.globalData.questionTotal)
   {
     wx.redirectTo({
       url: '../phb/phb'
     });
     return ;
   }
  console.info("下一题序号是：" + app.globalData.questionNo);
  var curQuestion = app.globalData.qusetions[app.globalData.questionNo-1];
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
      url: '../phb/phb?questionPaperId=' + this.data.questionPaperId
    });
  }
}


module.exports = {
  formatTime: formatTime,
  go:go
}
