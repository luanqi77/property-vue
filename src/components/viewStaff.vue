<template>
  <div>
    <div style="width: 1000px;margin-left: 200px">
      <span style="font-size: 24px;color: darkgray;
      margin-left: 0px;height: 50px;line-height: 50px">员工信息</span>
      <!--<el-button  primary style="font-size: 15px;margin-left: 200px;margin-top: 20px;" @click="loginout()">新增员工</el-button>-->
      <el-table
        :data="staff"
        style="width: 100% ;font-size: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
        :row-class-name="tableRowClassName">

        <el-table-column
          prop="staffName"
          label="员工姓名"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="staffNumber"
          label="员工工号"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="staffPermission"
          label="员工职责"
          width="400"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="staff">
            <el-button type="primary" plain @click="toUserAnswer(staff.row.staffId)">删除</el-button>
          </template>
        </el-table-column>

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
  </div>


</template>
<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},
    data() {
      return {
        staff:[],
        params: {
          page: '1',
          size: '10',
        }
      }
    },

    mounted(){
      // 查员工信息
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
        var url = '/api/staffFindAll/'+this.params.page+"/"+this.params.size
        axios.get(url).then(res => {
          this.staff = res.data.list;
          this.total=res.data.total;
        })
      },
    }
  }

</script>
