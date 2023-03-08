<template>
  <div id="map">
    <div id="thumbnail">
      <div id="note">
        <label><input type="checkbox" @change="noteCheck = !noteCheck" :checked="noteCheck"><span>隐藏注记层</span></label>
      </div>
      <ul @click="showMap">
        <li id="1">
          <img src="../image/vec_c.png" alt="矢量缩略图">
        </li>
        <li id="2">
          <img src="../image/img_c.png" alt="影像缩略图">
        </li>
        <li id="3">
          
          <img src="../image/ter_c.png" alt="地形缩略图">
        </li>
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
      map: null,
      // 天地图底图、注记 WMTS的 layer 和 matrixSet 参数
      urlLayer: 'vec',
      urlMatrixSet: 'c',
      cvaLayer: 'cva',

      // 定义map所需参数
      projection: getProjection('EPSG:4326'),
      // 是否隐藏注记
      noteCheck: false
    }
  },
  computed:{
    // 投影范围
    projectionExtent(){
      return this.projection.getExtent();
    },
    // 天地图底图、注记请求url
    urlMap(){
      return 'http://t0.tianditu.gov.cn/' + this.urlLayer + '_' + this.urlMatrixSet + '/wmts?tk=37d614f39eb9dcfa72b2f1ab5aff22ff';
    },
    urlCva(){
      return 'http://t0.tianditu.gov.cn/' + this.cvaLayer + '_' + this.urlMatrixSet + '/wmts?tk=37d614f39eb9dcfa72b2f1ab5aff22ff';
    },
    // 计算分辨率数组和矩阵id数组
    matrixArr(){
      let resolutions = new Array(19);
      let matrixIds = new Array(19);
      let size = getWidth(this.projectionExtent) / 256;
      for (var z = 0; z < resolutions.length; ++z) {
        // 计算分辨率数组和矩阵id数组
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
      }
      return {
        resolutions,
        matrixIds
      }
    },
    // 获取成对的WMTS图层
    layer(){
      // 地图底图图层
      let mapLayer = new TileLayer({
        source: new WMTS({
          attributions: 'Tiles © <a href="http://www.tianditu.com">天地图有限公司</a>',
          url: this.urlMap,
          layer: this.urlLayer,
          matrixSet: this.urlMatrixSet,
          format: 'tiles',
          projection: this.projection,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(this.projectionExtent),
            resolutions: this.matrixArr.resolutions,
            matrixIds: this.matrixArr.matrixIds
          }),
          style: 'default',
          wrapX: true
        })
      });
      // 地图注记图层
      let cvaLayer = new TileLayer({
        source: new WMTS({
          attributions: 'Tiles © <a href="http://www.tianditu.com">天地图有限公司</a>',
          url: this.urlCva,
          layer: this.cvaLayer,
          matrixSet: this.urlMatrixSet,
          format: 'tiles',
          projection: this.projection,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(this.projectionExtent),
            resolutions: this.matrixArr.resolutions,
            matrixIds: this.matrixArr.matrixIds
          }),
          style: 'default',
          wrapX: true
        })
      });

      return [mapLayer,cvaLayer]
    }

  },
  watch:{
    // 监听input选择框，显示、隐藏注记
    noteCheck(newVal){
      switch(newVal){
        case true:
          this.hideNote(this.layer);
          break;
        case false: 
          this.showNote(this.layer);
          break;
      }
    }
  },
  mounted() {
    this.createMap()
  },
  methods: {
    createMap() {
      this.map = new Map({
        layers: this.layer,
        target: 'map',
        view: new View({
          center: [51158582, 4813697],
          // extent: projectionExtent,
          minZoom: 3,
          zoom: 3
        })
      });
    },
    // 点击缩略图切换图层显示
    showMap(e) {
      let li = e.target.parentNode;
      let lis = e.currentTarget.children;
      // 点击缩略图后的样式设置
      for(let i = 0;i < lis.length; i++){
        lis[i].style = "opacity: 0.3"
      }
      li.style = "opacity:1";

      switch (li.id) {
        case '1':
          this.removeLayer(this.map,this.layer);
          this.urlLayer = 'vec';
          this.urlMatrixSet = 'c';
          this.cvaLayer = 'cva';
          this.addLayer(this.map,this.layer);
          break;
        case '2':
          this.removeLayer(this.map,this.layer);
          this.urlLayer = 'img';
          this.urlMatrixSet = 'c';
          this.cvaLayer = 'cia';
          this.addLayer(this.map,this.layer);
          break;
        case '3':
          this.removeLayer(this.map,this.layer);
          this.urlLayer = 'ter';
          this.urlMatrixSet = 'c';
          this.cvaLayer = 'cta';
          this.addLayer(this.map,this.layer);
          break;
      }
    },
    // 移除图层
    removeLayer(map,layers){
      layers.forEach(el => {
        map.removeLayer(el)
      });
    },
    // 添加图层
    addLayer(map,layers){
      layers.forEach(el => {
        map.addLayer(el)
      })
    },
    // 显示注记图层
    showNote(layers){
      layers[layers.length - 1].setVisible(true)
    },
    // 隐藏注记图层
    hideNote(layers){
      layers[layers.length - 1].setVisible(false)
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
    
    #note {
      label {
        // line-height: 1vh;
        color: #ccc;
        
        &:hover {
          color:#000;
        }
        
        input {
          height: 1.2vh;
        }

        span {
          font-size: 1.5vh;
        }
      }
    }

    ul {
      padding: 0;
      margin: 0;

      li {
        list-style-type: none;
        cursor: pointer;
        opacity: 0.3;
        &:first-child {
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