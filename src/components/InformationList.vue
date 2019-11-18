<template>
  <div>
  <div>
    <el-table :data="informations" style="width: 100%">
      <el-table-column
        prop="inid"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="300">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="connname"
        label="姓名"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="servername"
        label="服务名称">
      </el-table-column>
      <el-table-column
        prop="company"
        label="公司"
        width="200">
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="information">
          <el-button type="primary" plain @click="updateInformation(information.row.inid)">修改</el-button>

          <el-button type="danger" plain @click="deleteInformation(information.row.inid)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="this.params.size"
      v-on:current-change="changePage"
      :total="total"
      :current-page="this.params.page">
    </el-pagination>
  </div>
  <div>
    <!--<el-button type="success" icon="el-icon-check" circle @click="insertInformation()">新增</el-button>-->
    <el-button type="success" plain @click="insertInformation()">新增</el-button>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        informations: [],
        params:{
            page:'1',
            size:'3',
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
        var url = 'api/findAllInformationBypage/'+this.params.page+"/"+this.params.size
        axios.get(url).then(res =>{
          this.informations = res.data.list;
          this.total=res.data.total;
        })
      },
      changePage: function (page) {
        this.params.page = page
        this.query();

      },
      updateInformation: function (inid) {
        this.$router.push({path: '/updateInformation/' + inid})
      },
      insertInformation:function (){
        this.$router.push({path:'/insertInformation'})
      },
      deleteInformation:function (inid) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '成功',
          });
          var url = 'api/deleteInformation'
          axios.post(url,{inid:inid}).then(res=>{
            this.query();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })

      }
    }
  }
</script>

