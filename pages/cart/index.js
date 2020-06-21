import { getSetting, chooseAddress, openSetting ,showModal ,showToast} from "../../utils/asyncWX.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address:{},
      cart:[],
      allChecked:false,
      totalPice:0,
      totalNum:0
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")||[];
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    this.setData({address});
    this.setCart(cart);
  },

  //获取收货地址
  async handleChooseAddress(){
    //  wx.getSetting({
    //    success:(result)=>{
    //      const scopeAdress = result.authSetting['scope.address'];
    //      if(scopeAdress===true||scopeAdress===undefined){
    //        wx.chooseAddress({
    //          success: (res) => {
    //             console.log(res);
    //          }
    //        });
    //      }else{
    //        wx.openSetting({
    //          success: (res2) => {
    //            console.log(res2);
    //          }
    //        });
    //      }
    //    }
    //  })
     //
     try {
       const setting = await getSetting();
     const scopeAdress = setting.authSetting["scope.address"];
     if(scopeAdress === false){
       await openSetting();
     }
     const address = await chooseAddress();
     address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
     wx.setStorageSync('address', address);
     } catch (error) {
       console.log(error);
       
     }
     
  },

  //获取商品选中参数
  handleItemChange(e){
     const goods_id = e.currentTarget.dataset.id;
     let {cart} = this.data;
     let index = cart.findIndex(v=>v.goods_id===goods_id);
     cart[index].checked = !cart[index].checked;
     this.setCart(cart);

  },

  //商品选中 重新计算商品数量总价格
  setCart(cart){
    let allChecked = true;
    let totalPice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPice += v.num * v.goods_price;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    })
    allChecked = cart.length!=0?allChecked:false;

    this.setData({
      cart,
      totalPice,
      totalNum,
      allChecked
    })
    wx.setStorageSync('cart', cart);
  },

  //商品全选 反选
  handleItemAllChecked(){
      let {cart,allChecked} = this.data;
      allChecked = !allChecked;
      cart.forEach(v=>v.checked=allChecked);
      this.setCart(cart);
  },

  //商品数量增减
  async handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
    
    if(cart[index].num===1&&operation===-1){
        const res = await showModal({content:"您确定删除吗？"});
        if(res.confirm){
          cart.splice(index,1);
          this.setCart(cart);
        }
    }else{
      cart[index].num += operation;
      this.setCart(cart);
    }
   
  },

  //结算判断
  async handlePay(){
    // 判断收货地址
    const {address,totalNum} = this.data;
    
    if(!address.userName){
      await showToast({title:"收货地址不能为空"});
      return;
    }

    // 判断商品
    if(totalNum === 0){
      await showToast({title:"您还未选购商品"});
      return;
    }

    // 结算 跳转支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
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