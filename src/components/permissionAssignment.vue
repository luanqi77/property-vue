<template>
  <div>
    <div style="width: 500px;height:500px;margin-left: 400px;margin-top: 50px">
      <el-form ref="form" :model="staff" label-width="80px" >
        <el-form-item label="员工姓名">
          <el-input v-model="staff.staffName" ></el-input>
        </el-form-item><br>
        <el-form-item label="员工工号">
          <el-input v-model="staff.staffNumber" ></el-input>
        </el-form-item><br>
        <el-form-item label="员工职责" >
          <el-select  v-model="staff.roleId"  style="float: left;width: 420px">
            <el-option
              v-for="role in roles"
              :key="role.roleId"
              :label="role.roleName"
              :value="role.roleId"
            ></el-option>
          </el-select>
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
          roles:[],
          staff:{
              roleId:'',
              staffId:'',
              staffName:'',
              staffNumber:'',

          }
      }
    },

    mounted(){
      var staffId=this.$route.params.staffId;
      axios.get(url,{staffId:staffId}).then(res=>{
          this.staff=res.data;
      })
    },
    methods:{
      submitForm:function () {
          axios.get(url,this.staff).then(res=>{
            if (res.data=="ok") {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$router.push({path:'/staffMain/viewStaff'})
            }else {
              this.$message.error('添加失败')
            }
          })
      }
    }
  }

</script>
