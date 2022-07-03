<template>
    <div class="swiper-container" id="floor1Swiper" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in lists" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
// 引入Swiper    JS
import Swiper from 'swiper'

export default {
    name:'Carousel',
    props:['lists'],
    watch: {
        lists:{
            // 不管你数据有没有变化，都监听一次
            immediate:true,
            handler(newValue,oldValue){
                // console.log('立即监听');
                this.$nextTick(()=>{
                    var mySwiper = new Swiper (this.$refs.cur, {
                    loop: true, // 循环模式选项
                    autoplay:true,
                    // 如果需要分页器
                    pagination: {
                    el: '.swiper-pagination',
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    },
                    
                    // 如果需要滚动条
                    scrollbar: {
                    el: '.swiper-scrollbar',
                    },
                }) 
                })
            }
            
        },
    },
}
</script>

<style>

</style>