<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(shopCart,index) in shopCartList" :key="shopCart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="shopCart.isChecked == 1" @change="updateChecked(shopCart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl">
            <div class="item-msg">{{shopCart.skuName}}</div>
          </li>
          
          <li class="cart-list-con4">
            <span class="price">{{shopCart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,shopCart)">-</a>
            <input autocomplete="off" type="text"  minnum="1" class="itxt" :value="shopCart.skuNum" @change="handler('change',$event.target.value*1,shopCart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',+1,shopCart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">￥{{shopCart.cartPrice * shopCart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deletecart(shopCart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

        
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked='isAllCheck&&shopCartList.length>0' @change="updateAllCartCheked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    // 挂载完毕
    mounted() {
      this.getCartData()
    },
    // 方法
    methods: {
      // 获取个人购物车
      getCartData() {
        this.$store.dispatch("getShopCart",)
      },
      //改变商品数量
      handler:throttle(async function(type,number,shopCart){      //type区分三个元素minus add change|,number变化量,|shopCart取参数和初始值
        console.log(type,number,shopCart);
        switch (type) {
          case "add":
            number=1;
            break;
          case "minus":
            //如果产品个数大于1  才带-1 给服务器
            number=shopCart.skuNum>1?-1:0;
            break;
          case "change":
            // if (isNaN(number) || number <1) {
            //   number = 0;
            // }else{
            //   number = parseInt(number)-shopCart.skuNum;
            // }
            number = (isNaN(number) || number <1)? 0 :parseInt(number)-shopCart.skuNum;
            break;
        }
        try {
        // 派发action
            await this.$store.dispatch("addOrUpdateShopCart",{skuId:shopCart.skuId,skuNum:number})
            this.getCartData()
        } catch (error) {
            alert(error)
        }
      },700),
      //删除一个商品
      deletecart(shopCart){
        let skuId = shopCart.skuId
        if (confirm('确定删除吗？')) {
          try {
            this.$store.dispatch('deleteCart',skuId)
            this.getCartData()
          } catch (error) {
            alert(error.message)
          }
        }
      },
      // 勾选或取消勾选
      async updateChecked(shopCart,event){
        console.log(event);
        try {
          let isCheck = event.target.checked?'1':'0';
          await this.$store.dispatch('updateChecked',{skuId:shopCart.skuId,isChecked:isCheck})
          this.getCartData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 删除选中的商品
      async deleteAllCheckedCart(){
        try {
          this.$store.dispatch('deleteAllCheckedCart')
          this.getCartData() //再次请求获取购物车
        } catch (error) {
          alert(error.message)
        }
      },
      // 勾选全选
      async updateAllCartCheked(event){
        try {
          let ischecked = event.target.checked?"1":"0";
        // 派发action
          await this.$store.dispatch("updateAllCartIsChecked",ischecked);
          this.getCartData()  //重新获取
        } catch (error) {
          alert(error.message)
        }
      }
    },
    // 计算属性
    computed: {
      ...mapGetters(['carList']),
      shopCartList(){
        return this.carList.cartInfoList || []
      },
      // 总价格
      totalPrice(){
        let sum = 0
        this.shopCartList.forEach(ele => {
          sum += ele.cartPrice * ele.skuNum
        });
        return sum
      },
      // 全选按钮
      isAllCheck(){
        return this.shopCartList.every(item => item.isChecked == 1)
      }
    },
    
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 46%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 14.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>