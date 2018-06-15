const {_sendAjax} = require('../../utils/util.js');

Page({
    data: {
        user: {}
    },
    onLoad(options) {
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 30000
        });
        let that = this
        let url = `https://cnodejs.org/api/v1/user/${options.loginname}`
        _sendAjax(url).then((data) => {
            data = data.data
            that.setData({
                user: data
            })
        })
    },
    displayCon(e) {
        wx.navigateTo({
            url: `/pages/display/display?id=${e.currentTarget.id}`
        })
    }
})