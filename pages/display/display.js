const {_sendAjax} = require('../../utils/util.js');
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp();

Page({
    data: {
        article: {},
        title: '',
        otherData: {},
        replies: []
    },
    onLoad: function(option){
        let _ts = this
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 30000
        });
        let url = `https://cnodejs.org/api/v1/topic/${option.id}`
        _sendAjax(url).then((data) => {
            let otherData = {}
            data = data.data
            WxParse.wxParse('article', 'html', data.content, _ts, 5);
            otherData.time = data.create_at
            otherData.look = data.visit_count
            otherData.author = data.author.loginname
            _ts.setData({
                title: data.title,
                otherData: otherData,
                replies: data.replies
            })
        })
    }
})