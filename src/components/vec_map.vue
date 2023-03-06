<template>
  <div id="map"></div>
</template>
<script>
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import WMTS from 'ol/source/WMTS';

// http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=您的密钥


export default {
  data() {
    return {
      map: null,
      url_init: 'http://t0.tianditu.gov.cn/img_w/wmts?',

    }
  },
  computed: {

  },
  mounted() {
    createMap()
  },
  methods: {
    createMap() {
      this.map = new Map({
        Layers: [
          new TileLayer({
            new WMTS({

            }),
          }),
        ],
        view: {

        }
      })
    }
  }
}
</script>
<style lang="less"></style>