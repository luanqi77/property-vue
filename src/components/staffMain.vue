<template>
  <div style="">
    <div style="width: 100%;margin: auto;height: 110px;background-color: rgb(238, 241, 246)">
      <div style="width: 30%;float: left;margin-left: 0px">
        <img src="../assets/index/logo1.png" width="60%"></img>
      </div>
      <!--<el-input type="text" v-model="searchInput"placeholder="输入用户关键信息" style="width: 300px;margin-left: -800px"></el-input>-->
      <!--<el-button style="width: 70px;text-align: center;margin-left: -4px;margin-top: -40px" @click="search()">搜索</el-button>-->
      <span style="margin-left: 300px;font-size: 18px">{{Staff.staffName}},您好</span>
      <el-button type="danger" round style="font-size: 15px;margin-left: 40px;margin-top: 35px;" @click="loginout()">注销</el-button>
      <el-button type="primary" round style="font-size: 15px;margin-right: -600px;margin-top: 35px;" @click="staffInfo()">个人信息</el-button>

    </div>
    <div style="width: 100%; ">
    <el-container style="height: 800px; border: 1px solid #eee; width: 100%">
    <div style="float: left;">
      <el-aside width="250px" style="background-color: rgb(238, 241, 246);height: 800px">
        <el-menu :default-openeds="['1', '8']">
          <el-submenu index="1">
            <template slot="title"><router-link  to="/staffMain/propertyAccount"><i class="el-icon-office-building"></i>业主信息</router-link></template>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-phone"></i>报修处理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1"><router-link  to="/staffMain/selectApply">未处理</router-link></el-menu-item>
              <el-menu-item index="2-2"><router-link  to="/staffMain/selectApplied">已处理</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><router-link  to="/staffMain/parkingSpaces"><i class="el-icon-truck"></i>车位管理</router-link></template>
          </el-submenu>


            <el-submenu index="4">
            <template slot="title"><i class="el-icon-warning"></i>投诉建议</template>
            <el-menu-item-group>
              <el-menu-item index="4-1"><router-link  to="/staffMain/replyAdvise">查看投诉</router-link></el-menu-item>
              <el-menu-item index="4-2"><router-link  to="/staffMain/myReply">我的回复</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title"><router-link  to="/staffMain/deduct"><i class="el-icon-menu"></i>费用管理</router-link></template>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title" ><router-link  to="/staffMain/viewStaff"><i class="el-icon-user-solid"></i>员工管理</router-link></template>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title"><router-link  to="/staffMain/selectOperate"><i class="el-icon-document"></i>操作记录</router-link></template>
          </el-submenu>

          <el-submenu index="8">
            <template slot="title"><i class="el-icon-wind-power"></i>网站维护</template>
            <el-menu-item-group>
              <el-menu-item index="8-1"><router-link  to="/boardList">社区公告</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="8-2"><router-link  to="/InformationList">便名服务</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </div>
      <div style="float: left">
        <router-view/>


      </div>
    </el-container>
    </div>
  </div>

</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    height: 900px;
  }
  .el-menu-item{
    margin-top: -10px;
    margin-left: 20px;
  }
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
</style>
<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  export default{
    components: {
      ElInput,
      ElButton},
    data() {
        return {
          searchInput:'',
          Staff:{
            staffName:''
          }
        }
      },

      mounted(){
       var url="api/getCurrentStaff"
        axios.get(url).then(res=>{
            this.Staff=res.data;
            console.log(res.data)
        })
      },
    methods:{
      loginout:function () {
        var url='api/StaffLogout'
        axios.post(url).then(res=>{
            if(res.data=="success"){
              const h = this.$createElement;
              this.$notify({
                title: '注销成功',
                message: '自动返回主页',
                type: 'success'
              });
              this.$router.push({path:"/index"})
            }else {
              this.$router.push({path:"/index"})
            }
        })
      },
      search:function () {
        if (this.searchInput == '') {
          alert('请输入搜索关键字')
        }else {
            var searchInput=this.searchInput;
          this.$router.push({path:"/searchUser/"+searchInput})
        }
      },
      staffInfo:function () {
        this.$router.push({path:"/staffMain/staffInfo"})
      }
    }
  }

</script>
