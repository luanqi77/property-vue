<template>
  <!--<div style="width: 100%;height:6000px;margin: auto;background-color: yellow;margin-top: -50px">-->
  <div  style="width: 100%;height:100%">
    <div style="width: 75%;height: 80%;margin: auto;margin-top: 40px">
      <img src="../assets/advise/kefu.jpg" style="float: left">
      <h2 style="color: green;float: left;margin-top: 80px" >请填写您的宝贵意见或投诉内容，我们将及时给您反馈</h2><br>
      <el-form ref="form" :model="advise" label-width="80px">
        <el-form-item label="" >
          <el-input type="textarea" v-model="advise.description" placeholder="请在此处填写您的意见或投诉内容"></el-input>
        </el-form-item>
        <el-form-item label="" style="height: 0px">
          <el-input type="hidden" v-model="advise.userId"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 28px">
          <el-button type="primary" @click="onSubmit()">确认提交</el-button>
          <el-button  @click="goback()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import ElImage from "../../node_modules/element-ui/packages/image/src/main";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElMenu from "../../node_modules/element-ui/packages/menu/src/menu";
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  export default {
    components: {
      ElForm,
      ElMenu},
    data() {
      return {
          advise:{
              userId:'',
              description:''
          }
      }
    },
    mounted(){
      this.advise.userId  = this.$route.params.userid;
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      goback:function () {
        this.$router.push({path:'/news'})
      },
      onSubmit:function () {
          if(this.advise.description==''){
            this.$alert('输入的内容不能为空', '提示', {
              confirmButtonText: '确定',
              callback: action => {
//                this.$message({
//                  type: 'info',
//                  message: `action: ${ action }`
//                });
              }
            })
          }else {
            var url = 'api/insertAdvise'
            axios.post(url, this.advise).then(res => {
              if (!(res.data == 'fail')) {
                this.$notify({
                  title: '成功',
                  message: '建议已成功提交',
                  type: 'success'
                });
                this.$router.push({path:'/news'})
              } else {
                this.$alert('请输入内容', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `action: ${ action }`
                    });
                  }
                });
              }
            })
          }
      }
    }
  }
</script>
<style>
  .el-form-item__label{
    color: black;
    font-size: 16px;
  }
  .el-textarea__inner{
    height: 300px;
    font-size: 20px;
    font-family: "微软雅黑 Light";
    background-color: inherit;
    color: black;
  }
</style>
