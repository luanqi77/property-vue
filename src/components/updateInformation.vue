<template>
  <div>
    <el-form :inline="true" :model="Information" class="demo-form-inline">
      <el-form-item label="描述" prop="description">
        <el-input v-model="Information.description"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="Information.tel"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="姓名" prop="connname">
        <el-input v-model="Information.connname"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="服务名称" prop="servername">
        <el-input v-model="Information.servername"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="公司" prop="company">
        <el-input v-model="Information.company"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="updateInformation2()">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    data(){
      return {
        Information: {
          inid: '',
          description: '',
          tel: '',
          connname: '',
          servername: '',
          company: '',
        }
      }
    },
    mounted(){
      var inid = this.$route.params.inid
      var url = 'api/selectInformationById/'
      axios.post(url, {inid: inid}).then(res => {
        if (res.data != null) {
          this.Information = res.data;
        } else {
          alert("查找用户失败")
        }
      })
    },
    methods: {
      updateInformation2: function () {
        var url = '/api/updateInformation'
        axios.post(url, this.Information).then(res => {
          if (res.data !='0') {
            alert("修改成功！")
            this.$router.push('/InformationList')
          } else {
            alert("修改失败")
          }
        })
      }
    }

  }
</script>
