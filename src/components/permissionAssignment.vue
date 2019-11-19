<template>
  <div style="width: 100%">
    <div style="width: 500px;height:500px;margin-left: 100%;margin-top: 100px">
      <el-form ref="form" :model="staff" label-width="80px" >
        <el-form-item label="员工姓名">
          <el-input v-model="staff.realName" ></el-input>
        </el-form-item><br>
        <el-form-item label="员工工号">
          <el-input v-model="staff.staffNumber" ></el-input>
        </el-form-item><br>
        <el-form-item label="员工职责" >
          <el-select  v-model="staff.roleId"  style="float: left;width: 420px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" style="">确认修改</el-button>
          <el-button type="danger" @click="updateStaffPassword()" style="">重置密码</el-button>
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
              realName:'',
              staffNumber:'',
              roleName:''
          },
        options: [{
          value: '1',
          label: '超管，拥有全部权限'
        }, {
          value: '2',
          label: '拥有用户账户管理、查看维修申请、用户、车位、房屋数据操作的权限'
        }, {
          value: '3',
          label: '数据管理，对用户、车位、房屋数据进行操作的权限'
        }, {
          value: '4',
          label: '网站信息运维，可对网站的展示信息进行管理'
        }],
        value: ''
      }
    },

    mounted(){
      var staffId=this.$route.params.staffId;
      var url='api/getStaffInfo?staffId='+staffId
      axios.post(url).then(res=>{
          this.staff=res.data;
      })

//      var urls='api/selectRoles'
//      axios.post(urls).then(res=>{
//        this.roles=res.data;
//      })
    },
    methods:{
      submitForm:function () {
          var url='api/updateRole'
          axios.post(url,{roleId:this.staff.roleId,staffId:this.staff.staffId}).then(res=>{
            if (res.data=="success") {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$router.push({path:'/staffMain/viewStaff'})
            }else {
              this.$message.error('修改失败')
            }
          })
      },
      updateStaffPassword:function () {
        var staffId=this.$route.params.staffId;
        var url='api/resetPassword?staffNumber='+this.staffNumber
        axios.post(url).then(res=>{
          if (res.data=="ok") {
            this.$message({
              message: '重置成功',
              type: 'success'
            });
          }else {
            this.$message.error('重置失败')
          }
        })
      }
    }
  }

</script>
