<template>
  <div style="width: 100%">
    <div style="margin-left: 10px;margin-top: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
        <el-breadcrumb-item :to="{ path: '/staffMain/staffMessage' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>费用修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width: 500px;height:500px;margin-left: 100%;margin-top: 100px">
      物业费用(m²/元) : <el-input-number v-model="deduct.propertyFee"
      :precision="2" :step="0.01" :min="0" size="medium" style="margin-left: 10px"></el-input-number><br><br>
      暖气费用(m²/元) : <el-input-number v-model="deduct.hotFee"
      :precision="2" :step="0.01" :min="0" size="medium" style="margin-left: 10px"></el-input-number><br><br>
      缴费日期( 每月) : <el-input-number v-model="deduct.deductTime"
      :min=1 :max="28" size="medium" style="margin-left: 10px"></el-input-number><br><br>
      催费日期( 每月) : <el-input-number v-model="deduct.warnTime"
      :min=1 :max="28" size="medium" style="margin-left: 10px"></el-input-number><br><br>
      <el-button  type="primary" round style="font-size: 15px;width: 200px;margin-top: 20px;margin-left: 110px" @click="updateDeduct()">确认修改</el-button>
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
        deduct:{
          propertyFee:'',
          hotFee:'',
          deductTime: '',
          warnTime: ''
        },
      }
    },

    mounted(){
        this.query();
    },
    methods:{
      updateDeduct:function () {
        var url='api/updateDeduct'
        axios.post(url,this.deduct).then(res=>{
          if(res.data=="未登录"){
            alert("您好，请登录")
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
            this.query();
          }else {
            this.$message.error('修改失败')
          }
        })
      },
      query:function () {
        var url='api/getDeduct'
        axios.post(url).then(res=>{
          if (res.data=='未登录'){
              alert(res.data)
            this.$router.push({path:'/login'})
          }
          if (res.data=="权限不足"){
            alert(res.data)
            this.$router.push({path:'/staffMain/noPermission'})
          }
          this.deduct=res.data
        })
      }
    }
  }

</script>
