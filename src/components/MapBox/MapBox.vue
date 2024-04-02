<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { MapOptions, Map, LatLngExpression, LatLng } from 'leaflet';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
import 'leaflet-gpx';
import startPng from '@/components/MapBox/icons/start.png';
import finishPng from '@/components/MapBox/icons/finish.png';
import shadowPng from '@/components/MapBox/icons/shadow.png';
import { v4 as uuidv4 } from 'uuid';

const TILES_FORMAT = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const { id, startCoordinates, gpxData, pickerMode } = defineProps<{
  id: string;
  startCoordinates?: LatLngExpression;
  gpxData?: string | undefined;
  pickerMode?: boolean;
}>();

const emit = defineEmits({
  setCoords: (value: LatLng) => value,
});

const distance = ref<number>(0);
const elevation = ref<number>(0);

const mapId = `map-${id}-${uuidv4()}`;
const myMap = ref<Map | null>(null);
const markers = ref<L.Marker[]>([]);
const gpxLayers = ref<L.Layer[]>([]);
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
    try {
      const initMap: Map = L.map(mapId, options);
      L.tileLayer(TILES_FORMAT).addTo(initMap);
      L.control.fullscreen({}).addTo(initMap);
      if (gpxData) {
        const gpxLayer = new L.GPX(gpxData, {
          async: true,
          marker_options: {
            endIconUrl: finishPng,
            startIconUrl: startPng,
            shadowUrl: shadowPng,
          },
        }).addTo(initMap);
        gpxLayer.on('loaded', event => {
          const bounds = event.target.getBounds();
          initMap.fitBounds(bounds);
          distance.value = Math.round(event.target.get_distance() / 1000);
          elevation.value = Math.round(event.target.get_elevation_gain());
        });

        gpxLayers.value.push(gpxLayer);
      }
      myMap.value = initMap;

      if (startCoordinates) {
        let marker = L.marker(startCoordinates).addTo(initMap);
        markers.value.push(marker);
        myMap.value = initMap;
        if (pickerMode) {
          myMap.value.on('click', event => {
            markers.value.forEach(mark => mark.remove());
            markers.value = [];
            marker = L.marker(event.latlng).addTo(initMap);
            markers.value.push(marker);
            emit('setCoords', event.latlng);
          });
        }
      }
    } catch (error) {
      console.error('Map loading error: ', error);
    }
  }
});

onUnmounted(() => {
  if (myMap.value) {
    markers.value.forEach(marker => marker.remove());
    markers.value = [];

    gpxLayers.value.forEach(layer => {
      if (myMap.value && layer instanceof L.Layer) {
        myMap.value.removeLayer(layer);
      }
    });
    gpxLayers.value = [];

    myMap.value.off();
    myMap.value.remove();
    myMap.value = null;
  }
});
</script>
<template>
  <div>
    <div :id="mapId" class="map-container"></div>
    <div class="stats">
      <div v-show="gpxData">{{ `Distance: ${distance}km` }}</div>
      <div v-show="gpxData">{{ `Elevation gain: ${elevation}m` }}</div>
    </div>
  </div>
</template>
<style scoped>
.map-container {
  height: 400px;
  z-index: 0;
}
.stats {
  display: flex;
  justify-content: space-between;
}
</style>
