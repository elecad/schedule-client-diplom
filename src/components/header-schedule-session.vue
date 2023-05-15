<template>
  <v-card>
    <v-container class='d-flex align-center justify-space-between'>
      <v-progress-linear v-if='isLoadingSchedule' indeterminate color='#0b6737'></v-progress-linear>
      <h2 v-else>{{ scheduleHeader }}</h2>
    </v-container>
    <v-divider class=''></v-divider>
    <v-container class='d-flex align-center justify-center'>
      <v-btn @click='back' variant='tonal' color='#0b6737'>Вернуться к расписанию</v-btn>
    </v-container>
  </v-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useDisplay } from 'vuetify';

export default defineComponent({
  name: 'HeaderScheduleSession',
  props: ['scheduleDate', 'scheduleHeader', 'calenderLabel', 'isThisScheduleFavorite', 'isLoadingSchedule'],
  emits: ['forward-date', 'back-date', 'now-date', 'open-mobile-calender', 'favorite-click'],
  setup(props, { emit }) {


    const { mobile } = useDisplay();

    function favoriteClick() {
      emit('favorite-click');
    }


    function back() {
      // emit('back-date');
    }

    return { mobile, back, favoriteClick };
  }
});
</script>

<style scoped></style>
