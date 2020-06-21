import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧分类列表
    leftMenuList:[],
    //右侧商品数据
    rightContent:[],
    //左侧被选中的菜单
    currentIndex:0,
    //右侧滚动条顶部设置
    scrollTop:0
  },
  // 接口的返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地存储中的数据
  const Cates = wx.getStorageSync('cates');
    //判断数据是否缓存
  if(!Cates){
    //不存在 发送请求获取数据
     this.getCategoryList();
   }else{
     //旧数据可以使用
     this.Cates = Cates.data;
     let leftMenuList = this.Cates.map(v=>v.cat_name);
     let rightContent = this.Cates[0].children;
     this.setData({
       leftMenuList,
       rightContent
     })
   }
    
  },

  //获取 分类页面数据
 async getCategoryList(){
    // request({url:'/categories'})
    // .then(res=>{
    //    this.Cates=res;

    //    //把接口的数据存入到本地存储中
    //    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});

    //    //构造左侧的大菜单数据
    //    let leftMenuList=this.Cates.map(v=>v.cat_name);

    //    //构造右侧的商品数据
    //    let rightContent=this.Cates[0].children;
    //    this.setData({
    //      leftMenuList,
    //      rightContent,
    //    })
    //   })
    
    const res =await request({url:'/categories'});
    this.Cates = res;
    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
    let leftMenuList=this.Cates.map(v=>v.cat_name);
    let rightContent=this.Cates[0].children;
    this.setData({
           leftMenuList,
           rightContent,
         })

  },

  //获取左侧选中的菜单下标
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;

    this.setData({
      currentIndex:index,
      rightContent,
      //右侧滚动条顶部设置
      scrollTop:0
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