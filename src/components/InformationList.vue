<template>
  <div style="width: 100%;height: 600px;margin: auto">
    <div style="margin-left: 10px;margin-top: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
        <el-breadcrumb-item :to="{ path: '/staffMain/staffMessage' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>网站维护</el-breadcrumb-item>
        <el-breadcrumb-item>便名服务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  <div style="margin: auto;margin-top: 5px">
    <el-table :data="informations" stripe style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-table-column
        prop="inid"
        label="编号"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="423"
        align="center">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="connname"
        label="姓名"
        width="100"
        :formatter="dateFormat"
        align="center">
      </el-table-column>
      <el-table-column
        prop="servername"
        label="服务名称"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="company"
        label="公司"
        width="300"
        align="center">
      </el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="information">
          <el-button type="primary" round @click="updateInformation(information.row.inid)">修改</el-button>

          <el-button type="danger" round @click="deleteInformation(information.row.inid)">删除</el-button>

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
      :current-page="this.params.page">
    </el-pagination>
  </div>
    <br/>
  <div>
    <!--<el-button type="success" icon="el-icon-check" circle @click="insertInformation()">新增</el-button>-->
    <el-button type="success" round @click="insertInformation()">新增</el-button>
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
            size:'9',
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
          if(res.data=="未登录"){
            alert("您好，请登录")
            this.$router.push({path:'/login'})
          }
          if (res.data=="权限不足"){
            alert(res.data)
            this.$router.push({path:'/staffMain/noPermission'})
          }
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
            if(res.data=="未登录"){
              alert("您好，请登录")
              this.$router.push({path:'/login'})
            }
            if (res.data=="权限不足"){
              alert(res.data)
              this.$router.push({path:'/staffMain/noPermission'})
            }
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

