<template>
  <div id="search">
    <!--  搜索框 -->
    <div id="searchBox">
      <el-input placeholder="请输入地址" v-model="input" class="input-with-select">
        <el-button slot="append" @click="getParams">搜索</el-button>
      </el-input>
    </div>
  </div>
</template>
<script>
import request from '@/utils/searchRequest.js';

export default {
  name: 'search',
  props: ['z', 'center', 'bound'],
  data() {
    return {
      // 搜索框内容
      input: '超市',

      // 天地图服务请求参数
      type: 'query',
      tk: '37d614f39eb9dcfa72b2f1ab5aff22ff',
      postStr: '{"keyWord":"超市","level":"15","mapBound":"116.40466,39.90684,116.45016,39.93138","queryType":"3","pointLonlat":"116.42844,39.92314","queryRadius":"1000","count":"20","start":"0"}',

    }
  },
  methods: {
    // 通过输入框和父map组件获取请求参数
    async emitComputeSearch() {
      this.$emit('computeSearch');
    },

    async getParams() {
      // 需要等待$emit()将事件执行完成后事件再向父组件取值，即子传父，父处理完成，再父传子。
      await this.emitComputeSearch()
      this.computeStr()
      this.initRequest()
    },

    // 计算postStr
    computeStr() {
      this.postStr = `{"keyWord":"${this.input}","level":"${this.z}","mapBound":"${this.bound.join(',')}","queryType":"3","pointLonlat":"${this.center.join(',')}","queryRadius":"1000","count":"20","start":"0"}`
    },

    // 发起axios请求
    initRequest() {
      request.get('', {
        params: {
          postStr: this.postStr,
          type: this.type,
          tk: this.tk
        }
      }).then((res) => {
        // 处理成功情况
        // 将数据传递给map展示注记
        this.$emit('getSearchData', res.data)
      })
        .catch((err) => {
          // 处理错误情况
          alert(err);
        });
    }
  }
}
</script>
<style lang="less"></style>