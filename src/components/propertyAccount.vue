<template>
  <div style="width: 100%">
    <el-input type="text" v-model="params.searchInput"placeholder="输入用户关键信息"
              style="width: 300px;margin-top: 30px;"></el-input>
    <el-button style="width: 70px;text-align: center;margin-left: -4px;
    margin-top: -40px;margin-bottom: 5px" type="primary" @click="search()">搜索</el-button>

    <el-table
      :data="user"
      style="width: 100% ;font-size: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="userId"
        label="业主序号"
        width="360"
        align="center"
        v-if="show"
      >
      </el-table-column>

      <el-table-column
        prop="realName"
        label="业主姓名"
        width="360"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="tel"
        label="手机号码"
        width="360"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="build"
        label="所在单元"
        width="360"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="money"
        label="账户余额(元)"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
      label="操作"
      width="343"
      align="center"
      >
        <template slot-scope="user">
          <el-button type="primary" round @click="toUpdateUser(user.row.userId)">修改</el-button>
      <el-button type="primary" round @click="levyFees(user.row.userId)">催费</el-button>
      <el-button type="danger" round @click="delUser(user.row.userId)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <br/>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="this.params.size"
      v-on:current-change="changePage"
      :total="total"
      :current-page="this.params.page"
      >
    </el-pagination>
    <el-button  type="primary" round style="font-size: 15px;margin-top: 20px;" @click="insertUser()">新增用户</el-button>
  </div>


</template>
<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},
    data() {
      return {
        user:[],
        total:'',
        params: {
          page: '1',
          size: '10',
          searchInput:''
        }
      }
    },

    mounted(){
      this.search();
    },
    methods:{
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      changePage:function (page) {
        this.params.page=page
        this.search();
      },
      search:function () {
        var url = '/api/findUserAccount'
        console.log(this.params)
        axios.post(url,{currentPage:this.params.page,pageSize:this.params.size,keywords:this.params.searchInput}).then(res => {
            if(res.data=="未登录"){
                alert("您好，请登录")
              this.$router.push({path:'/login'})
            }else{
              this.user = res.data.userAccounts;
              this.total=res.data.total;
            }
        })
      },
      levyFees:function(){
          var url='api/warnJob'
          axios.post(url).then(res=>{
            if(res.data=="未登录"){
              alert("您好，请登录")
              this.$router.push({path:'/login'})
            }else{
              if (res.data=="success"){
                alert("催费提醒短信发送成功")
              }
            }
          })
      },
      delUser:function (id) {
        var url='api/removeMaster'
        alert(id)
        axios.post(url,{id:id}).then(res=>{
            if(res.data=="未登录"){
                alert("请您登陆")
              this.$router.push({path:'/login'})
            }
            if(res.data=="success"){
                alert("已清空用户")
              this.search();
            }
        })

      },
      toUpdateUser:function (id) {

        this.$router.push({path: 'updateUserMessage/' + id})
      },
      insertUser:function () {
        this.$router.push({path:'insertUserMessage'})
      }
    }
  }

</script>
