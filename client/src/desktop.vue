<template>
<div class="_position:absolute _width:100% _height:100%" id="back"></div>
</template>

<script lang="ts" setup>
import {start} from './core';

const props = defineProps(['su']);

start(props.su);
</script>

<style scoped>
#back {
  background-image: url('assets/d.jpg');
  background-size: cover;
  background-position-y: bottom;
}
</style>