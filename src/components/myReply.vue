<template>
  <div>
    <div style="margin-left: 10px;margin-top: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
        <el-breadcrumb-item :to="{ path: '/staffMain/staffMessage' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>查看投诉</el-breadcrumb-item>
        <el-breadcrumb-item>查看回复</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width: 100%;margin-top: 5px">
      <el-table
        :data="adviseAndReply"
        style="width: 100% ;font-size: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
        stripe>
        <el-table-column
          prop="description"
          label="业主投诉"
          width="600"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="replyDeso"
          label="我的回复"
          width="580"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="adviseTime"
          label="投诉时间"
          width="220"
          align="center"
          :formatter="dateFormat"
        >
        </el-table-column>

        <el-table-column
          prop="replyTime"
          label="回复时间"
          width="222"
          align="center"
          :formatter="dateFormats"
        >
        </el-table-column>

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
<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},
    data() {
      return {
        adviseAndReply:[],
          total:'0',
        params: {
          page: '1',
          size: '10',
        }
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
        var url = '/api/selectReplyByStaffId/'+this.params.page+"/"+this.params.size
        axios.get(url).then(res => {
          if(res.data=="未登录"){
            alert("请您先去登录！")
            this.$router.push({path:'/index'})
          }else {
            if (res.data=="权限不足"){
              alert(res.data)
              this.$router.push({path:'/staffMain/noPermission'})
            }
            this.adviseAndReply = res.data.list;
            this.total=res.data.totalCount;
          }
        })
      },
      dateFormat:function(row,column){
        var t=new Date(row.adviseTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
      },
      dateFormats:function(row,column){
        var t=new Date(row.replyTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
      },
      toReply:function (adviseId) {
        this.$router.push({path:'/staffMain/staffReply'+adviseId})
      }
    }
  }

</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
