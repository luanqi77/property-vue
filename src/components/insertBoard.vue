<template>
  <div style="width: 100%;height: 600px;margin: auto">
    <div style="margin-left: 10px;margin-top: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
        <el-breadcrumb-item :to="{ path: '/staffMain/staffMessage' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>网站维护</el-breadcrumb-item>
        <el-breadcrumb-item>添加公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
        <el-button type="success" round style="width: 200px" @click="insertBoard2()">添加</el-button>
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
    methods: {
      insertBoard2: function () {
        var url = "api/insertBoard"

          axios.post(url, this.board).then(res => {
            if(res.data=="未登录"){
              alert("您好，请登录")
              this.$router.push({path:'/login'})
            }
            if (res.data=="权限不足"){
              alert(res.data)
              this.$router.push({path:'/staffMain/noPermission'})
            }

            if (res.data != '0') {
              this.$router.push({path: "/boardList"})
            } else {
              alert("添加失败！请正确填写")
            }

        })
      }
    }
  }
</script>
