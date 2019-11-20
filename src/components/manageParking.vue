<template>
  <div>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker
        v-model="value2"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button @click="to()" >提交</el-button>
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
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: '',
      };
    },

    mounted(){

    },
    methods:{
      to:function () {
          var url='api/selectLog'
          axios.post(url,{logTime:this.value2}).then(res=>{
            alert(res.data)
          })
      }
    }
  }

</script>
