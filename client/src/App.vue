<template>
  <Transition mode='out-in'>
    <i-header key=1 v-if="lo" fullscreen cover id="header" class="_color:white _padding-left:4">
      <h1>Welcome</h1>
      <div class="_width:50%" style="min-width: 300px;">
        <i-form-group>
          <i-form-label>Password</i-form-label>
          <i-input v-model="pass" class="_margin-x:auto" type="password" />
        </i-form-group>
        <i-button type="submit" :loading="loading" @click="load" :disabled="loading" class="_margin-y:1" color="primary">
          <span>OK</span>
          <template #loading>
            <i-loader />
          </template>
        </i-button>
      </div>
    </i-header>
    <desktop key=2 :su="su" v-else />
  </Transition>
  <i-modal v-model="p" size="sm">
    <template #header>Failed :(</template>
    You probably didn't enter the right password, or the server is facing errors
  </i-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import desktop from './desktop.vue';

const loading = ref(false);
const lo = ref(true);
const p = ref(false);
const pass = ref('');
const su = ref('');

function load() {
  loading.value = true;
  fetch(import.meta.env.VITE_SERVER + '/su', {method: 'POST', headers: new Headers({
    'Content-Type': 'application/json'
  }), body: JSON.stringify({pass: pass.value})}).then(v => {
    if (v.status !== 200) {
      throw new Error("failed");
    } else {
      return v.json();
    }
  }).then(v => {
    lo.value = false;
    su.value = v.t;
  }).catch(() => { p.value = true; loading.value = false; })
}
</script>

<style lang="scss">
@import "@inkline/inkline/css/mixins";

#header {
  background-image: url("assets/h.jpg");
}

@include i-input() {
  ----background: hsla(0, 0%, 100%, 0.4) !important;
}
</style>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>