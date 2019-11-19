<template>
  <!--<div style="width: 100%;height:6000px;margin: auto;background-color: yellow;margin-top: -50px">-->
  <div  style="width: 100%;height:100%;opacity:93%">
    <div style="height: 70%">
      <h2 style="margin-top: 50px;color: forestgreen">{{information.servername}}</h2>
      <h4 style="margin-top: 10px;color: deepskyblue">联系人：{{information.connname}}</h4>
      <h4 style="margin-top: 10px;color: lightcoral">联系方式：{{information.tel}}</h4>
      <p style="text-align: center;font-style: inherit;font-weight: 100;line-height: 40px;width: 65%;margin: auto">&nbsp;&nbsp;{{information.description}}</p><br><br>
      <el-button @click="goback()">返回</el-button>
    </div>
    <div style="height: 30%;margin-top: 93px">
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
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  export default {
    components: {
      ElButton,
      ElForm,
      ElMenu},
    data() {
      return {
        information:{
          inid:'',
          description:'',
          tel:'',
          connname:'',
          servername:'',
          company:''
        },
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
      this.queryInformation();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      queryInformation:function () {
        var bd = this.$route.params.inid;
        var url='api/selectInformationById'
        axios.post(url,{inid:bd}).then(res=>{
          this.information=res.data;
        })
      },
      goback:function () {
        this.$router.push({path:'/informations'})
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
