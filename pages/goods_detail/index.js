import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/goos_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },

  //全局商品详情对象
  GoodsDetail: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options;
    this.getGoodsDetail(goods_id);
  },

  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    });
    this.GoodsDetail = goodsObj;
    let collect = wx.getStorageSync('collect') || [];
    let isCollect = collect.some(v => v.goods_id === this.GoodsDetail.goods_id);
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        pics: goodsObj.pics,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg')
      },
      isCollect
    })

  },

  //点击放大预览图片
  handlePreviewImage(e) {
    const urls = this.GoodsDetail.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;

    wx.previewImage({
      current,
      urls
    });
  },
  //点击加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsDetail.goods_id);
    if (index === -1) {
      this.GoodsDetail.num = 1;
      this.GoodsDetail.checked = true;
      cart.push(this.GoodsDetail);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: "success",
      mark: true
    })
  },

  //收藏商品
  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id === this.GoodsDetail.goods_id);
    if (index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mark: true
      })
    } else {
      collect.push(this.GoodsDetail);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mark: true
      })
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    })
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
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;

    const {
      goods_id
    } = options;
    this.getGoodsDetail(goods_id);

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