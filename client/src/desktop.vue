<template>
  <div class="_position:absolute _width:100% _height:100%" id="back">
    <Window v-for="v in windows" :p="v" :key="v.gid" ref="iref" @p="() => gmt(v.gid)" />
    <div
      class="_position:fixed-bottom"
      :style="{
        left: '16px',
        marginBottom: '16px',
        width: 'max-content'
      }"
    >
      <i-dropdown placement="top-start">
        <i-button>
          <i-icon
            name="ink-chevron-down"
            class="_margin-right:1/4"
            style="transform: rotate(180deg) translateY(-2px)"
          />Menu
        </i-button>
        <template #header>Menu</template>
        <template #body>
          <i-dropdown-item v-for="(v, i) in entries" :key="i" @click="v.onClick">
          <img :src="v.icon" v-if="v.icon!=null" style="width:2em;height:2em;" class="_margin-right:1/2" />
          <span class="_vertical-align:middle _text:truncate _display:inline-block" style="max-width: 400px;" :title="v.title">{{ v.title }}</span>
          </i-dropdown-item>
        </template>
      </i-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { start, listen, type window, type desktopEntry } from './core';
import Window from './Window.vue';
import { ref, type Ref } from 'vue';

let windows: Ref<window[]> = ref([]);
let entries: Ref<desktopEntry[]> = ref([]);

const props = defineProps(['su']);
const iref: Ref<{ k: number, last: (arg0: number) => void }[]> = ref([])

var last = 1;

function gmt(i: number) {
  last++;

  console.log(iref.value)
  iref.value.find(v => v.k === i)?.last(last);
}

start(props.su);

listen(v => {
  windows.value = [...v[0]];
}, 'windowsChange', 'desktop');

listen(v => {
  entries.value = [...v[0]]
}, 'desktopEntries', 'desktop');
</script>

<style scoped>
#back {
  background-image: url("assets/d.jpg");
  background-size: cover;
  background-position-y: bottom;
}
</style>