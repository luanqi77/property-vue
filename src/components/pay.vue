<template>
  <!--<div style="width: 100%;height:6000px;margin: auto;background-color: yellow;margin-top: -50px">-->
  <div  style="width: 100%;height:100%;opacity:93%">
    <div style="width: 100%;height: 30%;margin-top: 30px">
      <div style="width: 94%;margin: auto;height: 10%">
        <img src="../assets/pay/wallet.png" style="float: left">
        <h3 style="float: left;line-height: 35px">我的钱包</h3><br>
      </div>
      <div style="height: 20%;width: 80%;margin-top: 45px">
        <el-button @click="checkpassword()" style="float: left">查看余额</el-button>
      </div>
    </div>
    <div style="width: 100%;height: 70%">

    </div>

  </div>
</template>
<script>
  import axios from 'axios'
  import ElImage from "../../node_modules/element-ui/packages/image/src/main";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElMenu from "../../node_modules/element-ui/packages/menu/src/menu";
  import ElLink from "../../node_modules/element-ui/packages/link/src/main";
  export default {
    components: {
      ElButton,
      ElLink,
      ElMenu},
    data() {
      return {
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      checkpassword:function () {
//        var
      }
    }
  }
</script>
<style>

</style>
