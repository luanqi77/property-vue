<template>
  <div>
    <el-input type="text" v-model="params.searchInput"placeholder="输入用户关键信息"
              style="width: 300px;margin-left: -150px;margin-top: 30px"></el-input>
    <el-button style="width: 70px;text-align: center;margin-left: -4px;
    margin-top: -40px;margin-bottom: 20px" @click="search()">搜索</el-button>

    <el-table
      :data="user"
      style="width: 100% ;font-size: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
      :row-class-name="tableRowClassName">

      <el-table-column
        prop="realName"
        label="业主姓名"
        width="360"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="tel"
        label="手机号码"
        width="360"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="所在单元"
        width="360"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="账户余额"
        width="364"
        align="center"
      >
      </el-table-column>
      <!--<el-table-column-->
      <!--label="操作"-->
      <!--width="200"-->
      <!--align="center"-->
      <!--&gt;-->
      <!--<template slot-scope="staff">-->
      <!--<el-button type="primary" plain @click="toUserAnswer(staff.row.staffId)">删除</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="this.params.size"
      v-on:current-change="changePage"
      :total="total"
      :current-page="this.params.page">
    </el-pagination>
  </div>


</template>
<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},
    data() {
      return {
        user:[],
        params: {
          page: '1',
          size: '10',
          searchInput:''
        }
      }
    },

    mounted(){
      this.search();
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
        this.search();
      },
      search:function () {
        var url = '/api/userFindAll/'
        console.log(this.params)
        axios.post(url,this.params).then(res => {
          this.user = res.data.list;
          this.total=res.data.total;
        })
      },
    }
  }

</script>
