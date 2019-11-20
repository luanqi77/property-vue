<template>
  <div class="loginBox">
    <div class="loginsun">
      <el-row class="boxsmf">
        <el-col class="boxsmfleft" :span="12">
          <div class="grid-content bg-purple">
            <p>LOGO</p>
            <span>Welcome</span>
            <i id="ima">{{ mes }}</i>
          </div>
        </el-col>
        <el-col class="boxsmfright" :span="12">
          <div class="grid-content bg-purple-light">
            <p>欢迎登录</p>
            <div class="losid">
              <span @click="diszh">账号登陆</span>
              <span @click="disew">微信扫码登录</span>
            </div>
            <ul class="inputbox">
              <li>
                <label>账号:</label>
                <input v-model="names"
                  class="logInput"
                  type="text"
                  placeholder="请输入账号"
                  @focus="inp($event)"
                  @blur="inb($event)"
                />
              </li>
              <li>
                <label>密码:</label>
                <input v-model="passw"
                  class="logInput"
                  type="password"
                  placeholder="请输入密码"
                  @focus="inp($event)"
                  @blur="inb($event)"
                />
              </li>
              <li>
                <el-radio v-model="radio" label="2">用户</el-radio>
                <el-radio v-model="radio" label="1">员工</el-radio>

              </li>
            </ul>
            <button class="loginBtn" @click="denglu">登录</button>
            <div class="forBox">
              <a class="zhuce" href="#" @click="zhuce">注册</a>
              <a class="forget" href="#" @click="wjmi">忘记密码</a>
            </div>

            <div id="qrcode" ref="qrCodeDiv">
              <img :src="src1" alt="" id="iforms" style="width: 100%;height:100%">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
<!--    <div class="popupBox" style="display:none">
      <p>二维码扫描失败</p>
      <p>此微信未绑定或未注册，请选择</p>
      <div class="btns" @click="binding">已有账号，进行绑定</div>
      <br>
      <div class="btns" @click="zhuce">未注册，进行注册</div>
    </div>-->
  </div>
</template>
<script>
  //import '@/assets/css/base.css';
//  import $ from "jquery";
//  import wx from "weixin-js-sdk";
  import axios from 'axios'
  import { Loading } from "element-ui";
