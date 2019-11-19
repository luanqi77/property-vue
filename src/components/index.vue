<template>
  <div style="width: 100%;height:3000px;margin: auto;">
    <div style="width: 100%;margin: auto;height: 118px;background-color: black">
      <div style="width: 30%;float: left;margin-left: 50px">
        <img src="../assets/index/logo1.png" width="60%"></img>
      </div>
      <div style="width: 60%;background-color: black;height: 100px;float: right;margin-left: 100px">
        <h2 style="float: left;margin-left:460px;margin-top: 50px;color: white;width: 100px">业主入口</h2>
        <el-button @click="login()" style="width: 30px;background-color: black;border: 0px solid;margin-left: 155px"><img src="../assets/index/jiantou.gif" height="118px" style="margin-left: -290px"  ></el-button>
        <!--<el-button type="primary" style="margin-left: 00px;margin-top:-50px;line-height: 30px;width: 100px;height: 50px;margin-top: 2px;background-color: lightskyblue;border: 0px;font-size: 16px">登录/注册</el-button>-->
      </div>
    </div>
    <div style="height: 603px;width: 100%">
      <el-carousel trigger="click" height="603px" style="margin-left: 0px;width: 100%">
        <el-carousel-item v-for="item in pics" :key="item">
          <img :src="item.src" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div id="back1" style="height: 450px;margin-top: 0px">
      <div style="width: 80%;margin: auto;padding-bottom: 68px">
        <h2 style="color: green;float: right;margin-right: 100px">OUR PRODUCT&SERVICE</h2>
      </div>
      <div style="width: 80%;margin: auto;padding-bottom: 100px">
          <h2 style="color: green;float: right;margin-right: 100px">我们为您提供的服务</h2>
        </div>
        <div style="width: 58%;margin: auto;margin-top: 20px">
        <el-carousel :interval="3000" type="card" height="214px">
          <el-carousel-item v-for="item in fuwus" :key="item" >
            <img :src="item.src" width="550px" height="214px">
          </el-carousel-item>
        </el-carousel>
        </div>
      </div>
    <div  id="back2" style="width: 100%;margin: auto;background-color: white;height: 555px">
      <div style="width: 75%;margin: auto">
      <div style="width: 100%;margin: auto;height: 75px">
        <h2 style="font-weight: 400;color: red;float: left;height: 75px">社区公告</h2>
      </div>
      <div style="width: 100%">
      <div style="width: 100%;margin: auto;height: 240px">
        <div style="width: 30%;height: 220px;float: left;margin-left: -83px;border: 1px solid"></div>
        <div style="width: 30%;height: 220px;float: left;margin-left: 50px;border: 1px solid"></div>
        <div style="width: 30%;height: 220px;float: left;margin-left: 50px;border: 1px solid"></div>
      </div>
      <div style="width: 100%;margin: auto;height: 240px">
        <div style="width: 30%;height: 220px;float: left;margin-left: 13px;border: 1px solid"></div>
        <div style="width: 30%;height: 220px;float: left;margin-left: 50px;border: 1px solid"></div>
        <div style="width: 30%;height: 220px;float: left;margin-left: 50px;border: 1px solid"></div>
      </div>
    </div>
      </div>
    </div>
    <div id="back3" style="width:100%">
    <div style="width: 75%;margin: auto;height: 555px">
      <div style="width: 100%;margin: auto;height: 75px">
        <h2 style="font-weight: 400;color: red;float: left;height: 75px">便民服务</h2>
      </div>
      <div style="width: 100%">
      <div style="width: 100%;margin: auto;height: 240px">
        <div style="width: 30%;height: 220px;float: left;margin-left: -83px;border: 1px solid"></div>
        <div style="width: 30%;height: 220px;float: left;margin-left: 50px;border: 1px solid"></div>
        <div style="width: 30%;height: 220px;float: left;margin-left: 50px;border: 1px solid"></div>
      </div>
      <div style="width: 100%;margin: auto;height: 240px">
        <div style="width: 30%;height: 220px;float: left;margin-left: 13px;border: 1px solid"></div>
        <div style="width: 30%;height: 220px;float: left;margin-left: 50px;border: 1px solid"></div>
        <div style="width: 30%;height: 220px;float: left;margin-left: 50px;border: 1px solid"></div>
      </div>
    </div>
    </div>
    </div>
    <div id="back4" style="width:100%;margin: auto;height: 555px">
      <div style="width: 75%;margin: auto;height: 75px">
        <h2 style="font-weight: 400;color: purple;float: left;height: 75px">负责人介绍</h2>
      </div>
      <div style="width: 75%">
      <div style="width: 100%;margin: auto;height: 389px">
        <div style="width: 23%;height: 380px;float: left;border: 1px solid;margin-left: -54px"></div>
        <div style="width: 23%;height: 380px;float: left;border: 1px solid;margin-left: 55px"></div>
        <div style="width: 23%;height: 380px;float: left;border: 1px solid;margin-left: 55px"></div>
      </div>
        <div style="width: 100%;height: 20px">
          <h3 style="color: red;">以上是各职能负责人及其联系方式，如有问题可致电咨询，请勿骚扰，谢谢</h3>
        </div>
    </div>
    </div>
      <div style="background-color: black;width: 100%">
        <div style="margin: auto">
          <img src="../assets/index/buttom.png" width="75%"></img>
        </div>
      </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import ElImage from "../../node_modules/element-ui/packages/image/src/main";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElLink from "../../node_modules/element-ui/packages/link/src/main";
  export default {
    components: {
      ElLink,
      ElButton,
      ElImage},
    name: 'HelloWorld',
    data () {
      return {
        pics:[
          {src:require('../assets/index/lunbo1.jpg')},
          {src:require('../assets/index/lunbo2.jpg')},
          {src:require('../assets/index/lunbo3.jpg')},
          {src:require('../assets/index/lunbo4.jpg')},
          {src:require('../assets/index/lunbo5.jpg')},
          {src:require('../assets/index/lunbo6.jpg')},
          {src:require('../assets/index/lunbo7.jpg')}
        ],
        fuwus:[
          {src:require('../assets/index/fuwu1.png')},
          {src:require('../assets/index/fuwu2.png')},
          {src:require('../assets/index/fuwu3.png')},
          {src:require('../assets/index/fuwu4.png')},
          {src:require('../assets/index/fuwu5.png')}
        ],
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      login:function () {
          this.$router.push({path:'/login'})
      }
    }
  }
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  #back1{
    background-image: url("../assets/index/back1.jpg");
  }
  #back2{
    background-image: url("../assets/index/back5.jpg");
  }
  #back3{
    background-image: url("../assets/index/back4.jpg");
  }
  #back4{
    background-image: url("../assets/index/back6.jpg");
  }
</style>
