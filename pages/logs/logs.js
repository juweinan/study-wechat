// logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    logs: []
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
    app.editTabbar();
  }
})
