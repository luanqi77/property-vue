<template>
  <div style="width: 100%;height: 600px;margin: auto">
  <div style="margin: auto">
    <el-table :data="board" stripe style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-table-column
        prop="boardId"
        label="编号"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="boardDeso"
        label="公告描述"
        width="755"
        align="center">
      </el-table-column>
      <el-table-column
        prop="boardTime"
        label="公告时间"
        :formatter="dateFormat"
        width="240"
        align="center">
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级"
        align="center">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="250"
        align="center">
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="board">
          <el-button type="primary"  round @click="updateBoard(board.row.boardId)">修改</el-button>

          <el-button type="danger"  round @click="deleteBoard(board.row.boardId)">删除</el-button>

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
      <!--<el-button type="success" icon="el-icon-check" circle @click="insertBoard()"></el-button>-->
      <el-button type="success" round @click="insertBoard()">新增</el-button>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        board: [],
        params:{
          page:'1',
          size:'4',
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
        var url = 'api/findAllBoardBypage/'+this.params.page+"/"+this.params.size
        axios.get(url).then(res =>{
          if(res.data=="未登录"){
            alert("您好，请登录")
            this.$router.push({path:'/login'})
          }
          if (res.data=="权限不足"){
            alert(res.data)
            this.$router.push({path:'/staffMain/noPermission'})
          }
          this.board = res.data.list;
          this.total=res.data.total;
        })
      },
      changePage: function (page) {
        this.params.page = page
        this.query();

      },
      updateBoard: function (boardId) {
        this.$router.push({path: '/updateBoard/' + boardId})
      },
      insertBoard:function (){
        this.$router.push({path:'/insertBoard'})
      },
      deleteBoard:function (boardId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '成功',
          });
          var url = 'api/deleteBoard'
          axios.post(url,{boardId:boardId}).then(res=>{
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

      },
      dateFormat:function(row,column){
        var t=new Date(row.boardTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
      },
    }
  }
</script>

