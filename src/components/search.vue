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
export default {
  name: 'search',
  data() {
    return {
      input: '',
      mark: false
    }
  },
  watch:{
    input(newVal) {
      console.log(newVal);
    }
  }
}
</script>
<style lang="less"></style>