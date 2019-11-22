<template>
  <div style="width: 100%;height: 600px;margin: auto">
    <div style="margin-left: 10px;margin-top: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
        <el-breadcrumb-item :to="{ path: '/staffMain/staffMessage' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>报修处理</el-breadcrumb-item>
        <el-breadcrumb-item>修改车位</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-left: 400px;width: 100%;margin-top: 100px">
      <el-form :inline="true" :model="userparking" class="demo-form-inline" style="margin: auto">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="userparking.userId"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="停车位" prop="park_id">
          <el-input v-model="userparking.park_id"></el-input>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="success" round style="width: 100px" @click="updateParkingSpaces()">修改</el-button>
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
        userparking: {
          up_id:'',
          park_id: '',
          userId: '',

        }
      }
    },
    mounted(){
    this.userparking.up_id = this.$route.params.up_id
    this.select();

    },
    methods: {
        select:function () {
          var url = 'api/selectParkingSpacesById/'
          axios.post(url, {up_id: this.userparking.up_id}).then(res => {
            if(res.data=="未登录"){
              alert("您好，请登录")
              this.$router.push({path:'/login'})
            }
            if (res.data=="权限不足"){
              alert(res.data)
              this.$router.push({path:'/staffMain/noPermission'})
            }

            if (res.data != null) {
              this.userparking = res.data;
            } else {
              alert("查找用户失败")
            }
          })
        },
      updateParkingSpaces: function () {
        var url = '/api/updateParkingSpaces'
        axios.post(url, this.userparking).then(res => {
          if(res.data=="未登录"){
            alert("您好，请登录")
            this.$router.push({path:'/login'})
          }
          if (res.data=="权限不足"){
            alert(res.data)
            this.$router.push({path:'/staffMain/noPermission'})
          }
          if (res.data !='0') {
            alert("修改成功！")
            this.$router.push('/staffMain/parkingSpaces')
          } else {
            alert("修改失败")
          }
        })
      }
    }

  }
</script>
