<template>
  <div style="width: 100%;">
    <div style="width: 500px;height:500px;margin-left: 100%;margin-top: 100px">
      <el-form ref="form" :model="user" label-width="80px" >
        <el-form-item label="用户姓名">
          <el-input v-model="user.realname" @blur="checkRealname()"></el-input>
        </el-form-item><br>
        <el-form-item label="用户电话">
          <el-input v-model="user.tel" @blur="checkTel()"></el-input>
        </el-form-item><br>
        <el-form-item label="用户房号">
          <el-input v-model="houseId" @blur="checkHouseId()"></el-input>
        </el-form-item><br>

        <el-form-item>
          <el-button type="primary" round @click="submitForm()" style="width: 200px">提交</el-button>
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
        },
        houseId:''
      }
    },

    mounted(){

    },
    methods:{
      submitForm:function () {
        var url='api/insertUser'
        console.log(this.user+this.houseId)
        axios.post(url,{user:this.user,houseId:this.houseId}).then(res=>{
            if (res.data=="未登录"){
                alert("请您登陆")
                this.$router.push({path:'/login'})
            }else {
                if (res.data=="房屋已存在住户"){
                    alert(res.data)
                }else {
                    if (res.data=="房屋不存在"){
                        alert(res.data)
                    }else {
                      if (res.data=="权限不足"){
                        alert(res.data)
                        this.$router.push({path:'/staffMain/noPermission'})
                      }
                      if (res.data=="success") {
                        this.$message({
                          message: '添加成功',
                          type: 'success'
                        });
                        this.$router.push({path:'/staffMain/propertyAccount'})
                      }else {
                        this.$message.error('添加失败')
                      }
                    }
                }
            }
         })
      },

      checkRealname:function () {
        if(this.user.realname==''){
          this.$message({message: '真实姓名不能为空', type: 'warning'})
        }
      },
      checkTel:function () {
        if(this.user.tel==''){
          this.$message({message: '电话不能为空', type: 'warning'})
        }
      },

    }
  }

</script>
