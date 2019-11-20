c<template>
  <!--<div style="width: 100%;height:6000px;margin: auto;background-color: red;margin-top: -50px">-->
  <div  id="back" style="width: 100%;height: 900px;padding-top: 50px">
    <div style="width: 80%;height: 800px;margin: auto;opacity:90%;background-color:white;border: inherit 1px solid;box-shadow: 0 0 20px red">
      <div style="width: 24.8%;float: left;height: 800px;border-right: inherit 1px solid;box-shadow: 0 0 20px red">
        <div style="width: 100%;height: 35%;background-color: inherit">
          <img src="../assets/userinfo/exit.png" style="float: left;margin-left: 10px;margin-top: 5px" @click="loginout()"/>
          <!--<el-link @click="loginout()"><img src="../assets/userinfo/exit.png" style="float: left;margin-left: 10px;margin-top: 5px" @click="loginout()"/></el-link>-->
          <div style="width: 100%;height: 75%;padding-top: 20px;margin-left: -10px">
              <el-avatar  :size="200"  :src="user.pic" style="margin: auto"></el-avatar>
          </div>
          <div style="height: 25%;">
            <h3 style="color: black">欢迎您，尊贵的业主</h3>
            <!--{{user.realname}}-->
            <el-divider><i class="el-icon-medal"></i></el-divider>
          </div>
          <div style="height: 60%">
            <div><i class="el-icon-user">&nbsp;&nbsp;&nbsp;{{user.realname}}</i></div><br>
            <div><i class="el-icon-phone-outline">&nbsp;&nbsp;&nbsp;{{user.tel}}</i></div><br>
            <div><i class="el-icon-s-home">&nbsp;&nbsp;&nbsp;入住时间{{user.liveTime.substr(0,10)}}</i></div><br>
            <div><i class="el-icon-message">&nbsp;&nbsp;&nbsp;{{user.email}}</i></div><br>
            <div style="color: blueviolet"><i class="el-icon-s-tools">&nbsp;&nbsp;&nbsp;<router-link to="userupdate">修改个人信息</router-link></i></div>
          </div>
          <div  id="back2" style="height: 110%">
            <h3 style="margin: auto;color: limegreen;position: absolute;top: 590px;left: 345px">合作网站</h3>
            <i class="el-icon-platform-eleme" style="margin-top: 110px;color: deepskyblue">&nbsp;<el-link @click="eleme()">饿了么</el-link></i>
            <i class="el-icon-food" style="margin-top: 80px;color: deepskyblue">&nbsp;<el-link @click="meituan()">美团外卖</el-link></i><br><br>
            <i class="el-icon-shopping-cart-1" style="color: orangered;margin-left: -28px">&nbsp<el-link @click="taobao()">淘宝网</el-link></i>
            <i class="el-icon-goods" style="color: orangered">&nbsp;<el-link @click="jd()">京东</el-link></i><br><br>
            <i class="el-icon-bicycle" style="color: orangered;margin-left: 13px">&nbsp<el-link @click="taobao()">滴滴打车</el-link></i>
            <i class="el-icon-truck" style="color: orangered">&nbsp;<el-link @click="caocao()">曹操专车</el-link></i><br><br>
          </div>
        </div>
      </div>
      <div style="width: 75%;float: right;height: 100%">
    <div style="width:100%;height: 60px">
    <el-menu :default-active="this.$route.path" router mode="horizontal" style="opacity: 93%;background-color: inherit;border: inherit 1px solid;box-shadow: 0 0 20px red">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" style="color: black">
        {{ item.navItem }}
      </el-menu-item>
      <el-input placeholder="请输入资讯、便民服务等关键字进行查询" style="width: 26%;margin-top: 10px"></el-input>
      <el-button style="color: black;background-color: lightblue;margin-left: -4px;width: 90px" @click="search()">搜索</el-button>
    </el-menu>
    </div>
        <div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import ElImage from "../../node_modules/element-ui/packages/image/src/main";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElMenu from "../../node_modules/element-ui/packages/menu/src/menu";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  import ElLink from "../../node_modules/element-ui/packages/link/src/main";
  export default {
    components: {
      ElLink,
      ElButton,
      ElInput,
      ElMenu},
    data() {
      return {
        navList:[
          {name:'/news',navItem:'热点资讯'},
//          {name:'/userdetail',navItem:'个人中心'},
          {name:'/advise/11',navItem:'建议投诉'},
          {name:'/apply/11',navItem:'报修申请'},
          {name:'/myhouse/11',navItem:'我的不动产'},
          {name:'/informations',navItem:'信息服务'},
          {name:'/pay',navItem:'缴费+账单'}
        ],
//        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573706863385&di=48e94a7020d9d2d165ea37a73aee29f3&imgtype=0&src=http%3A%2F%2Fimg.hc360.com%2Fbroadcast%2Finfo%2Fimages%2F200909%2F200909140942522174.jpg',
        user:{
            userId:'',
            username:'',
            realname:'',
//            password:'',
            tel:'',
            pic:'',
            liveTime:'',
            email:''
        }
      }
    },
    mounted(){
      this.show();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      taobao:function () {
        window.location.href = 'https://www.taobao.com';
      },
      eleme:function () {
        window.location.href = 'https://www.ele.me';
      },
      jd:function () {
        window.location.href = 'https://www.jd.com';
      },
      meituan:function () {
        window.location.href = 'https://www.meituan.com';
      },
      didi:function () {
        window.location.href = 'https://www.xiaojukeji.com';
      },
     caocao:function () {
        window.location.href = 'https://www.caocaokeji.cn';
      },
      show:function () {
          this.getUser();
        this.$router.push({path:'/news'})
      },
      getUser:function () {
        var url='api/findSession'
        axios.get(url).then(res=>{
            this.user=res.data
        })
      },
      loginout:function () {
          this.$notify({
            title: '注销成功',
            message: '已返回登录页面',
            type: 'success'
          });
        this.$router.push({path:'/login'})
      }
    }
  }
</script>
<style>
  #back{
    background-image: url("../assets/userinfo/back1.jpg");
  }
  #back2{
    background-image: url("../assets/userinfo/biankuang4.jpg");
  }
  .el-menu.el-menu--horizontal{
    border-bottom:inherit 1px solid;
  }
</style>
