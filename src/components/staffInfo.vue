<template>
  <div >
    <div style="width: 500px;height:500px;margin-left: 400px;margin-top: 50px">
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
          <el-button type="primary" @click="submitForm()" style="margin-left: 100px">确认修改</el-button>
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
        //查员工信息
        var url='api/selectStaff'
        axios.post(url).then(res=>{
            this.staff=res.data;
        })
    },
    methods:{
      submitForm(formName) {
        var url='api/updateStaff'
        axios.post(url,this.staff).then(res=>{
          if (res.data=="success"){
            alert('修改成功，请重新登录')
            //this.$router.push({path:"/index/"+username})
          }else {
            this.$message.error('修改失败');
          }
        })
      },
    }
  }

</script>
