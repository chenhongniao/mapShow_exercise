<template>
  <div id="search">
    <div id="searchBox">
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'search',
  data() {
    return {
      input: ''
    }
  }
}
</script>
<style lang="less"></style>