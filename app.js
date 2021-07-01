// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    this.getHeaderInfo()
    wx.hideTabBar()

  },
  globalData: {
    userInfo: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#333333",
      "selectedColor": "#26C55E",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/assets/images/preview.png",
          "selectedIconPath": "/assets/images/preview.png"
        },
        {
          "pagePath": "/pages/logs/logs",
          "text": "日志",
          "iconPath": "/assets/images/preview.png",
          "selectedIconPath": "/assets/images/preview.png"
        },
        {
          "pagePath": "/pages/page1/page1",
          "isSpecial": true,
          "text": "页面1",
          "iconPath": "/assets/images/preview.png",
          "selectedIconPath": "/assets/images/preview.png",
        },
        {
          "pagePath": "/pages/page2/page2",
          "text": "页面2",
          "iconPath": "/assets/images/preview.png",
          "selectedIconPath": "/assets/images/preview.png"
        },
        {
          "pagePath": "/pages/page3/page3",
          "text": "页面3",
          "iconPath": "/assets/images/preview.png",
          "selectedIconPath": "/assets/images/preview.png"
        }
      ]
    }
  },

  // 获取头部信息
  getHeaderInfo() {
    // 获取胶囊按钮的信息 { 高度，距离头部高度，距离底部高度 }
    const { height, top } = wx.getMenuButtonBoundingClientRect()
    console.log(wx.getMenuButtonBoundingClientRect())

    // 获取手机系统信息
    wx.getSystemInfo({
      success: (result) => {
        // 手机状态栏高度
        const statusBarHeight = result.statusBarHeight
        console.log(statusBarHeight)
        // 导航高度（状态栏高度 + 胶囊高度 + （胶囊距离顶部高度 - 状态栏高度）的二倍）胶囊是垂直居中的
        this.globalData.navHeight = statusBarHeight + height + (top - statusBarHeight) * 2
        this.globalData.navTop = top
        this.globalData.navButtonHeight = height
      },
    })
  },

  editTabbar () {
    //隐藏系统tabbar
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    // 拿到当前页面。这里面的 _this 对应的就是当前页面的引用
    let _this = currentPages[currentPages.length - 1];
    // 取出当前页面的路由
    let pagePath = _this.route;
    // 让路由第一个字符是 /
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    // 遍历数组，先让所有的都是非选中状态，只有当前路由对应的是选中的
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({ tabbar }); // 修改当前选中的页面的 tabbar 数据
  },
})
