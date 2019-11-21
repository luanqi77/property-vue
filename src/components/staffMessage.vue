<template>
  <div>
    <span style="font-size: 24px;color: cornflowerblue;margin-left: 50px;height: 50px;line-height: 50px">公示公告</span>
    <div id="myChart" :style="{width: '1000px', height: '1000px'}"></div>
    <!--公示公告-->
  </div>
</template>
<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default {
    name: 'hello',
    data () {
      return {
        data: [],
        aa:'',
        msg: 'Welcome to Your Vue.js App'
      }
    },

    mounted(){
      this.drawLine();
//      this.drawBarChart();
    },
    methods: {
      drawLine(){
        var url = 'api/getContributionRate'
        axios.get(url).then(res => {

        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {text: '云翔物业小区住户缴费率'},
          tooltip: {},
          xAxis: {
            data: ["1号楼", "2号楼", "3号楼", "4号楼", "5号楼"]
          },
          yAxis: {},
          series: [{
            name: '缴费率',
            type: 'bar',
            itemStyle: {
              normal: {
                //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                color: function (params) {
                  // build a color map as your need.
                  var colorList = [
                    '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                  ];
                  return colorList[params.dataIndex]
                },
                //以下为是否显示，显示位置和显示格式的设置了
                label: {
                  show: true,
                  position: 'top',
//        formatter: '{c}'
                  formatter: '{b}\n{c}'
                }
              }
            },
            data: res.data
          }],

        });
      })
      },

    }
  }


</script>
