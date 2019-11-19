<template>
  <div style="width: 100%;height:100%">
    <h3 style="color: cornflowerblue;margin-bottom: -25px;margin-top: 30px">个人信息修改</h3>
    <el-form ref="form" :model="user" label-width="35%" style="width: 50%;margin: auto">
      <el-form-item label="">
        <el-input v-model="user.id" type="hidden"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
      <el-input v-model="user.username" style="width: 65%;margin-left: -125px">sssss</el-input>
      </el-form-item>
      <el-form-item label="密码">
      <el-input v-model="user.username" style="width: 65%;margin-left: -125px" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
      <el-input v-model="user.username" style="width: 65%;margin-left: -125px" placeholder="请确认新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
      <el-input v-model="user.username" style="width: 65%;margin-left: -125px" placeholder="请确认新密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
      <el-input v-model="user.username" style="width: 65%;margin-left: -125px" ></el-input>
      </el-form-item>
      <el-form-item label="上传头像" style="width: 65%;float: left" >
        <!--<el-upload-->
          <!--class="upload-file"-->
          <!--drag-->
          <!--:action="doUpload"-->
          <!--:before-upload="beforeUpload">-->
          <!--<i class="el-icon-upload"></i>-->
          <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
        <!--</el-upload>-->
        <el-upload
          v-model="user.pic"
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip" style="margin-top: -10px">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item style="width: 65%;margin-left: 65px">
        <el-button type="primary" @click="userupdate()">确定</el-button>
        <el-button @click="goback()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
  import ElImage from "../../node_modules/element-ui/packages/image/src/main";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElMenu from "../../node_modules/element-ui/packages/menu/src/menu";
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  import ElDivider from "../../node_modules/element-ui/packages/divider/src/main";
  import ElUpload from "../../node_modules/element-ui/packages/upload/src/index";
  export default {
    components: {
      ElUpload,
      ElDivider,
      ElForm,
      ElMenu},
    data() {
      return {
        doUpload:'api/uploadpic',
          user:{
              id:'',
              username:'',
              email:'',
              password:'',
              pic:''
          }
      }
    },
    methods: {
      beforeUpload(file){
        var url='api/uploadpic'
        let fd=new FormData();
        fd.append('file',file);
        axios.post(url,fd).then(res=>{
          if(res!=''){
            this.docter.pic=res.data;
          }else{
            this.$message.error('上传失败，请检查您的网络')
          }
        })
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      goback:function () {
        this.$router.push({path:'/news'})
      }
    }
  }
</script>
<style>

</style>
