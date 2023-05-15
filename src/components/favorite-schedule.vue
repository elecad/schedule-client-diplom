<template>
  <v-card>
    <v-card-title>Избранное</v-card-title>
    <v-card-text class='pb-0'>
      <div
        v-if='!favorites.length'
        class='text-center mt-3 mb-6 text-body-2 text-grey-darken-1'
      >
        Здесь пока ничего нет
      </div>
      <router-link v-for='f in favorites' :to='`/${f.type}/${f.id}`'>
        <v-chip
          @click:close='$emit("remove-favorite", f)'
          :prepend-icon='setChipIcon(f.type)'
          :color='setChipColor(f.type)'
          class='mr-1 mb-1'
          :closable='isEdit'
          @click=''
        >{{ f.label }}
        </v-chip>
      </router-link>

    </v-card-text>

    <v-card-actions
      v-if='favorites.length'
      class='d-flex align-center justify-end'
    >
      <v-btn
        :icon="isEdit ? 'mdi-check' : 'mdi-pencil-outline'"
        color='#0b6737'
        variant='tonal'
        @click='isEdit = !isEdit'
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FaviriteSchedule',
  props: ['favorites'],
  emits: ['remove-favorite'],
  setup(props) {
    const isEdit = ref(false);
    console.log(props.favorites.value);


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
      setChipColor,
      setChipIcon,
      isEdit
    };
  }
});
</script>

<style scoped></style>
