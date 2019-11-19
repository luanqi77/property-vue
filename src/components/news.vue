<template>
  <!--<div style="width: 100%;height:6000px;margin: auto;background-color: yellow;margin-top: -50px">-->
  <div  style="width: 100%;height:100%">
    <div style="width: 45%;height: 320px;border: white 1px solid;margin-top: 30px;margin-left:30px;float: left">
      <el-carousel trigger="click" height="320px" style="width: 100%">
        <el-carousel-item v-for="item in pics" :key="item">
          <img :src="item.src" height="90%" width="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="width: 45%;height: 320px;border: white 1px solid;margin-top: 30px;margin-left:30px;float: left">
      <div style="height: 5%;width: 100%;margin: auto;margin-top: -35px">
        <h3 style="float: left;color: goldenrod"><i class="el-icon-s-opportunity"></i>&nbsp;热点资讯</h3>
      </div>
      <div style="height:95%;width: 100%;margin:auto">
        <el-table
          :data="boards"
          stripe
          style="width: 100%">
          <el-table-column
            prop="boardTime"
            label="日期"
            width="140"
            :formatter="dateFormat">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
            <template slot-scope="scope" >
              <router-link v-bind:to="/boardinfo/+scope.row.boardId" style="text-decoration: none">{{scope.row.title}}</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div><br>
    <div style="width: 45%;height: 320px;border: white 1px solid;margin-top: -35px;margin-left:30px;float: left">
      <div style="height: 15%;width: 100%;margin: auto">
        <h3 style="float: left;color: green"><i class="el-icon-office-building"></i>&nbsp;社区公告</h3>
      </div>
      <div style="height:85%;width: 100%;margin-top:10px;">
        <el-table
          :data="boards"
          stripe
          style="width: 100%">
          <el-table-column
            prop="boardTime"
            label="日期"
            width="140"
            :formatter="dateFormat">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
            <template slot-scope="scope" >
            <router-link v-bind:to="/boardinfo/+scope.row.boardId" style="text-decoration: none">{{scope.row.title}}</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="width: 45%;height: 320px;border: white 1px solid;margin-top: 30px;margin-left:30px;float: left">
      <el-carousel trigger="click" height="320px" style="width: 100%">
        <el-carousel-item v-for="item in pics2" :key="item">
          <img :src="item.src" height="90%" width="100%">
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
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  export default {
    components: {
      ElForm,
      ElMenu},
    data() {
      return {
        boards:[],
        pics:[
          {src:require('../assets/news/lunbo1.jpg')},
          {src:require('../assets/news/lunbo2.jpg')},
          {src:require('../assets/news/lunbo3.jpg')},
          {src:require('../assets/news/lunbo4.jpg')},
          {src:require('../assets/news/lunbo5.jpg')}
        ],
        pics2:[
          {src:require('../assets/news/ad1.jpg')},
          {src:require('../assets/news/lunbo2.jpg')},
          {src:require('../assets/news/lunbo3.jpg')},
          {src:require('../assets/news/lunbo4.jpg')},
          {src:require('../assets/news/lunbo5.jpg')}
        ]
      }
    },
    mounted(){
      this.queryboards();
    },
    methods: {
      dateFormat:function(row,column){
        var t=new Date(row.boardTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      queryboards:function () {
        var url='api/findAllBoard'
        axios.get(url).then(res=>{
          this.boards=res.data;
        })

      }
    }
  }
</script>
<style scoped>
  .el-form-item__label{
    color: black;
    font-size: 16px;
  }
  .el-textarea__inner{
    height: 300px;
    font-size: 20px;
    font-family: 楷体;
    background-color: inherit;
    color: black;
  }
  .el-carousel__item.is-animating{
    height:288px;
  }
</style>
