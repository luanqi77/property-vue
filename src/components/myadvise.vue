<template>
  <!--<div style="width: 100%;height:6000px;margin: auto;background-color: yellow;margin-top: -50px">-->
  <div  style="width: 100%;height:100%;opacity:93%">
    <div style="height: 70%">
      <el-table
        :data="advises"
        stripe
        style="width: 60%;margin: auto;margin-top: 20px;height: 100%">
        <el-table-column
          prop="adviseTime"
          label="提交时间"
          width="140">
          <template slot-scope="scope" >
          {{scope.row.adviseTime.substr(0,10)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="详情">
        </el-table-column>
        <el-table-column
        prop="adviseTime"
        label="服务名称"
        width="140">
        <template slot-scope="scope" >
        <router-link v-bind:to="/replyinfo/+scope.row.adviseId" style="text-decoration: none">查看回复</router-link>
        </template>
        </el-table-column>
      </el-table>
    </div>
    <!--<div style="height: 30%;margin-top: 135px">-->
      <!--<el-carousel trigger="click" height="320px" style="width: 100%">-->
        <!--<el-carousel-item v-for="item in pics" :key="item">-->
          <!--<img :src="item.src"  width="1024px">-->
        <!--</el-carousel-item>-->
      <!--</el-carousel>-->
    <!--</div>-->
  </div>
</template>
<script>
  import axios from 'axios'
  import ElImage from "../../node_modules/element-ui/packages/image/src/main";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElMenu from "../../node_modules/element-ui/packages/menu/src/menu";
  export default {
    components: {ElMenu},
    data() {
      return {
        advises:[],
      }
    },
    mounted(){
      this.getadvise();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getadvise:function () {
        var url='api/selectAdviseByUserId'
        axios.post(url).then(res=>{
          this.advises=res.data;
        })
      }
    }
  }
</script>
<style>

</style>
