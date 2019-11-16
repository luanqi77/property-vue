<template>
  <div>
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12);width:715px;height: 500px;
    margin-left: 350px;margin-top: 50px" >
      <el-form :inline="true" :model="reply" status-icon :rules="rules" class="demo-ruleForm">
        <el-form-item  prop="description" label=" ">
          <div>
            <div style="margin-top: 20px">投诉及建议描述：{{advise.description}}</div>
            <div style="">投诉时间：{{advise.adviseTime.substr(0,10)}}</div>
          </div>
            <el-input
            type="textarea"
            style="border-radius: 4px; margin-left: auto;margin-top: 30px;
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
            this.advise=res.data;
        })
    },
    methods:{
      dateFormat:function(row,column){
        var t=new Date(row.adviseTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
      },
      submitForm:function () {
        var url='api/replyAdvise'
        this.reply.adviseId=this.$route.params.adviseId
        axios.post(url,this.reply).then(res=>{
          if (res.data != '0') {
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
        })
      }
    }
  }

</script>
