<template>
  <div
    ref="win"
    :style="{ left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', padding: '6px', minWidth: '200px', minHeight: '200px', zIndex: z }"
    class="_position:absolute"
    @click="$emit('p')"
  >
    <i-card class="_width:100% _height:100%">
      <template #header>
        <div class="handle _display:flex">
          <i-button-group class="btns">
            <i-button color="danger" size="sm" @click="close" title="Close">
              <i-icon size="sm" name="ink-times" />
            </i-button>
            <i-button color="info" size="sm">
              <i-icon size="sm" name="ink-minus" />
            </i-button>
          </i-button-group>
          <span
            class="_align-items:center _display:flex _justify-content:center _margin-x:1 _flex:fill _text:truncate"
          >{{ props.p.title }}</span>
        </div>
      </template>
      <div ref="winc" class="co"></div>
    </i-card>
  </div>
</template>

<style lang="scss">
@import "@inkline/inkline/css/mixins";

@include i-card() {
  ----padding-top: 0 !important;
  ----padding-left: 0 !important;
  ----padding-right: 0 !important;
  ----padding-bottom: 0 !important;

  ----border-top-left-radius: 6px !important;
  ----border-top-right-radius: 6px !important;
  ----border-bottom-left-radius: 6px !important;
  ----border-bottom-right-radius: 6px !important;
}

.handle {
  padding: 6px 16px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.co {
  overflow-x: auto;
}
</style>

<script setup lang="ts">
import interact from 'interactjs';
import { onMounted, ref, type Ref } from 'vue';
import { closeWin } from './core';

const props = defineProps(['p']);
const emit = defineEmits(['p'])

const x = ref(0)
const y = ref(0)
const h = ref(200)
const w = ref(400)
const z = ref(1);

function last(a: number) {
  z.value = a;
}

defineExpose({
  k: props.p.gid,
  last
})

const win = ref(null) as Ref<unknown> as Ref<HTMLElement>
const winc = ref(null) as Ref<unknown> as Ref<HTMLElement>

onMounted(() => {
  interact(win.value).draggable({
    listeners: {
      start() {
        emit('p')
      },
      move(event) {
        x.value += event.dx
        y.value += event.dy
      }
    },
    modifiers: [interact.modifiers.restrict({
      restriction: 'parent'
    })],
    allowFrom: '.handle',
    ignoreFrom: '.btns'
  }).resizable({
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move: function (event) {
        const a = x.value + event.deltaRect.left
        const b = y.value + event.deltaRect.top

        if(event.rect.width>=200) {
          x.value = a;
          w.value = event.rect.width;
        }
        
        if(event.rect.height>=200) {
          y.value = b;
          h.value = event.rect.height;
        }
      }
    }
  });

  props.p.render(winc.value);
})

function close() {
  closeWin(props.p.gid);
}
</script>