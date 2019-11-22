<template>
  <!--<div style="width: 100%;height:6000px;margin: auto;background-color: yellow;margin-top: -50px">-->
  <div  style="width: 100%;height:100%;opacity:93%">
    <div style="width: 100%;height: 30%;margin-top: 30px">
      <div style="width: 94%;margin: auto;height: 10%">
        <img src="../assets/pay/wallet.png" style="float: left">
        <h3 style="float: left;line-height: 35px">我的钱包</h3><br>
      </div>
      <div style="height: 20%;width: 80%;margin-top: 45px">
        <!--<el-button @click="checkpassword()" style="float: left">查看余额</el-button>-->
        <el-button @click="queryMoney()" style="float: left">查看余额</el-button>
      </div>
      <div style="height: 20%;width: 80%;margin-top: 45px">
        <el-button @click="pay()" style="float: left">充值</el-button>
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
    mounted(){
//      this.queryMoney();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      pay:function () {
        var url ='api/propertypay'
        axios.post(url).then(res=>{
          if(res.status==200) {
            let routerData = this.$router.resolve({path: '/ApplyText', query: {htmls: res.data}})
            this.htmls = res.data
            window.open(routerData.href, '_blank')
            const div = document.createElement('div');
            div.innerHTML = htmls;
            document.body.appendChild(div);
            document.forms[0].submit();
          }
        })
      },
      checkpassword:function () {
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
         inputType:'password',
//          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
//          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          var url = 'api/checkUserPassword'
          axios.post(url,{password:value}).then(res=>{
              if(res=='error'){
                this.$message.error('密码错误');
              }else{
                  this.queryMoney();
              }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      queryMoney:function () {
        var url = 'api/getUserMoney'
        axios.post(url,{userId:this.$parent.user.userId}).then(res=>{
            this.$alert('您的余额为：'+res.data);
        })
      }
    }
  }
</script>
<style>

</style>
