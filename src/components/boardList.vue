<template>
  <div style="width: 80%;height: 600px;margin: auto">
  <div style="margin-left:300px;width: 100%;margin: auto">
    <el-table :data="board" style="width: 1500px;margin: auto">
      <el-table-column
        prop="boardId"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="boardDeso"
        label="公告描述"
        width="300">
      </el-table-column>
      <el-table-column
        prop="boardTime"
        label="公告时间"
        :formatter="dateFormat"
        width="240">
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="250">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="board">
          <el-button type="primary"  plain @click="updateBoard(board.row.boardId)">修改</el-button>

          <el-button type="danger"  plain @click="deleteBoard(board.row.boardId)">删除</el-button>

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
      <!--<el-button type="success" icon="el-icon-check" circle @click="insertBoard()"></el-button>-->
      <el-button type="success" plain @click="insertBoard()">新增</el-button>
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
        var url = 'api/findAllBoardBypage/'+this.params.page+"/"+this.params.size
        axios.get(url).then(res =>{
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

