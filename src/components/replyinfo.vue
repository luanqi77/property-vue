<template>
  <div  style="width: 100%;height:100%;opacity:93%">
    <div style="height: 70%">
      <el-table
        :data="replys"
        stripe
        style="width: 60%;margin: auto;margin-top: 20px;height: 100%">
        <el-table-column
          prop="replyTime"
          label="回复时间"
          width="140">
          <template slot-scope="scope" >
            <!--<router-link v-bind:to="/replyinfo/+scope.row.adviseId" style="text-decoration: none">查看回复</router-link>-->
            {{scope.row.replyTime.substr(0,10)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="replyDeso"
          label="详情">
        </el-table-column>
      </el-table>
    </div>
    <el-button @click="reback()">返回</el-button>
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
        replys:[],
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
      this.getreplyinfo();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getreplyinfo:function () {
          var adviseId = this.$route.params.adviseid
//        alert(adviseId);
        var url='api/selectReplyByAdviseId?adviseId='+adviseId
        axios.get(url).then(res=>{
          this.replys=res.data;
        })
      },
      reback:function () {
        this.$router.push({path:'/myadvise'})
      }

    }
  }
</script>
<style>

</style>
