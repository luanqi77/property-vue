<template>
  <div>
    <div class="block" style="margin-top: 20px">
      <span class="demonstration">查询日期 :</span>
      <el-date-picker
        v-model="value2"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button type="primary" @click="selectLog()" >搜索</el-button>
    </div>
    <div style="width: 100%;margin-top: 5px">
      <el-table
        :data="logInfos"
        style="width: 100% ;font-size: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
        stripe>
        <el-table-column
          prop="logId"
          label="序号"
          width="330"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="method"
          label="操作类型"
          width="500"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="executeTime"
          label="操作时间"
          width="400"
          align="center"
          :formatter="dateFormat"
        >
        </el-table-column>
        <el-table-column
          prop="staffNumber"
          label="操作人"
          width="392"
          align="center"
        >
        </el-table-column>

        <!--<el-table-column-->
          <!--label="操作"-->
          <!--width="200"-->
          <!--align="center"-->
        <!--&gt;-->
          <!--<template slot-scope="advise">-->
            <!--<el-button type="primary" plain @click="applied(apply.row.applyId)">已处理</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->

      </el-table>
      <br/>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="this.params.size"
        v-on:current-change="changePage"
        :total="total"
        :current-page="this.params.page">
      </el-pagination>
    </div>
  </div>


</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},
    data() {
      return {
        logInfos:[],
        params: {
          page: '1',
          size: '10',
        },
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



      }
    },

    mounted(){
      this.query();
    },
    methods:{
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      changePage:function (page) {
        this.params.page=page
        this.query();
      },
      query:function () {
        var url = '/api/findLogInfo'
        axios.post(url,{currentPage:this.params.page,pageSize:this.params.size,logDate:this.value2}).then(res => {
            if (res.data=="未登录"){
                alert("请您登录！")
              this.$router.push({path:'/login'})
            }else {
              this.logInfos = res.data.logInfos;
              this.total=res.data.total;
            }
        })
      },
      dateFormat:function(row,column){
        var t=new Date(row.executeTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
      },
      selectLog:function () {
        var url='api/selectLog'
        axios.post(url,{logTime:this.value2}).then(res=>{
          alert(res.data)
        })
      }
    }
  }

</script>
