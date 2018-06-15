//logs.js
const util = require('../../utils/util.js');
const {_sendAjax} = require('../../utils/util.js');

Page({
  data: {
    user: null,
    inputName: 'inputName',
    userData: {},
    Value: ""
  },
  displayCon (e) {
    wx.navigateTo({
      url: `/pages/display/display?id=${e.currentTarget.id}`
   })
  },
  _getLocalUser () {
    return new Promise ((resolve, reject) => {
      let that = this
      wx.getStorage({
        key: 'user',
        success: function(res) {
          that.setData({
            user: res.data
          })
          that._out()
          console.log('success')
          resolve()
        },
        fail: function() {
          console.log('没有user')
          reject()
        }
      })
    })
  },
  onLoad: function () {
    let that = this
    that._getLocalUser().catch(() => {
      that.setData({
        inputName: 'inputName'
      })
    })
  },
  onShow () {
    let that = this
    that._getLocalUser().catch(() => {
      that.setData({
        inputName: 'inputName'
      })
    })
  },
  _inputValue (e) {
    if (!e.detail.value) return
    this.setData({
      user: e.detail.value
    })
  },
  _fail () {
    
  },
  _userInfo () {
    if(!this.data.user) {
      this._fail()
      return null
    }
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 30000
    });
    let that = this
    let url = `https://cnodejs.org/api/v1/user/${this.data.user}`
    _sendAjax(url).then((data) => {
        if (!data.success) {
          that._fail()
          return
        }
        data = data.data
        that.setData({
            userData: data
        })
        wx.setStorage({
          key: 'user',
          data: this.data.user
        })
    })
  },
  _OpenWindows () {
    wx.removeStorageSync('user')
    this.setData({
      inputName: 'inputName',
      user: null,
      userData: {},
      Value: ""
    })
  },
  _out () {
    new Promise((resolve, reject) => {
      this.setData({
        inputName: 'outInput'
      })
      resolve()
    })
    this._userInfo()
  }
})
