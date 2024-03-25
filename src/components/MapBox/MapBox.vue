<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { MapOptions, Map, LatLngExpression } from 'leaflet';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
import 'leaflet-gpx';
import startPng from '@/components/MapBox/icons/start.png';
import finishPng from '@/components/MapBox/icons/finish.png';
import shadowPng from '@/components/MapBox/icons/shadow.png';

const { id, startCoordinates, gpxUrl } = defineProps<{
  id: string;
  startCoordinates?: LatLngExpression;
  gpxUrl?: string;
}>();

const distance = ref<number>(0);
const elevation = ref<number>(0);

const mapId = `map-${id}`;
const myMap = ref<Map | null>(null);

const options: MapOptions = {
  zoom: 12,
  touchZoom: true,
  dragging: false,
};

if (startCoordinates) {
  options.center = L.latLng(startCoordinates);
}

onMounted(() => {
  if (myMap.value === null) {
    const initMap: Map = L.map(mapId, options);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      initMap,
    );
    L.control.fullscreen({}).addTo(initMap);

    if (gpxUrl) {
      new L.GPX(gpxUrl, {
        async: true,
        marker_options: {
          endIconUrl: finishPng,
          startIconUrl: startPng,
          shadowUrl: shadowPng,
        },
      })
        .on('loaded', event => {
          const gpxLayer = event.target;
          initMap.fitBounds(gpxLayer.getBounds());
          distance.value = Math.round(gpxLayer.get_distance() / 1000) / 10;
          elevation.value = Math.round(gpxLayer.get_elevation_gain());
        })
        .addTo(initMap);
    }

    if (startCoordinates) {
      L.marker(startCoordinates).addTo(initMap);
      myMap.value = initMap;
    }
  }
});

onUnmounted(() => {
  if (myMap.value) {
    myMap.value.remove();
    myMap.value = null;
  }
});
</script>
<template>
  <div>
    <div :id="mapId" class="map-container"></div>
    <div class="stats">
      <div v-show="gpxUrl">{{ `Distance: ${distance}km` }}</div>
      <div v-show="gpxUrl">{{ `Elevation gain: ${elevation}m` }}</div>
    </div>
  </div>
</template>
<style scoped>
.map-container {
  height: 400px;
}
.stats {
  display: flex;
  justify-content: space-between;
}
</style>