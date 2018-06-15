Component({
    properties: {
      // 这里定义了innerText属性，属性值可以在组件使用时指定
      list: {
        type: Array,
        value: [],
      },
      load: {
        type: Function
      }
    },
    data: {
      // 这里是一些组件内部数据
      scrollHeight: 0
    },
    attached () {
      let that = this
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            scrollHeight: res.windowHeight - 50
          })
        }
      })
    },
    methods: {
      // 这里是一个自定义方法
      customMethod: function(){},
      loadingMore: function(e) {
        this.triggerEvent("action")
      },
      lookContent (e) {
        wx.navigateTo({
          url: `/pages/display/display?id=${e.currentTarget.id}`
        })
      },
      lookUser (e) {
        wx.navigateTo({
          url: `/pages/user/user?loginname=${e.currentTarget.id}`
        })
      }
    }
})