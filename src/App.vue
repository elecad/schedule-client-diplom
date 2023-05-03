<template>
  <v-app>
    <navigation-draver-desktop></navigation-draver-desktop>

    <app-bar-mobile></app-bar-mobile>

    <v-main class="bg-grey-lighten-5">
      <v-container fluid> 123 </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import AppBarMobile from "@/components/app-bar-mobile.vue";
import NavigationDraverDesktop from "@/components/navigation-drawer-desktop.vue";

export default defineComponent({
  components: { AppBarMobile, NavigationDraverDesktop },
  setup(props) {
    const drawer = ref(true);

    return { drawer };
  },
});
</script>

<style></style>
