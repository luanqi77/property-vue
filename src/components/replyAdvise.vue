<template>
  <div>
    <div style="width: 100%;margin-top: 5px">
      <el-table
        :data="advise"
        style="width: 100% ;font-size: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="adviseId"
          label="序号"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="业主投诉"
          width="657"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="adviseTime"
          label="投诉时间"
          width="200"
          align="center"
          :formatter="dateFormat"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="200"
          align="center"
        >
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="status"-->
          <!--label="状态"-->
          <!--width="200"-->
          <!--align="center"-->
        <!--&gt;-->
          <!--<template slot-scope="advise">-->
            <!--<i v-if="advise.row.status===2">已回复</i>-->
            <!--<i v-else="advise.row.status===1">未回复</i>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="操作"
          width="364"
          align="center"
        >
          <template slot-scope="advise">
            <el-button type="primary" round @click="toReply(advise.row.adviseId)">回复</el-button>
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
        advise:[],
        total: '0',
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
        var url = '/api/adviseFindAll/'+this.params.page+"/"+this.params.size
        axios.get(url).then(res => {
            if(res.data=="未登录"){
                alert("请您先去登录！")
              this.$router.push({path:'/index'})
            }else {
              this.advise = res.data.list;
              this.total=res.data.total;
            }

        })
      },
      dateFormat:function(row,column){
        var t=new Date(row.adviseTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
      },
      toReply:function (adviseId) {
        this.$router.push({path:'/staffMain/staffReply/'+adviseId})
      },
      formatRole(row,column){
          console.log(this.advise)
        if(row.status=="2"){
            alert(row.status)
          return row.status ="未回复";
        }else{
          return row.status ="已回复";
        }
      },
    }
  }

</script>
