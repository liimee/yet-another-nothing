<template>
<div class="_position:absolute _width:100% _height:100%" id="back">
  <Window v-for="(v, i) in windows" :p="v" :key="i" />
</div>
</template>

<script lang="ts" setup>
import {start, listen} from './core';
import Window from './Window.vue';
import {ref} from 'vue';

const windows = ref([]);

const props = defineProps(['su']);

start(props.su);

listen(v => windows.value = v, 'windowsChange')
</script>

<style scoped>
#back {
  background-image: url('assets/d.jpg');
  background-size: cover;
  background-position-y: bottom;
}
</style>