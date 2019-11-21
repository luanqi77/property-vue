<template>
  <div>
    <div style="width: 100%;margin-top: 5px">
      <el-table
        :data="apply"
        style="width: 100% ;font-size: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
        stripe>
        <el-table-column
          prop="realname"
          label="业主姓名"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="apply_deso"
          label="报修申请"
          width="500"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="build"
          label="楼号"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="floor"
          label="层号"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="room"
          label="房号"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="apply_time"
          label="申请时间"
          width="200"
          align="center"
          :formatter="dateFormat"
        >
        </el-table-column>
        <el-table-column
          prop=""
          label="状态"
          width="200"
          align="center"
        >
          <template slot-scope="apply">
            {{ apply.row.status ? '已回复' : '未回复' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="处理人"
          width="214"
          align="center"
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
        apply:[],
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
        var status=2;
        var url = '/api/selectApplyByStaff/'+status+"/"+this.params.page+"/"+this.params.size
        axios.get(url).then(res => {
          if(res.data=="未登录"){
            alert("您好，请登录")
            this.$router.push({path:'/login'})
          }
          if (res.data=="权限不足"){
            alert(res.data)
            this.$router.push({path:'/staffMain/noPermission'})
          }
          this.apply = res.data.applyList;
          this.total=res.data.total;
        })
      },
      dateFormat:function(row,column){
        var t=new Date(row.apply_time);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
      },
    }
  }

</script>
