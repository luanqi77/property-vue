<template>
  <div>
    <el-button>5555sasa5555555</el-button>
    <a href="www.baidu.com">ss</a>
    asasas
  </div>


</template>
<script>
  import axios from 'axios'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},

    data() {
      return {
        searchInput:''
      }
    },

    mounted(){
      var searchInput=this.$route.params.searchInput;
      alert(searchInput)
    },
    methods:{

    }
  }

</script>
