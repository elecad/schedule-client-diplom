<template>
  <v-navigation-drawer touchless width='400' elevation='4' color='#f5f5f5' absolute>
    <v-container fluid class='d-flex justify-space-between align-center pb-0'>
      <div class='d-flex justify-center align-center'>
        <v-icon class='mr-5'>mdi-school-outline</v-icon>
        <div class='text-h6'>Расписание</div>
      </div>
      <div>
        <v-btn icon class='mr-3' elevation='1' @click='selectSession'>
          <v-icon>mdi-book-education-outline</v-icon>
        </v-btn>
        <v-btn icon elevation='1' @click='openInformation'>
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
      </div>
    </v-container>

    <v-container>
      <search-schedule></search-schedule>
    </v-container>

    <v-container>
      <datepicker
        inline
        :model-value='date'
        @input='input'
        language='ru'
        full-month-name
        monday-first
      ></datepicker>
    </v-container>

    <v-container>
      <favorite-schedule :favorites='favorites' @remove-favorite='removeFavorite'></favorite-schedule>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

import FavoriteSchedule from '@/components/favorite-schedule.vue';
import SearchSchedule from '@/components/search-schedule.vue';
import Datepicker from 'vuejs3-datepicker';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'NavigationDrawerDesktop',
  emits: ['open-info', 'schedule-date', 'select-date', 'remove-favorite'],
  props: ['date', 'favorites'],
  components: { SearchSchedule, Datepicker, FavoriteSchedule },
  setup(props, { emit }) {

    const { push } = useRouter();
    const { query, name, params, meta } = useRoute();

    function openInformation() {
      emit('open-info');
    }

    function input(newDate: Date) {
      emit('select-date', newDate);
    }

    function removeFavorite(f) {
      emit('remove-favorite', f);
    }

    function selectSession() {
      if (!meta.name) {
        push({ path: `/session/${name}/${params.id}` });
      }

    }

    return { openInformation, input, removeFavorite, selectSession };
  }
});
</script>

<style>
.vuejs3-datepicker .vuejs3-green {
  width: 100%;
}

.vuejs3-datepicker__calendar-topbar {
  background-color: #0b6737 !important;
}

.cell.day.selected {
  background-color: #0b6737 !important;
}
</style>
