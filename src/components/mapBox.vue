<template>
  <div id="mapBox">

    <mapComponent></mapComponent>

    <div id="thumbnail">
      <ul>
        <li><img src="../image/vec_c.png" alt="矢量缩略图"></li>
        <li><img src="../image/img_c.png" alt="影像缩略图"></li>
        <li><img src="../image/ter_c.png" alt="地形缩略图"></li>
      </ul>
    </div>

  </div>
</template>
<script>
import mapComponent from './mapComponent.vue';
export default {
  components: {
    mapComponent
  }
}
</script>
<style lang="less">
#mapBox {
  position: relative;
  overflow: hidden;

  #thumbnail {
    position: absolute;

    ul {

      li {
        list-style-type: none;

        img {
          width: 5vw;
          height: 5vw;
        }

      }
    }

  }
}
</style>