<template>
  <div style="width: 80%;height: 600px;margin: auto">
    <div style="margin-left:400px;width: 100%">
      <el-table :data="parkingspaces" style="width: 1500px;margin: auto">
        <el-table-column
          prop="userId"
          label="用户ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="park_id"
          label="停车位"
          width="100">
        </el-table-column>


        <el-table-column label="操作" width="180">
          <template slot-scope="parkingspaces">
            <el-button type="primary" plain @click="updateParkingSpaces(parkingspaces.row.up_id)">修改</el-button>

            <!--<el-button type="danger" plain @click="deleteInformation(information.row.inid)">删除</el-button>-->

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="this.params.size"
        v-on:current-change="changePage"
        :total="total"
        :current-page="this.params.page" style="margin-left: -1250px">
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
          size:'10',
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

