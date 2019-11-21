<template>
  <div style="width: 100%">
    <div style="margin-left: 10px;margin-top: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
        <el-breadcrumb-item :to="{ path: '/staffMain/staffMessage' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>业主信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>业主信息修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width: 500px;height:500px;margin-left: 100%;margin-top: 100px">
      <el-form ref="form" :model="user" label-width="80px" >
        <el-form-item label="业主姓名">
          <el-input v-model="user.realname" ></el-input>
        </el-form-item><br>
        <el-form-item label="业主电话">
          <el-input v-model="user.tel" ></el-input>
        </el-form-item><br>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" style="">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>


</template>
<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},
    data() {
      return {

          user:{
              realname:'',
              tel:'',

          }
      }
    },

    mounted(){
      var id=this.$route.params.id;
      var url='api/getUserById?id='+id
      axios.get(url).then(res=>{
        if (res.data=="权限不足"){
          alert(res.data)
          this.$router.push({path:'/staffMain/noPermission'})
        }
          this.user=res.data;
      })

    },
    methods:{
      submitForm:function () {
          var url='api/updateUser'
          axios.post(url,this.user).then(res=>{
            if (res.data=="未登录"){
                alert("请您登陆")
              this.$router.push({path:'/login'})
            }
            if (res.data=="权限不足"){
              alert(res.data)
              this.$router.push({path:'/staffMain/noPermission'})
            }
            if (res.data=="success") {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$router.push({path:'/staffMain/propertyAccount'})
            }else {
              this.$message.error(res.data)
            }
          })
      },
    }
  }

</script>
