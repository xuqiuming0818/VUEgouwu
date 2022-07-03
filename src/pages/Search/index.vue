<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的名字 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removekeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removetrademark">×</i>
            </li>
            <!-- 属性面包屑 -->
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}<i @click="removeAttr(attr)">×</i>
            </li>
          </ul>
        </div>

        <!--selector子组件-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--产品区-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <!-- iconfont icon-shang-jiantou -->
                  <a>综合 <i v-show="isOne" class="iconfont" :class="{'icon-shang-jiantou':isUp,'icon-xia-jiantou':isDown}"></i></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格<i v-show="isTwo" class="iconfont" :class="{'icon-shang-jiantou':isUp,'icon-xia-jiantou':isDown}"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id" >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`" target="_blank"><img :src="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination :pageNo='searchParams.pageNo' :pageSize='searchParams.pageSize' :total='total' :continues='5' @getPageNo='getPageNo'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        // 默认是综合降序
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  // 挂载完毕之前
  beforeMount() {
    // this.searchParams.category1Id=this.$route.query.category1Id;
    // this.searchParams.category2Id=this.$route.query.category2Id;
    // this.searchParams.category3Id=this.$route.query.category3Id;
    // this.searchParams.categoryName=this.$route.query.categoryName;
    // this.searchParams.keyword=this.$route.params.keyword;
    // ES6 合并参数 把数据合并到第一个参数当中
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  // 加载完毕
  mounted() {
    this.getData();
  },
  // 计算属性
  computed: {
    //mapGetters
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    // 升序
    isUp(){
      return this.searchParams.order.indexOf("asc") != -1;
    },
    // 降序
    isDown(){
      return this.searchParams.order.indexOf("desc") != -1;
    },
    ...mapState({
      total:state=>state.search.searchList.total
    })
  },
  // 方法
  methods: {
    // 封装请求服务器
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除分类
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.pageNo = 1;
      this.getData();
      //1.地址也需要该 进行路由跳转
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除关键字
    removekeyword() {
      this.searchParams.keyword = undefined;
      this.searchParams.pageNo = 1;
      // 清楚搜索框的keyword
      this.$bus.$emit("clear");
      this.getData();
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 自定义事件回调
    trademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 去出品牌面包屑
    removetrademark() {
      this.searchParams.trademark = undefined;
      this.searchParams.pageNo = 1;
      this.getData();
    },
    // 收集平台属性（自定义事件）
    attrInfo(attr, attrValue) {
      //商品属性的数组: ["属性ID:属性值:属性名"]
      this.searchParams.pageNo = 1;
      // console.log(attr, attrValue);
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(props) === -1)
        this.searchParams.props.push(props);
      this.getData();
    },
    // 删除售卖属性
    removeAttr(attr) {
      // this.searchParams.props.splice(index,1)
      this.searchParams.pageNo = 1;
      let newprops = this.searchParams.props.filter((item) => item !== attr);
      this.searchParams.props = newprops;
      this.getData();
    },
    // 商品排序order: "1:desc",
    changeOrder(flag){
      this.searchParams.pageNo = 1;
      let Order = this.searchParams.order
      // 这里获取最开始的
      let originFlag = this.searchParams.order.split(":")[0]
      let originSort= this.searchParams.order.split(":")[1]
      // 准备应该新order
      let newOrder = '';
      if (flag===originFlag) {
        newOrder=`${originFlag}:${originSort=='desc'?'asc':'desc'}`
        console.log(newOrder);
      }else{
        newOrder=`${flag}:${'desc'}`
      }
      this.searchParams.order = newOrder //重新赋值
      this.getData()
    },
    //自定义事件----获取第几页
    getPageNo(pageNo){
      console.log(pageNo);
      this.searchParams.pageNo = pageNo;
      this.getData()
    }
  },
  // 数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    $route(newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      console.log(this.searchParams);
      this.getData();
      // 每次请求完毕，应该把上一次的category（1，2，3）Id清空
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      
    }
  }
}
</style>