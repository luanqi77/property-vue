<template>
  <div class="loginBox">
    <div class="loginsun">
      <el-row class="boxsmf">
        <el-col class="boxsmfright" :span="24">
          <div class="grid-content bg-purple-light">
            <div class="losid">
              <p>绑定账号</p>
            </div>
            <ul class="inputbox">
              <li>
                <label>账号:</label>
                <input
                  v-model="phoneid"
                  class="logInput"
                  type="text"
                  placeholder="请输入账号"
                  @focus="inp($event)"
                  @blur="inb($event)"
                />
              </li>
              <li>
                <label>预留手机号:</label>
                <input
                  v-model="passid"
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
            <button type="submit"    class="loginBtn" @click="denglu">确认</button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import '@/assets/css/base.css';
  import axios from 'axios'
import { Loading } from "element-ui";
export default {
  name: "login",
  data() {
    return {
      passid : '',
      yam : '',
      phoneid :''
    };
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
    //   var nameid = document.getElementById("nameid").value;
    //   var passid = document.getElementById("passid").value;
    //   var phoneid = document.getElementById("phoneid").value;
    //   var yzm = document.getElementById("yzm").value;

      var yam = this.yam;
      var passid = this.passid;
      var phoneid = this.phoneid;
      var url = 'api/resetPassword'
      axios.post(url, {
          tel: passid,
          code:yam,
          username : phoneid
      })
        .then(function (response) {
          console.log(passid,yam,phoneid)
//            loadingInstance.close();
          //跳转用户页面
          console.log(response);
          if(response.data == 'ok'){
              alert('成功，密码为6个1')
          }else{
            alert('失败')
          }

        })
        .catch(function (error) {
          console.log(error);
        });
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
    ong : function(event){
        var passid =this.passid;
        var url = 'api/checkTel'
      axios.post(url, {
        tel: passid
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
    second: function(event) {
      var seton = document.getElementsByClassName("seton")[0];
      var countdown = 10;
      var sec = event.srcElement;
      if (countdown == 0) {
        sec.innerText = "点击获取验证码";
        countdown = 10;
      } else {
        var passid = this.passid;
        var url = 'api/sendTelMessage'
        axios.post(url, {
         tel: passid
        })
          .then(function (response) {
//            loadingInstance.close();
            //跳转用户页面
            console.log(response);

          })
          .catch(function (error) {
            console.log(error);
          });
        var timer = setInterval(function(event) {
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
    input[type="number"]{
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
  font-size: 0.18rem;
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
