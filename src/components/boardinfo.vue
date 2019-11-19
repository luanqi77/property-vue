<template>
  <!--<div style="width: 100%;height:6000px;margin: auto;background-color: yellow;margin-top: -50px">-->
  <div id="back5" style="width: 96%;height:600px;margin: auto">
    <h2 style="margin-top: 50px;color: forestgreen">{{board.title}}</h2>
    <h4 style="margin-top: 10px;color: deepskyblue">发布时间：{{board.boardTime.substr(0,10)}}</h4>
    <p style="text-align: center;font-style: inherit;font-weight: 100;margin-bottom: -6px;width: 70%;margin-left: -127px">尊敬的各位业主:</p><br>
    <p style="text-align: center;font-style: inherit;font-weight: 100;line-height: 40px;width: 65%;margin: auto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{board.boardDeso}}</p><br><br>
    <el-button @click="goback()">我知道了</el-button>
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
      ElButton,
      ElForm,
      ElMenu},
    data() {
      return {
        board:{
          boardId:'',
          boardDeso:'',
          boardTime:'',
          title:'',
          level:''
        }
      }
    },
    mounted(){
      this.queryBoard();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      queryBoard:function () {
        var bd = this.$route.params.boardId;
        var url='api/selectBoardById'
        axios.post(url,{boardId:bd}).then(res=>{
          this.board=res.data;
        })
      },
      goback:function () {
        this.$router.push({path:'/news'})
      }
    }
  }
</script>
<style>
  .el-form-item__label{
    color: black;
    font-size: 16px;
  }
  .el-textarea__inner{
    height: 300px;
    font-size: 20px;
    font-family: "Microsoft YaHei UI Light";
    background-color: inherit;
    color: black;
  }
  #back5{
    background-image: url("../assets/boardinfo/back1.jpg");
  }
</style>
