<template>
  <div class="_position:absolute _width:100% _height:100%" id="back">
    <Window v-for="v in windows" :p="v" :key="v.gid" />
    <i-button
      class="_position:fixed-bottom _left:50%"
      :style="{
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '16px'
      }"
      @click="op = !op"
    >
      <i-icon name="ink-chevron-down" class="_margin-right:1/4" :style="{
        transform: op ? 'none' : 'rotate(180deg) translateY(-2px)',
        transition: 'transform .2s'
      }" />Home
    </i-button>
    <Transition name="home">
      <div
        v-if="op"
        class="_width:100% _height:100% _position:fixed"
        :style="{ backgroundColor: 'hsla(192, 11%, 91%, 0.5)' }"
      ></div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { start, listen, type window } from './core';
import Window from './Window.vue';
import { ref, type Ref } from 'vue';

let windows: Ref<window[]> = ref([]);

const props = defineProps(['su']);

const op = ref(false);

start(props.su);

listen(v => {
  windows.value = [...v[0]];
}, 'windowsChange', 'desktop')
</script>

<style scoped>
#back {
  background-image: url("assets/d.jpg");
  background-size: cover;
  background-position-y: bottom;
}

.home-enter-active,
.home-leave-active {
  transition: bottom .3s ease;
}

.home-enter-to,
.home-leave-from {
  bottom: 0;
}

.home-enter-from,
.home-leave-to {
  bottom: -100vh;
}
</style>