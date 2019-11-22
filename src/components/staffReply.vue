<template>
  <div style="width: 100%">
    <div style="margin-left: 10px;margin-top: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
        <el-breadcrumb-item :to="{ path: '/staffMain/staffMessage' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>查看投诉</el-breadcrumb-item>
        <el-breadcrumb-item>回复投诉</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12);width:800px;height: 600px;
    margin-left: 50%;margin-top: 50px" >
      <el-form :inline="true" :model="reply" status-icon :rules="rules" class="demo-ruleForm">
        <el-form-item  prop="description" label=" ">
          <div>
            <div style="margin-top: 10px;width: 500px;font-size: 18px;word-wrap: break-word;margin-left: 8%">投诉及建议描述：{{advise.description}}</div>
            <div style="font-size: 16px;width: 500px;;margin-left: 8%">投诉时间：{{advise.adviseTime.substr(0,10)}}</div>
          </div>
            <el-input
            type="textarea"
            style="border-radius: 4px; margin-left: 0%;margin-top: 50px;
              height: 250px;width: 600px; font-size: 16px"
            :rows="8"
            placeholder="请输入您的回复，帮助该业主解决问题(至少输入10个字)"
            v-model="reply.replyDeso">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="submitForm()" style="margin-top: 0px;height: 40px;width: 100px">提交</el-button>
          <el-button type="warning" round @click="cancle()" style="width: 80px;width: 100px;text-align: center">取消</el-button>
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
          reply:{
            replyDeso:'',
            adviseId:''
          },
          advise:{
              description:'',
              adviseTime:'',
              adviseId:''
          },
        rules:{
          reply: [
            { required: true, message: '请至少输入10个字', trigger: 'blur' },
            { min: 10, max: 100, message: '长度在 10 到 200 个字符', trigger: 'blur' }
          ]
        },

      }
    },

    mounted(){
      var adviseId=this.$route.params.adviseId
        var url='api/selectAdviseByAdviseId'
        axios.post(url,{adviseId:adviseId}).then(res=>{
          if(res.data=="未登录"){
            alert("您好，请登录")
            this.$router.push({path:'/login'})
          }
          if (res.data=="权限不足"){
            alert(res.data)
            this.$router.push({path:'/staffMain/noPermission'})
          }
            this.advise=res.data;
        })
    },
    methods:{
      dateFormat:function(row,column){
        var t=new Date(row.adviseTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
      },
      submitForm:function () {
        var url='api/insertReply'
        this.reply.adviseId=this.$route.params.adviseId
        axios.post(url,this.reply).then(res=>{
          if (res.data=='未登录'){
            alert("请您先去登录！")
            this.$router.push({path:'/index'})
          }else {
            if (res.data=="权限不足"){
              alert(res.data)
              this.$router.push({path:'/staffMain/noPermission'})
            }
          if (res.data =='success') {
            const h = this.$createElement;
            this.$notify({
              title: '回复成功',
              message: '已自动返回',
              type: 'success'
            });
            this.$router.push({path:"/staffMain/myReply"})
          } else {
            this.$message.error('回复失败，请稍后重试')
          }
          }
        })
      },
      cancle:function () {
        this.$router.push({path:'/staffMain/myReply'})
      }
    }
  }

</script>
