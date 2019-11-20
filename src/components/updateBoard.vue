<template>
  <div style="width: 80%;height: 600px;margin: auto">
  <div style="margin-left: 400px;width: 100%;margin-top: 100px">
    <el-form ref="form" :model="board" label-width="80px" style="margin: auto">
      <el-form-item label="公告描述" prop="boardDeso">
        <el-input v-model="board.boardDeso"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="公告时间" prop="boardTime">
        <el-input v-model="board.boardTime" type="date"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="等级" prop="level">
        <el-input v-model="board.level"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="标题" prop="title">
        <el-input v-model="board.title"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="success" round style="width: 200px" @click="updateBoard2()">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    data(){
      return {
        board: {
          boardId: '',
          boardDeso: '',
          boardTime: '',
          level: '',
          title: '',
        }
      }
    },
    mounted(){
      var boardId = this.$route.params.boardId
      var url = 'api/selectBoardById/'
      axios.post(url, {boardId: boardId}).then(res => {
        if (res.data != null) {
          this.board = res.data;
        } else {
          alert("查找用户失败")
        }
      })
    },
    methods: {
      updateBoard2: function () {
        var url = '/api/updateBoard'
        axios.post(url, this.board).then(res => {
          if (res.data !='0') {
            alert("修改成功！")
            this.$router.push('/boardList')
          } else {
            alert("修改失败")
          }
        })
      }
    }

  }
</script>
