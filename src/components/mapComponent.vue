<template>
  <div id="map">
    <div id="thumbnail">
      <ul @click="showMap">
        <li id="1"><img src="../image/vec_c.png" alt="矢量缩略图"></li>
        <li id="2"><img src="../image/img_c.png" alt="影像缩略图"></li>
        <li id="3"><img src="../image/ter_c.png" alt="地形缩略图"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { getWidth, getTopLeft } from 'ol/extent.js';
import TileLayer from 'ol/layer/Tile.js';
import { get as getProjection } from 'ol/proj.js';
import WMTS from 'ol/source/WMTS.js';
import WMTSTileGrid from 'ol/tilegrid/WMTS.js';


export default {
  data() {
    return {
      // 天地图底图、注记 WMTS的 layer 和 matrixSet 参数
      urlLayer: 'vec',
      urlMatrixSet: 'c',
      cvaLayer: 'cva'
    }
  },
  mounted() {
    console.log("触发了mounted");
    // this.createMap()
  },
  updated() {
    console.log('触发了updated');
    // this.createMap()
  },
  methods: {
    createMap() {
      var projection = getProjection('EPSG:4326');
      var projectionExtent = projection.getExtent();
      // 天地图底图、注记请求url
      var urlMap = 'http://t0.tianditu.gov.cn/' + this.urlLayer + '_' + this.urlMatrixSet + '/wmts?tk=37d614f39eb9dcfa72b2f1ab5aff22ff';
      var urlCva = 'http://t0.tianditu.gov.cn/' + this.cvaLayer + '_' + this.urlMatrixSet + '/wmts?tk=37d614f39eb9dcfa72b2f1ab5aff22ff';
      var size = getWidth(projectionExtent) / 256;
      var resolutions = new Array(19);
      var matrixIds = new Array(19);
      for (var z = 0; z < resolutions.length; ++z) {
        // 计算分辨率数组和矩阵id数组
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
      }
      // 地图底图图层
      var mapLayer = new TileLayer({
        opacity: 0.7,
        source: new WMTS({
          attributions: 'Tiles © <a href="http://www.tianditu.com">天地图有限公司</a>',
          url: urlMap,
          layer: this.urlLayer,
          matrixSet: this.urlMatrixSet,
          format: 'tiles',
          projection: projection,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds
          }),
          style: 'default',
          wrapX: true
        })
      });
      // 地图注记图层
      var cvaLayer = new TileLayer({

        source: new WMTS({
          attributions: 'Tiles © <a href="http://www.tianditu.com">天地图有限公司</a>',
          url: urlCva,
          layer: this.cvaLayer,
          matrixSet: this.urlMatrixSet,
          format: 'tiles',
          projection: projection,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds
          }),
          style: 'default',
          wrapX: true
        })
      })

      new Map({
        layers: [
          mapLayer, cvaLayer
        ],
        target: 'map',
        view: new View({
          center: [-11158582, 4813697],
          // extent: projectionExtent,
          minZoom: 3,
          zoom: 3
        })
      });
    },
    showMap(e) {
      // console.log(e.target.parentNode);
      var li = e.target.parentNode;
      switch (li.id) {
        case '1':
          this.urlLayer = 'vec';
          this.urlMatrixSet = 'c';
          this.cvaLayer = 'cva';
          break;
        case '2':
          this.urlLayer = 'img';
          this.urlMatrixSet = 'c';
          this.cvaLayer = 'cia';
          break;
        case '3':
          this.urlLayer = 'ter';
          this.urlMatrixSet = 'c';
          this.cvaLayer = 'cta';
          break;
      }
      console.log(this.urlLayer);
    }
  }
}
</script>
<style lang="less">
#map {
  width: 100%;
  height: 100vh;
  position: relative;

  #thumbnail {
    position: absolute;
    z-index: 10;
    left: 5vh;
    bottom: 5vh;
    opacity: 0.5;

    ul {
      padding: 0;
      margin: 0;

      li {
        list-style-type: none;

        &:hover {
          opacity: 1;
        }

        img {
          width: 10vh;
          height: 10vh;
        }
      }
    }
  }
}
</style>