<template>
  <!--<div style="width: 100%;height:6000px;margin: auto;background-color: yellow;margin-top: -50px">-->
  <div  style="width: 100%;height:100%;opacity:93%">
    <div style="height: 70%">
    <el-table
      :data="informations"
      stripe
      style="width: 60%;margin: auto;margin-top: 20px;height: 100%">
      <el-table-column
        prop="servername"
        label="服务名称"
        width="140">
        <template slot-scope="scope" >
          <router-link v-bind:to="/informationinfo/+scope.row.inid" style="text-decoration: none">{{scope.row.servername}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="connname"
        label="联系人"
        width="140">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话"
        width="140">
      </el-table-column>
      <el-table-column
        prop="company"
        label="公司名称">
      </el-table-column>
    </el-table>
    </div>
    <div style="height: 30%;margin-top: 135px">
      <el-carousel trigger="click" height="320px" style="width: 100%">
        <el-carousel-item v-for="item in pics" :key="item">
          <img :src="item.src"  width="1024px">
        </el-carousel-item>
      </el-carousel>
    </div>
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
          informations:[],
        pics:[
          {src:require('../assets/information/ad1.jpg')},
          {src:require('../assets/information/ad2.jpg')},
          {src:require('../assets/information/ad3.jpg')},
//          {src:require('../assets/news/lunbo4.jpg')},
//          {src:require('../assets/news/lunbo5.jpg')}
        ]
      }
    },
    mounted(){
      this.queryinfomations();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      queryinfomations:function () {
        var url='api/findAllInformation'
        axios.get(url).then(res=>{
            this.informations=res.data;
        })
      }
    }
  }
</script>
<style>

</style>
