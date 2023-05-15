<template>
  <v-card>
    <datepicker
      inline
      v-model='date'
      language='ru'
      full-month-name
      monday-first
    ></datepicker>
    <v-card-actions class='d-flex align-center justify-end'>
      <v-btn variant='tonal' color='#0b6737' @click='select'>
        Выбрать
      </v-btn
      >
    </v-card-actions>

  </v-card>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Datepicker from 'vuejs3-datepicker';

export default defineComponent({
  name: 'CalenderMobile',
  emits: ['select-date'],
  props: ['startDate'],
  components: { Datepicker },
  setup(props, { emit }) {
    const date = ref(new Date(props.startDate.getTime()));

    function select() {
      emit('select-date', date);
    }

    return { date, select };
  }
});
</script>

<style>
.vuejs3-datepicker__calendar.vuejs3-green {
  margin-top: 0px !important;
}

.v-overlay__content .vuejs3-datepicker__calendar {
  box-shadow: none !important;
}
</style>
