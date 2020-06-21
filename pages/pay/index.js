import { getSetting, chooseAddress, openSetting ,showModal ,showToast} from "../../utils/asyncWX.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address:{},
      cart:[],
      totalPice:0,
      totalNum:0
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart")||[];
    cart = cart.filter(v=>v.checked);
    this.setData({address});

    let totalPice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
        totalPice += v.num * v.goods_price;
        totalNum += v.num;
    })

    this.setData({
      cart,
      totalPice,
      totalNum,
    })
  },

  //获取用户token
  handleOrderPay(){
     const token = wx.getStorageSync('token');
     if(!token){
       wx.navigateTo({
         url: '/pages/auth/index',
       });
     }else{
       return;
     }
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