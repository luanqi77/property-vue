<template>
  <div class="loginBox">
    <div class="loginsun">
      <el-row class="boxsmf">
        <el-col class="boxsmfright" :span="24">
          <div class="grid-content bg-purple-light">
            <div class="losid">
              <p>注册</p>
            </div>
            <ul class="inputbox">
              <li>
                <label>账号:</label>
                <input
                  v-model="nameid"
                  class="logInput"
                  type="text"
                  placeholder="请输入账号"
                  @focus="inp($event)"
                  @blur="inb($event);inpname($event);checkname($event)"
                />
              </li>
              <li>
                <label>密码:</label>
                <input
                  v-model="passid"
                  class="logInput"
                  type="password"
                  placeholder="请输入账号"
                  @focus="inp($event)"
                  @blur="inb($event)"
                />
              </li>
              <li>
                <label>手机号:</label>
                <input
                  v-model="phoneid"
                  class="logInput"
                  type="number"
                  placeholder="请输入预留手机号"
                  @focus="inp($event)"
                  @blur="inb($event);ong($event)"
                />
              </li>
              <li>
                <label>验证码:</label>
                <input v-model="yam"
                       class="logInput"
                       type="number"
                       placeholder="请输入密码"
                       @focus="inp($event)"
                       @blur="inb($event)"
                />
                <button class="seton" @click="second">发送验证码</button>
              </li>
            </ul>
            <button type="submit" class="loginBtn" @click="denglu">注册</button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

  import axios from 'axios'
  //import wx from "weixin-js-sdk";
  import {Loading} from "element-ui";
  //import lginjs from "./../assets/js/login.js";
  // import wx from "./../assets/js/wx.js";
  export default {
    name: "login",
    data() {
      return {
        nameid: '',
        passid: '',
        phoneid: '',
        yam: '',
      };
    },

    beforeCreate() {
      let loadingInstance = Loading.service({
        text: "请稍等"
      });
      setTimeout(function () {
        loadingInstance.close();
      }, 1000);
    },
    methods: {
      denglu: function (event) {
        var url = 'api/regist'
        const that = this;
        axios.post(url, {
          username: this.nameid,        // 参数 firstName
          password: this.passid,    // 参数 lastName
          tel: this.phoneid,
          code: this.yam
        })
          .then(function (response) {
//            loadingInstance.close();
            //跳转用户页面
            if (response.data == '注册成功！') {
//              console.log(response);
            alert(response.data)
              that.$router.push({path : 'login'})

            }else {
                alert("注册失败")
            }


          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(this.nameid, this.passid, this.phoneid, this.yam)
      },

      inp: function (event) {
        var input = event.srcElement;
        input.parentNode.style.borderBottom = "1px solid red";
        input.parentElement.firstChild.style.color = "rgba(1,197,140,.7)";
      },
      inb: function (event) {
        var input = event.srcElement;
        input.parentNode.style.borderBottom = "1px solid #C5C6D3";
        input.parentElement.firstChild.style.color = "rgba(85,94,122,1)";
      },
      ong : function(event){
        var phoneid =this.phoneid;
        var url = 'api/checkTel'
        axios.post(url, {
          tel: phoneid
        })
          .then(function (response) {
//            loadingInstance.close();
            //跳转用户页面
            if(response.data == 'succeed'){
              console.log(response);
            }else{
              alert('请输入预留的手机号')
            }
            console.log(response);

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      checkname : function(event){
        var nameid =this.nameid;
        var url = 'api/checkName'
        axios.post(url, {
          username: nameid
        })
          .then(function (response) {
//            loadingInstance.close();
            //跳转用户页面
            if(response.data == 'succeed'){

              alert('此用户名已存在')
            }else{
              console.log(response);
            }
            console.log(response);

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      inpname: function (event) {
        var nameid = this.nameid;
        if (nameid) {
//             axios.get('checkTel',{
//                params: {
//                id: nameid
//            },
//            })
//            .then(function (value) {
//                console.log(value);
//            })
//            .catch(function (reason) {
//                console.log(reason);
//            })
        } else {
          alert('不能为空')
        }
      },
     /* inps: function (event) {
        var phones = this.phoneid;
        var nameid = this.nameid;
        var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if (TEL_REGEXP.test(phones)) {
//             axios.get('http://localhost:8080/user/findById?id=1')
//            .then(function (value) {
//                console.log(value);
//            })
//            .catch(function (reason) {
//                console.log(reason);
//            })
        } else {
          alert('手机号错误，请重新输入手机号')
        }
      },*/
      second: function (event) {
        var phone = this.phoneid
        var seton = document.getElementsByClassName("seton")[0];
        var countdown = 30;
        var sec = event.srcElement;
        if (countdown == 0) {
          sec.innerText = "点击获取验证码";
          countdown = 30;
        } else {
          var url = 'api/sendTelMessage'
          axios.post(url, {
            tel: phone
          })
            .then(function (response) {
//            loadingInstance.close();
              //跳转用户页面
              console.log(this.phoneid);

            })
            .catch(function (error) {
              console.log(error);
            });
          var timer = setInterval(function (event) {

            sec.innerText = countdown + "s";
            countdown--;
            if (countdown == -1) {
              sec.innerText = "点击获取验证码";
              clearTimeout(timer);
            }
          }, 1000);
        }
      }
    }
  };
</script>
<style scoped>
  .loginBox {
    position: absolute;
    background-image: url(../assets/loginImg/true.jpg);
    width: 100%;
    height: 100%;
  }

  .loginsun {
    width: 7rem;
    height: 6rem;
    background: #ffffff;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .seton {
    width: 1rem;
    height: 0.5rem;
  }

  .boxsmf {
    height: 100%;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
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
    justify-content: center;
  }

  .losid p {
    width: 50%;
    text-align: center;
    font-size: 0.2rem;
    margin: 0;
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
