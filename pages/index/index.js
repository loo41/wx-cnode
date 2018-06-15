var sliderWidth = 60; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: ["全部", "精华", "分享", "问答", "招聘"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        list: [],
        allData: {
            index: [],
            good: [],
            share: [],
            ask: [],
            job: []
        },
        tab: 'index',
        page: [1, 1, 1, 1, 1]
    },
    onShareAppMessage: function (res) {
        return {
          title: 'CNODE社区',
          path: '/page/index'
        }
    },
    onLoad: function () {
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 30000
        });
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
        that._sendAjax(1)
    },
    _sendAjax (i, tab) {
        return new Promise((resolve, reject) => {
            let that = this
            let url = `https://cnodejs.org/api/v1/topics?page=${i}`
            if (tab && tab !== 'index') {
                url = `https://cnodejs.org/api/v1/topics?tab=${tab}&page=${i}`
            }
            wx.request({
                url: url,
                success: function(res) {
                    that.dealWith(res.data, tab).then(() => {
                        resolve()
                    })
                }
            })
        })
    },
    dealWith (data, tab) {
        return new Promise((resolve, reject) => {
            data.data.forEach(element => {
                delete element.content
            });
            if (tab) {
                let tem = this.data.allData[tab].concat(data.data)
                this.data.allData[tab] = tem
                this.setData({
                    allData: this.data.allData
                })
            } else {
                let tem = this.data.allData['index'].concat(data.data)
                this.data.allData['index'] = tem
                this.setData({
                    allData: this.data.allData,
                    list: this.data.allData.index
                })
            }
            wx.hideToast()
            resolve()
        })
    },
    _loadingMoreData(e) {
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 30000
        });
        let flag = null
        switch(this.data.tab) {
            case 'index':
                flag = 0
                break
            case 'good':
                flag = 1
                break
            case 'share':
                flag = 2
                break
            case 'ask':
                flag = 3
                break
            case 'job':
                flag = 4
                break
        }
        this._sendAjax(this.data.page[flag], this.data.tab).then(() => {
            let index = this.data.page.splice(flag, 1, this.data.page[1] += 1)
            this.setData({
                page: this.data.page,
                list: this.data.allData[this.data.tab]
            })
        })
    },
    tabClick: function (e) {
        let flag = parseInt(e.currentTarget.id)
        let u = parseInt(e.currentTarget.id)
        let tab = ''
        if (flag === 0) {
            flag = this.data.allData.index
            tab = 'index'
        } else if (flag === 1) {
            flag = this.data.allData.good
            tab = 'good'
        } else if (flag === 2) {
            flag = this.data.allData.share
            tab = 'share'
        } else if (flag === 3) {
            flag = this.data.allData.ask
            tab = 'ask'
        } else {
            flag = this.data.allData.job
            tab = 'job'
        }
        if (flag.length < 40) {
            wx.showToast({
                title: '数据加载中',
                icon: 'loading',
                duration: 30000
            });
            if (u === 0) {
                this._sendAjax(this.data.page[0]++).then(() => {
                    let index = this.data.page.splice(0, 1, this.data.page[1] += 1)
                    this.setData({
                        page: this.data.page,
                        list: this.data.allData.index,
                        tab: 'index'
                    })
                })
            } else if (u === 1) {
                this._sendAjax(this.data.page[1], 'good').then(() => {
                    let index = this.data.page.splice(1, 1, this.data.page[1] += 1)
                    this.setData({
                        page: this.data.page,
                        list: this.data.allData.good,
                        tab: 'good'
                    })
                })
            } else if (u === 2) {
                this._sendAjax(this.data.page[2], 'share').then(() => {
                    let index = this.data.page.splice(2, 1, this.data.page[1] += 1)
                    this.setData({
                        page: this.data.page,
                        list: this.data.allData.share,
                        tab: 'share'
                    })
                })
            } else if (u === 3) {
                this._sendAjax(this.data.page[3], 'ask').then(() => {
                    let index = this.data.page.splice(3, 1, this.data.page[1] += 1)
                    this.setData({
                        page: this.data.page,
                        list: this.data.allData.ask,
                        tab: 'ask'
                    })
                })
            } else {
                this._sendAjax(this.data.page[4], 'job').then(() => {
                    let index = this.data.page.splice(4, 1, this.data.page[1] += 1)
                    this.setData({
                        page: this.data.page,
                        list: this.data.allData.job,
                        tab: 'job'
                    })
                })
            }
        } else {
            this.setData({
                list: flag,
                tab: tab
            });
        }
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});