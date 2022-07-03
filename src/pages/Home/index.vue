<template>
    <div>
        <TypeNav/>
        <ListContainer/>
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="floor in FloorsList" :key="floor.id" :list='floor'></Floor>
        <Brand/>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState,mapMutations} from 'vuex'

export default {
    name: "Home",
    components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
    computed: {
        ...mapState({FloorsList:state=>state.home.FloorsList})
    },
    methods: {
        ...mapMutations(['add'])
        
    },
    // 挂载完毕
    mounted() {
        this.$store.dispatch('getFloorsList');
    },
};
</script>

<style>
</style>