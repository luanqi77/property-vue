<template>
  <div style="width: 100%;height: 600px;margin: auto">
    <div style="margin-left: 10px;margin-top: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
        <el-breadcrumb-item :to="{ path: '/staffMain/staffMessage' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>车位管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-left:550px;margin-top: 50px">
      <el-table :data="parkingspaces" style="margin: auto;">
        <el-table-column
          prop="userId"
          label="用户ID"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="park_id"
          label="停车位"
          width="100"
          align="center">
        </el-table-column>


        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="parkingspaces">
            <el-button type="primary" round @click="updateParkingSpaces(parkingspaces.row.up_id)">修改</el-button>

            <!--<el-button type="danger" plain @click="deleteInformation(information.row.inid)">删除</el-button>-->

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
        :current-page="this.params.page" style="margin-left: -100px">
      </el-pagination>
    </div>
    <!--<div>-->
      <!--&lt;!&ndash;<el-button type="success" icon="el-icon-check" circle @click="insertInformation()">新增</el-button>&ndash;&gt;-->
      <!--<el-button type="success" plain @click="insertInformation()">新增</el-button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        parkingspaces: [],
        params:{
         page:'1',
          size:'5',
        },
        total:""
      }
    },
    mounted(){
      console.log(this.$router);
      //默认查询页面
      this.query();
    },
    methods:{

      query:function () {
        var url = 'api/findAllParkingSpaces/' +this.params.page+"/"+this.params.size
        axios.get(url).then(res =>{
          if(res.data=="未登录"){
            alert("您好，请登录")
            this.$router.push({path:'/login'})
          }
          if (res.data=="权限不足"){
            alert(res.data)
            this.$router.push({path:'/staffMain/noPermission'})
          }
          this.parkingspaces = res.data.list;
         this.total=res.data.total;
        })
      },
      changePage: function (page) {
        this.params.page = page
        this.query();

      },
      updateParkingSpaces: function (up_id) {
        this.$router.push({path: '/updateParkingSpaces/' + up_id})
      }
//      insertInformation:function (){
//        this.$router.push({path:'/insertInformation'})
//      },
//      deleteInformation:function (inid) {
//        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'warning'
//        }).then(() => {
//          this.$message({
//            type: 'success',
//            message: '成功',
//          });
//          var url = 'api/deleteInformation'
//          axios.post(url,{inid:inid}).then(res=>{
//            this.query();
//          })
//        }).catch(() => {
//          this.$message({
//            type: 'info',
//            message: '已取消删除'
//          });
//        })
//      }
    }
  }
</script>

