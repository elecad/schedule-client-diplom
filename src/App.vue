<template>
  <v-app>
    <router-view :key='$route.path'></router-view>
  </v-app>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  setup(props) {
  }
});
</script>

<style>
.fix-max-width {
  max-width: 900px !important;
}
</style>
