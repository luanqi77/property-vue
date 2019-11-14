<template>
  <div style="margin-top: -60px">
    <div style="width: 100%;margin: auto;height: 100px;background-color: #F2F6FC">
      <div style="width: 30%;float: left;margin-left: -10px">
        <img src="../assets/index/logo1.png" width="60%"></img>
      </div>
      <!--<el-input type="text" v-model="searchInput"placeholder="输入用户关键信息" style="width: 300px;margin-left: -800px"></el-input>-->
      <!--<el-button style="width: 70px;text-align: center;margin-left: -4px;margin-top: -40px" @click="search()">搜索</el-button>-->
      <span style="margin-left: 250px;font-size: 18px">{{staffName}},您好</span>
      <el-button  round style="font-size: 15px;margin-left: 40px;margin-top: 25px;" @click="loginout()">注销</el-button>
      <el-button  round style="font-size: 15px;margin-right: -500px;margin-top: 25px;" @click="staffInfo()">个人信息</el-button>

    </div>
    <el-container style="height: 900px; border: 1px solid #eee; width: 100%">
    <div style="float: left">
      <el-aside width="220px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '6']">
          <el-submenu index="1">
            <template slot="title" ><i class="el-icon-user-solid"></i>权限管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1"><router-link  to="/staffMain/viewStaff">查看员工</router-link></el-menu-item>
              <!--<el-menu-item index="1-2"><router-link  to="/staffMain/permissionAssignment">职责分配</router-link></el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>财务管理</template>
              <el-menu-item-group>
                <el-menu-item index="2-1"><router-link  to="/staffMain/propertyAccount">业主账户</router-link></el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="2-2"><router-link  to="/staffMain/deduct">扣费设置</router-link></el-menu-item>
              </el-menu-item-group>
          </el-submenu>
            <el-submenu index="3">
            <template slot="title"><i class="el-icon-warning"></i>投诉建议</template>
            <el-menu-item-group>
              <el-menu-item index="3-1"><router-link  to="/staffMain/replyAdvise">查看投诉</router-link></el-menu-item>
              <el-menu-item index="3-2"><router-link  to="/staffMain/myReply">我的回复</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-phone"></i>报修处理</template>
            <el-menu-item-group>
              <el-menu-item index="4-1"><router-link  to="/staffMain/selectApply">查看处理</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-document"></i>操作记录</template>
            <el-menu-item-group>
              <el-menu-item index="5-1"><router-link  to="/staffMain/selectOperate">历史操作</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-wind-power"></i>网站维护</template>
            <el-menu-item-group>
              <el-menu-item index="6-1"><router-link  to="/staffMain/addBoard">社区公告</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="6-2"><router-link  to="/staffMain/addInformation">便名服务</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-truck"></i>车位信息</template>
            <el-menu-item-group>
              <el-menu-item index="7-1"><router-link  to="/staffMain/manageParking">管理车位</router-link></el-menu-item>
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
          staffName:''
        }
      },

      mounted(){
       var url="api/getStaffName"
        axios.get(url).then(res=>{
            this.staffName=res.data;
        })
        this.staffName="张三"
      },
    methods:{
      loginout:function () {
        const h = this.$createElement;
        this.$notify({
          title: '注销成功',
          message: '自动返回主页',
          type: 'success'
        });
        this.$router.push({path:"/index"})
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
