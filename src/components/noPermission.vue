<template>
  <div style="width: 100%;height: 100%">
    <el-link :underline="false" @click="back()"><img src="../assets/noPermission/nop.jpg"
    style="height: 400px;margin-left: 28%;margin-top: 5%"/></el-link>
  </div>


</template>
<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},
    data() {
      return {
      }
    },

    mounted(){
      this.isTimeout();
    },
    methods:{
        isTimeout(){
            setTimeout(()=>{
                this.$router.push({path:'/staffMain/staffMessage'})
            },5000)
        },
      back:function () {
        this.$router.push({path:'/staffMain/staffMessage'})
      }
    }
  }

</script>
<style>
  /*#back{*/
    /*background-image: url("../assets/noPermission/no.jpg");*/
  /*}*/
</style>
