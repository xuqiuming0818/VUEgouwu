<template>
    <div class="pagination">
        <!-- <h1>{{statNumAndEndNum}}</h1> -->
        <button :disabled='pageNo==1' @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="statNumAndEndNum.stare > 1"  @click="$emit('getPageNo',1)" >1</button>
        <button v-if="statNumAndEndNum.stare > 2">...</button>
        <!-- 中间部分 -->
        <button v-for="(page,index) in statNumAndEndNum.end" :key="index" v-if="page >= statNumAndEndNum.stare"  @click="$emit('getPageNo',page)" :class="{active:pageNo===page}">{{page}}</button>
        <button v-if="statNumAndEndNum.end < totalPage-1">...</button>
        <button v-if="statNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
        <button @click="$emit('getPageNo',pageNo+1)" :disabled="pageNo==totalPage">下一页</button>
        <button style="margin-left:30px">共{{totalPage}}页</button>

        <button style="margin-left:30px">共{{total}}条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    // 'pageNo'起始页,'pageSize'显示多少个,'total'多少个数据,'continues连续页码'
    props:['pageNo','pageSize','total','continues'],
    // 计算属性
    computed: {
        // 计算出多少页
        totalPage() {
            let sum = Math.ceil(this.total/this.pageSize)
            return sum
        },
        // 计算连续页码的起始数字与结束数字
        statNumAndEndNum(){
            const {pageNo,continues,totalPage}=this
            // 先定义两个变量  存储起始数字与结束数字
            let stare=0;
            let end=0;
            // 不正常现象
            if (continues>totalPage) {
                stare=1;
                end=totalPage
            }else{
                // 正常情况下[连续页码，总数大于开始的数]
                stare=pageNo - parseInt(continues/2)
                end=pageNo + parseInt(continues/2)
                if (stare < 1) {  // 当前页码太小了
                    stare = 1;
                    end= continues;
                }else if (end > totalPage ) {   //大于总页码
                    stare = totalPage-continues + 1;
                    end = totalPage
                }   
            }
            return {stare,end}
        }
    
    },
};
</script>

<style scoped lang='less'>
    .pagination{
            margin-left: 45%;
        button{
            height: 40px;
            width: 50px;
            &.active{
                font-size: 18px;
                background-color: rgb(214, 74, 74);
                color: white;
            }
        }
        
    }
</style>