// 引入发送请求的方法
import {request} from "../../request/index.js";
//Page Object
Page({
  data: {
    swiperList:[],
    cateList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //    this.setData({
    //      swiperList:result.data.message
    //    })
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  //轮播图
  getSwiperList(){
    request({url: '/home/swiperdata'})
    .then(
      result=>{
        this.setData({
               swiperList:result
        })
      }
    )
  },
  //分类导航
  getCateList(){
    request({url: '/home/catitems'})
    .then(
      result=>{
        this.setData({
               cateList:result
        })
      }
    )
  },
  //楼层
  getFloorList(){
    request({url:'/home/floordata'})
    .then(
      result=>{
        this.setData({
          floorList:result
        })
      }
    )
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  