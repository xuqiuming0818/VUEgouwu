<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <!-- <h2>{{skuImageList}}</h2> -->

    <div class="big">
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        currentInd: 0,
      };
    },
    computed: {
      imgObj() {
        return this.skuImageList[this.currentInd] || {};
      },
    },
    // 挂载完成
    mounted() {
      this.$bus.$on('getIndex',(index)=>{
        this.currentInd= index
      })
    },
    // 销毁之前
    beforeDestroy() {
      this.$bus.$off('getIndex')
    },
    methods: {
      handler(e) {
        let bigimg =this.$refs.big;  //大图片
        let mask = this.$refs.mask;  //遮罩层
        let left = e.offsetX - mask.offsetWidth/2
        let top = e.offsetY - mask.offsetHeight/2
        mask.style.left=left+'px';
        mask.style.top=top+'px';
        bigimg.style.left = -2*left+'px';
        bigimg.style.top = -2*top+'px';
        // 约束范围
        if (left <=0)mask.style.left=0+'px';
        if (left >= mask.offsetWidth) mask.style.left=mask.offsetWidth+'px';
        if (top <= 0)mask.style.top=0+'px';
        if (top >=mask.offsetHeight) mask.style.top=mask.offsetHeight+'px';
        
      },
    },
    
    
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>