<template>
  <div>
    <div style="margin-top: -60px">
      <div style="width: 100%;margin: auto;height: 100px;background-color: #F2F6FC">
        <div style="width: 30%;float: left;margin-left: -10px">
          <img src="../assets/index/logo1.png" width="60%"></img>
        </div>
        <el-input type="text" v-model="params.searchInput"placeholder="输入用户关键信息" style="width: 300px;margin-left: -800px"></el-input>
        <el-button style="width: 70px;text-align: center;margin-left: -4px;margin-top: -40px" @click="search()">搜索</el-button>
        <span style="margin-left: 250px;font-size: 18px">{{staffName}},您好</span>
        <el-button  round style="font-size: 15px;margin-left: 40px;margin-top: 25px;" @click="loginout()">注销</el-button>
        <el-button  round style="font-size: 15px;margin-right: -1000px;margin-top: 25px; " @click="toStaffMessage()">主页</el-button>

      </div>
    </div>

      <el-table
        :data="user"
        style="width: 100% ;font-size: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
        :row-class-name="tableRowClassName">

        <el-table-column
          prop="realName"
          label="业主姓名"
          width="400"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机号码"
          width="400"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop=""
          label="业主"
          width="400"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop=""
          label="账户余额"
          width="400"
          align="center"
        >
        </el-table-column>
        <!--<el-table-column-->
          <!--label="操作"-->
          <!--width="200"-->
          <!--align="center"-->
        <!--&gt;-->
          <!--<template slot-scope="staff">-->
            <!--<el-button type="primary" plain @click="toUserAnswer(staff.row.staffId)">删除</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->

      </el-table>
      <br/>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="this.params.size"
        v-on:current-change="changePage"
        :total="total"
        :current-page="this.params.page">
      </el-pagination>
  </div>


</template>
<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},

    data() {
      return {

        staffName:'',
        user:[],
        params: {
          page: '1',
          size: '10',
          searchInput:''
        }
      }
    },

    mounted(){
      var url="api/getStaffName"
      axios.get(url).then(res=>{
        this.staffName=res.data;
      })
      this.staffName="张三"
      //查询数据
      this.params.searchInput=this.$route.params.searchInput;
      alert(this.params.searchInput)
      this.search();
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
      toStaffMessage:function () {
        this.$router.push({path:"/staffMain/staffMessage"})
      },
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
          var url = '/api/userFindAll/'
          console.log(this.params)
          axios.post(url,this.params).then(res => {
            this.user = res.data.list;
            this.total=res.data.total;
          })
        },
//        if (this.searchInput == '') {
//          alert('请输入搜索关键字')
//        }else {
//          var searchInput=this.searchInput;
//          alert(searchInput)
//          var url="api/search/";
//
//          this.$router.push({path:"/searchUser/"+searchInput})
//        }

    }
  }

</script>
