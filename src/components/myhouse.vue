<template>
  <!--<div style="width: 100%;height:6000px;margin: auto;background-color: yellow;margin-top: -50px">-->
  <div style="width: 100%;height:100%;opacity:93%">
    <div style="height:20%;width: 95%;margin: auto">
    <div style="height: 20%;width: 100%;float: left">
      <img src="../assets/house/house.png" style="float: left">
      <h3 style="float: left;line-height: 55px">我的房屋</h3><br>
    </div>
    <div style="height:80%;width: 95%;margin: auto">
      <h2 style="color:yellowgreen"><a class="el-icon-map-location" style="font-size: 18px">&nbsp;位置:{{house.build}}栋{{house.floor}}层{{house.room}}室</a></h2>
      <h2 style="color:darkolivegreen"><a class="el-icon-c-scale-to-original" style="font-size: 18px">&nbsp;格局：{{house.style}}</a></h2>
      <h2 style="color:darkslategrey"><a class="el-icon-full-screen" style="font-size: 18px">&nbsp;面积：{{house.area}}</a></h2>
      <h2 style="color:cornflowerblue"><a class="el-icon-aim" style="font-size: 18px">&nbsp;朝向：{{house.toward}}</a></h2>
    </div>
    </div><br><br><br><br>
    <div style="height:40%;">
      <div style="height:60%;width: 95%;margin: auto">
        <div style="height: 20%;width: 100%;float: left">
          <img src="../assets/house/park.png" style="float: left" width="8%">
          <h3 style="float: left;line-height: 15px">我的车位</h3><br>
          <!--<div style="width: 80%;float: right"><el-divider><a class="el-icon-house"></a></el-divider></div>-->
        </div>
        <div style="height:80%;width: 95%;margin: auto" v-model="parks">
          <div style="width: 60%;float: left">
          <el-table
            :data="parks"
            stripe
            style="width: 40%;float:left;margin-top: 20px;height: 100%">
            <el-table-column
              prop="park_id"
              label="车位编号"
              width="140" style="color: black;font-size: 20px">
            </el-table-column>
          </el-table>
            </div>
          <div style="width:39%;float: right">
            <el-carousel trigger="click" height="320px" style="width: 100%">
              <el-carousel-item v-for="item in pics" :key="item">
                <img :src="item.src"  width="420px">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import ElImage from "../../node_modules/element-ui/packages/image/src/main";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElMenu from "../../node_modules/element-ui/packages/menu/src/menu";
  import ElDivider from "../../node_modules/element-ui/packages/divider/src/main";
  export default {
    components: {
      ElDivider,
      ElMenu},
    data() {
      return {
        house:{
          houseId:'',
          userId:'',
          build:'',
          area:'',
          style:'',
          floor:'',
          room:'',
          toward:'',
          hotFee:'',
          propertyFee:''
        },
        parks:[],
        pics:[
          {src:require('../assets/house/car1.jpg')},
          {src:require('../assets/house/car2.jpg')},
          {src:require('../assets/house/car3.jpg')},
//          {src:require('../assets/house/car4.jpg')},
//          {src:require('../assets/house/car5.jpg')}
        ]
      }
    },
    mounted(){
      this.queryHouse();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      queryHouse:function () {
        var bd = this.$route.params.userid;
        var url='api/findHouseById'
        axios.post(url,{userId:bd}).then(res=>{
          this.house=res.data;
        })
        this.queryPark();
      },
      queryPark:function () {
        var url='api/selectParkingById/'+11;
        axios.get(url).then(res=>{
          this.parks=res.data;
        })
      },
      goback:function () {
        this.$router.push({path:'/informations'})
      }
    }
  }
</script>
<style>

</style>
