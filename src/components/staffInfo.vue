<template>
  <div style="width: 100%" >
    <div style="margin-left: 10px;margin-top: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
        <el-breadcrumb-item :to="{ path: '/staffMain/staffMessage' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width: 500px;height:500px;margin-left: 100%;margin-top: 100px">
      <el-form :inline="true" :model="staff" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="用户名" prop="staffName">
          <el-input v-model="staff.staffName" :disabled="true"></el-input>
        </el-form-item><br>
        <el-form-item label="工号" prop="staffNumber">
          <el-input v-model="staff.staffNumber" :disabled="true"></el-input>
        </el-form-item><br>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="staff.password" autocomplete="off" ></el-input>
        </el-form-item><br>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="staff.checkPass" autocomplete="off"></el-input>
        </el-form-item><br>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" style="margin-left: 140px">确认修改</el-button>
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.staff.checkPass !== '') {
            this.$refs.staff.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.staff.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        staff:{
          staffName:'',
          password:'',
          checkPass:'',
          staffNumber:''
        },
        rules: {
          password: [
            {required: true,validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },

    mounted(){
        //得到员工信息
        var url='api/getCurrentStaff'
      axios.get(url).then(res=>{
        this.staff=res.data;
      })
    },
    methods:{
      submitForm() {
        var url='api/updateStaffPassword'
        axios.post(url,this.staff).then(res=>{
          if (res.data=="success"){
            alert('修改成功，请重新登录')
            this.$router.push({path:"/login"})
          }else {
            this.$message.error('修改失败');
          }
        })
      },
    }
  }

</script>
