// detail.js
Page({
  data: {
    order_id: "",
    detailList: [],
    toastText: "加载中"
  },
  onLoad(options) {
    let order_id = options.order_id;
    this.getData(order_id);
  },
  getData(order_id) {
    let url = "https://www.kuaidi100.com/query";
    let company = "jd";
    var that = this
    wx.request({
      url: url,
      data: {
        type: company,
        postid: order_id
      },
      success(res) {
        console.log(res);
        if (res.data.data.length) {
          if (res.data.data[0].context === "查无结果") {
            that.setData({
              toastText: "查无结果"
            });
            return;
          }
          that.setData({
            detailList: res.data.data,
            order_id: order_id
          })
        } else {
          that.setData({
            toastText: res.data.message
          })
        }
      },
      fail(err) {
        console.log(err);
        that.setData({
          toastText:"网络发生错误"
        })
      }
    })
  }
})
