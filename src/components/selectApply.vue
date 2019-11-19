<template>
  <div>
    <div style="width: 100%;margin-top: 5px">
      <el-table
        :data="apply"
        style="width: 100% ;font-size: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="realName"
          label="业主姓名"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="applyDeso"
          label="报修申请"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="房号"
          width="200"
          align="center"
        >
        </el-table-column>
          <el-table-column
            prop="applyTime"
            label="申请时间"
            width="200"
            align="center"
            :formatter="dateFormat"
          >
          </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="190"
              align="center"
            >
        </el-table-column>
        <el-table-column
          prop="staffName"
          label="处理人"
          width="200"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="advise">
            <el-button type="primary" plain @click="applied(apply.row.applyId)">已处理</el-button>
          </template>
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
        apply:[],
        total:'',
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
        var url = '/api/applyFindAll/'+this.params.page+"/"+this.params.size
        axios.get(url).then(res => {
          this.apply = res.data.list;
          this.total=res.data.total;
        })
      },
      dateFormat:function(row,column){
        var t=new Date(row.createTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
      },
      applied:function (applyId) {
        var url='api/updateApplyStatus'
        axios.get(url,{applyId:applyId}).then(res=>{
          if (res.data=="ok") {
            this.$message({
              message: '处理成功',
              type: 'success'
            });
            this.query();
          }
        })

      }
    }
  }

</script>
