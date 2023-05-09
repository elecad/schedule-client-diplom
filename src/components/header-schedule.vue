<template>
  <v-card>
    <v-container class='d-flex align-center justify-space-between'>
      <h3>{{ scheduleHeader }}</h3>
      <v-btn icon='mdi-star-outline' variant='flat'></v-btn>
    </v-container>
    <v-divider class=''></v-divider>
    <v-container class='d-flex align-center justify-center'>
      <v-btn-group variant='text'>
        <v-btn icon='mdi-chevron-left' @click='back'></v-btn>
        <v-btn
          @click='click'
          :prepend-icon="mobile ? 'mdi-calendar-clock-outline' : ''"
        >{{ mobile ? calenderLabel : 'Текущая неделя' }}
        </v-btn>
        <v-btn icon='mdi-chevron-right' @click='forward'></v-btn>
      </v-btn-group>
    </v-container>
  </v-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useDisplay } from 'vuetify';

export default defineComponent({
  name: 'HeaderSchedule',
  props: ['scheduleDate', 'scheduleHeader', 'calenderLabel'],
  emits: ['forward-date', 'back-date', 'now-date', 'open-mobile-calender'],
  setup(props, { emit }) {
    const { mobile } = useDisplay();

    function forward() {
      emit('forward-date');
    }

    function back() {
      emit('back-date');
    }

    function click() {
      if (mobile.value) {
        // Открыть алерт
        emit('open-mobile-calender');
      } else {
        emit('now-date');
        // Перейти на текущую неделю
      }
    }

    return { mobile, forward, back, click };
  }
});
</script>

<style scoped></style>
