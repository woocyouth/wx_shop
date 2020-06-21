import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inpValue:""
  },

  TimeId:-1,
  //搜索按钮
  handleInput(e){
   const {value}=e.detail;
   if(!value.trim()){
     this.setData({
       goods:[],
      isFocus:false
     })
     return;
   }
   this.setData({
    isFocus:true
   })
   clearTimeout(this.TimeId);
   this.TimeId = setTimeout(()=>{
     this.qsearch(value);
   },1000)
   
  },

  //重置搜索框
  handleCancel(){
    this.setData({
      goods:[],
      isFocus:false,
      inpValue:""
    })
  },

  //请求搜索，获取数据
  async qsearch(search){
     const res = await request({url:"/goods/search",data:{search}});
     this.setData({
      goods:res
     })
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})