//  import { radio } from "element-ui";
//  import lginjs from "./../assets/js/login.js";
  // import wx from "./../assets/js/wx.js";
  export default {
    name: "login",
    data() {
      return {
        radio: '2',
        mes: "欢迎巨翔物业",
        names : '',
        passw : '',
        src1:''
      };
    },
   /* mounted(){
     var url = "api/findSession"
      axios.get(url).then(res=>{
        if(res.data!=null){
            alert(res.data)
//          this.$router.push({path:'/userinfo'})
        }
      })
    },*/
    created() {
      console.log("创建中");
    },
    beforeCreate() {
      let loadingInstance = Loading.service({
        text: "请稍等"
      });
      setTimeout(function() {
        loadingInstance.close();
      }, 1000);
    },
    methods: {
      denglu: function(event) {

        if(this.radio == 2){
          let loadingInstance = Loading.service({
            text: "请稍等"
          });
          var url='api/userLogin'
          const that = this;
          axios.post(url, {
            username: this.names,        // 参数 firstName
            password: this.passw    // 参数 lastName
          })
            .then(function (response) {
              if(response.data == 'succeed'){
                loadingInstance.close();
                that.$router.push({path : '/userinfo'})

              }else{
                loadingInstance.close();
                  alert('账号或密码错误')
              }

            }).catch(function (error) {
              console.log(error);
            });

        }else{
//          var url='api/userLogin'
//          const that = this;
//          axios.post(url, {
//            username: this.names,        // 参数 firstName
//            password: this.passw    // 参数 lastName
//          })
//            .then(function (response) {
//              if(response.data == 'succeed'){
//                loadingInstance.close();
//                that.$router.push({path : '/'})
//
//              }else{
//                loadingInstance.close();
//                alert('账号或密码错误')
//              }
//
//            }).catch(function (error) {
//            console.log(error);
//          });
          var url='api/StaffLogin'
          const that = this;
          axios.post(url, {
            staffNumber: this.names,        // 参数 firstName
            password: this.passw    // 参数 lastName
          })
            .then(function (response) {
              if(response.data == 'success'){
                that.$router.push({path:"staffMain/staffMessage"})

              }else{
                alert('账号或密码错误')
              }

            }).catch(function (error) {
            console.log(error);
          });
        }

      },
      zhuce : function(){
        this.$router.push("/userReister");
      },
      wjmi : function (){
        this.$router.push("/getword");
      },
      inp: function(event) {
        var input = event.srcElement;
        input.parentNode.style.borderBottom = "1px solid red";
        input.parentElement.firstChild.style.color = "rgba(1,197,140,.7)";
      },
      inb: function(event) {
        var input = event.srcElement;
        input.parentNode.style.borderBottom = "1px solid #C5C6D3";
        input.parentElement.firstChild.style.color = "rgba(85,94,122,1)";
      },
      diszh: function(event) {
        var inputbox = document.getElementsByClassName("inputbox")[0];
        var loginBtn = document.getElementsByClassName("loginBtn")[0];
        var forget = document.getElementsByClassName("forBox")[0];
        var qrcode = document.getElementById("qrcode");
        inputbox.style.display = "block";
        loginBtn.style.display = "block";
        forget.style.display = "block";
        qrcode.style.display = "none";
      },
      disew: function(event) {
        var inputbox = document.getElementsByClassName("inputbox")[0];
        var loginBtn = document.getElementsByClassName("loginBtn")[0];
        var forget = document.getElementsByClassName("forBox")[0];
        var qrcode = document.getElementById("qrcode");
        inputbox.style.display = "none";
        loginBtn.style.display = "none";
        forget.style.display = "none";
        qrcode.style.display = "block";
        var url = "api/weixinLogin"
        var iforms = document.getElementById('iforms');
//        console.log(iforms.src)
        axios.get(url)
          .then(function (response) {
//              alert(response.data)

            iforms.src = response.data
//            window.location.href(response.data)
//              console.log(response.data)


//              console.log(response.data)
//            this.src1 = response.data
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };
</script>
<style scoped>

  .loginBox {
    position: absolute;
    background-image: url(../assets/loginImg/true.jpg );
    width: 100%;
    height: 100%;
  }
  .loginsun {
    width: 12.8rem;
    height: 8rem;
    background: #ffffff;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
  .boxsmf {
    height: 100%;
  }
  .boxsmfleft {
    height: 100%;
    background: #182545;
    text-align: center;
  }
  .boxsmright {
    height: 100%;
    background: #ffffff;
    text-align: center;
    margin-left: 1.56rem;
    margin-right: 0.82rem;
  }
  .bg-purple {
    height: 100%;
  }

  .boxsmfleft p {
    font-size: 1.08rem;
    font-weight: 100;
    color: #cfcfcf;
    font-family: Segoe UI;
    margin-top: 1.36rem;
  }
  .boxsmfleft span {
    font-size: 0.36rem;
    font-family: Segoe UI;
    font-weight: 300;
    line-height: 48px;
    color: rgba(207, 207, 207, 1);
    margin-top: 0.42rem;
  }
  .boxsmfleft i {
    display: block;
    font-size: 0.24rem;
    font-family: Segoe UI;
    line-height: 32px;
    color: rgba(207, 207, 207, 1);
    margin-top: 0.12rem;
  }
  .boxsmfright p {
    font-size: 0.6rem;
    font-family: PingFang SC;
    line-height: 84px;
    color: rgba(24, 37, 69, 1);
    font-weight: 300;
    margin-top: 1rem;
    text-align: center;
    margin-bottom: 0.7rem;
  }
  .bg-purple-light {
    margin-left: 1.56rem;
    margin-right: 0.82rem;
  }
  .inputbox li {
    display: -webkit-flex;
    width: 100%;
    border-bottom: 1px solid #c5c6d3;
    margin-top: 0.2rem;
  }
  .inputbox li label {
    width: 1rem;
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34px;
    color: rgba(85, 94, 122, 1);
    line-height: 0.5rem;
  }
  .inputbox li input {
    width: 70%;
    border: 0;
    line-height: 0.5rem;
  }
  input::-webkit-input-placeholder {
    color: #c5c6d3;
    font-size: 0.16rem;
  }
  .loginBtn {
    width: 100%;
    line-height: 0.6rem;
    border-radius: 0.3rem;
    background: #182545;
    border: 0;
    outline: none;
    margin-top: 0.38rem;
    color: #ffffff;
    font-size: 0.2rem;
  }
  .forget {
    font-size: 0.12rem;
    color: #182545;
    float: right;
    margin-top: 0.36rem;
  }
  .zhuce {
    font-size: 0.12rem;
    color: #182545;
    float: left;
    margin-top: 0.36rem;
  }
  .losid {
    width: 100%;
    display: -webkit-flex;
    justify-content: space-between;
    padding-bottom: 0.2rem;
  }
  .losid span {
    width: 50%;
    text-align: center;
    font-size: 0.2rem;
    line-height: 0.5rem;
    border-radius: 0.2rem;
  }
  .losid span:hover {
    background: rgba(207, 207, 207, 1);
  }
  #qrcode {
    width: 3rem;
    height: 3rem;
    margin-left: .6rem;
    display: none;
  }
  .popupBox{
    position: fixed;
    background: #ffffff;
    z-index: 9;
    top: 30%;
    text-align: center;
    padding: .5rem 2rem;
    margin-left: 30%;
    border-radius: .2rem;
  }
  .popupBox p:nth-child(1){
    font-size: .18rem;
    color: #182545;
    line-height: .7rem;
  }
  .popupBox p:nth-child(2){
    font-size: .16rem;
    color: aqua;
    line-height: .7rem;
  }
  .popupBox .btns{
    padding:0 2rem;
    text-align: center;
    height: .5rem;
    line-height: .5rem;
    background: #182545;
    margin-bottom: .1rem;
    color: #cfcfcf;
    border-radius: .1rem
  }

</style>
<style>
  body,
  dl,
  dd,
  ul,
  ol,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  form,
  input,
  textarea,
  p,
  hr,
  thead,
  tbody,
  tfoot,
  th,
  td,
  p {
    margin: 0;
    padding: 0;
  }

  ul,
  ol,
  li,
  ul li,
  ul ol {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  html {
    -ms-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }

  body {
    line-height: 1.5;
    font-size: 14px;
  }

  body,
  button,
  input,
  select,
  textarea {
    font-family: PingFang SC, 'helvetica neue', tahoma, 'hiragino sans gb', stheiti, 'wenquanyi micro hei', \5FAE\8F6F\96C5\9ED1, \5B8B\4F53, sans-serif;
  }

  b,
  strong {
    font-weight: bold;
  }

  i,
  em {
    font-style: normal;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  table th,
  table td {
    border: 1px solid #ddd;
    padding: 5px;
  }

  table th {
    font-weight: inherit;
    border-bottom-width: 2px;
    border-bottom-color: #ccc;
  }

  img {
    border: 0 none;
    width: auto\9;
    max-width: 100%;
    vertical-align: top;
    height: auto;
  }

  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    margin: 0;
    vertical-align: baseline;
  }

  button,
  html input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    -webkit-appearance: button;
    cursor: pointer;
  }

  button[disabled],
  input[disabled] {
    cursor: default;
  }

  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  input[type="search"] {
    -webkit-appearance: textfield;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  }

  input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  input:focus {
    outline: none;
  }

  select[size],
  select[multiple],
  select[size][multiple] {
    border: 1px solid #AAA;
    padding: 0;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  nav,
  section,
  summary {
    display: block;
  }

  audio,
  canvas,
  video,
  progress {
    display: inline-block;
  }

  body {
    background: #ffffff;
  }

  input::-webkit-input-speech-button {
    display: none
  }

  button,
  input,
  textarea {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .hidden {
    display: none
  }

  @media only screen and (min-width: 1522px) {
    html {
      font-size: 100px;
    }
  }

  @media only screen and (max-width: 1521px) {
    html {
      font-size: 80px;
    }
  }

  @media only screen and (max-width: 1300px) {
    html {
      font-size: 64px;
    }
  }

  @media only screen and (max-width: 996px) {
    html {
      font-size: 48px;
    }
  }

</style>
