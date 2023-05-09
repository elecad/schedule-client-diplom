<template>
  <v-card>
    <v-card-title>Избранное</v-card-title>
    <v-card-text class="pb-0">
      <div
        v-if="!favorites.length"
        class="text-center mt-3 mb-6 text-body-2 text-grey-darken-1"
      >
        Здесь пока ничего нет
      </div>
      <v-chip
        v-for="f in favorites"
        @click:close="removeFavorite(f)"
        :prepend-icon="setChipIcon(f.type)"
        :color="setChipColor(f.type)"
        class="mr-1 mb-1"
        :closable="isEdit"
        >{{ f.label }}</v-chip
      >
    </v-card-text>

    <v-card-actions
      v-if="favorites.length"
      class="d-flex align-center justify-end"
    >
      <v-btn
        :icon="isEdit ? 'mdi-check' : 'mdi-pencil-outline'"
        color="#0b6737"
        variant="tonal"
        @click="isEdit = !isEdit"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import useFavorites from '@/hooks/useFavorites';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FaviriteSchedule',
  setup() {
    const isEdit = ref(false);
    const { favorites, additionFavorite, removeFavorite } = useFavorites();

    // setTimeout(() => {
    //   additionFavorite({ id: '1', label: '12001902', type: 'g' });
    // }, 2000);

    function setChipColor(type: 'g' | 't' | 'l') {
      let color = '';
      switch (type) {
        case 'g':
          color = 'purple-darken-1';
          break;
        case 't':
          color = 'light-blue-darken-1';
          break;
        case 'l':
          color = 'teal-darken-1';
          break;
      }
      return color;
    }

    function setChipIcon(type: 'g' | 't' | 'l') {
      let icon = '';
      switch (type) {
        case 'g':
          icon = 'mdi-account-group-outline';
          break;
        case 't':
          icon = 'mdi-account';
          break;
        case 'l':
          icon = 'mdi-map-marker';
          break;
      }
      return icon;
    }
    return {
      favorites,
      setChipColor,
      setChipIcon,
      isEdit,
      removeFavorite,
    };
  },
});
</script>

<style scoped></style>
