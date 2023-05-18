<template>
  <v-alert
    density='compact'
    type='warning'
    class='mt-3'
  >
    <v-alert-title>Копия расписания</v-alert-title>
    В данный момент официальный сайт университета недоступен. Показана сохранённая копия расписания за {{ getDateTime()
    }}
  </v-alert>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['getTime'],
  setup(props) {
    function getDateTime() {
      const date = new Date(props.getTime);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }

    return { getDateTime };
  }
});
</script>

<style scoped>

</style>
