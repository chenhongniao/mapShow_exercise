<template>
  <div id="search">
    <!--  搜索框 -->
    <div id="searchBox">
      <el-input placeholder="请输入地址" v-model="input" class="input-with-select">
        <el-button slot="append">搜索</el-button>
      </el-input>
    </div>
    <!-- 搜索结果标记 -->
    <div v-if="mark">

    </div>
  </div>
</template>
<script>
import request from '@/utils/searchRequest.js'

export default {
  name: 'search',
  data() {
    return {
      input: '',
      mark: false,

      // 天地图服务请求参数
      type: 'query',
      tk: '37d614f39eb9dcfa72b2f1ab5aff22ff'     
      
    }
  },
  computed: {
    postStr(){
      return '{"keyWord":"银行","level":"15","mapBound":"116.37552,39.8935,116.42102,39.91804","queryType":"2","count":"20","start":"0"}'
    } 
  },
  mounted(){
    this.initRequest()
  },
  methods: {
    initRequest(){
      request.get('',{
        params:{
          postStr: this.postStr,
          type: this.type,
          tk: this.tk
        }
      }).then(function (res) {
        // 处理成功情况
        console.log(res.data);
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      });
    }
  }
}
</script>
<style lang="less"></style>