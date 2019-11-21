<template>
  <div>
    <div style="margin-left: 10px;margin-top: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
        <el-breadcrumb-item :to="{ path: '/staffMain/staffMessage' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>物业缴费率</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <span style="font-size: 24px;color: cornflowerblue;margin-left: 50px;height: 50px;line-height: 50px">公示公告</span>




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

    },
    methods:{

    }
  }

</script>
