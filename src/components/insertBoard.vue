<template>
  <div>
    <el-form :inline="true" :model="board" class="demo-form-inline">
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
        <el-button type="primary" @click="insertBoard2()">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    data(){
      return{
        board: {
          boardId: '',
          boardDeso: '',
          boardTime: '',
          level: '',
          title: '',
        }
      }
    },
    methods:{
      insertBoard2:function(){
        var url = "api/insertBoard"
        axios.post(url,this.board).then(res=>{
          if (res.data!='0') {
            this.$router.push({path:"/boardList"})
          }else {
            alert("添加失败！")
          }
        })
      }
    }
  }
</script>
