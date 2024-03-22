<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import { map, latLng, tileLayer, control, marker } from 'leaflet';
import type { MapOptions, Map } from 'leaflet';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';

const { id, coordinates } = defineProps<{
  id: string;
  coordinates: [number, number];
}>();

const mapId = `map-${id}`;
const myMap = ref<Map | null>(null);

const options: MapOptions = {
  center: latLng(coordinates),
  zoom: 12,
  touchZoom: true,
  dragging: false,
};

onMounted(() => {
  if (myMap.value === null) {
    const initMap: Map = map(mapId, options);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      initMap,
    );
    control.fullscreen({}).addTo(initMap);
    marker(coordinates).addTo(initMap);
    myMap.value = initMap;
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
    <div :id="mapId" class="map-container" style="height: 400px"></div>
  </div>
</template>
<style scoped></style>
