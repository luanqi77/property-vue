<template>
  <div>
    <div style="width: 500px;height:500px;margin-left: 400px;margin-top: 50px">
      <el-form ref="form" :model="staff" label-width="80px" >
        <el-form-item label="员工姓名">
          <el-input v-model="staff.staffName" @blur="checkStaffName()"></el-input>
        </el-form-item><br>
        <el-form-item label="员工工号">
          <el-input v-model="staff.staffNumber" @blur="checkstaffNumber()"></el-input>
        </el-form-item><br>
        <!--<el-form-item label="员工密码">-->
          <!--<el-input type="password" v-model="staff.password" placeholder="默认为123456"></el-input>-->
        <!--</el-form-item><br>-->
        <el-form-item label="员工职责" >
          <el-select  v-model="staff.roleId"  style="float: left;width: 420px" @blur="checkStaffRoleId()">
            <el-option
              v-for="role in roles"
              :key="role.roleId"
              :label="role.roleName"
              :value="role.roleId"
            ></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item>
          <el-button type="primary" round @click="submitForm()" style="">提交</el-button>
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
          roles:[],
          staff:{
              roleId:'',
              staffName:'',
              staffNumber:'',
              password:''

          }
      }
    },

    mounted(){

    },
    methods:{
      submitForm:function () {
        var url='api/insertStaff'
        axios.post(url,this.staff).then(res=>{
          if (res.data=="ok") {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$router.push({path:'/staffMain/viewStaff'})
          }else {
            this.$message.error('添加失败')
          }
        })
      },
      checkStaffName:function () {
        if(this.staff.staffName==''){
          this.$message({message: '员工姓名不能为空', type: 'warning'})
        }
      },
      checkstaffNumber:function () {
        if(this.staff.staffNumber==''){
          this.$message({message: '员工工号不能为空', type: 'warning'})
        }
      },
      checkStaffRoleId:function () {
        if(this.staff.roleId==''){
          this.$message({message: '员工职责不能为空', type: 'warning'})
        }
      },

    }
  }

</script>
