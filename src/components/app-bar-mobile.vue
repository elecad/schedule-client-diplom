<template>
  <v-app-bar class='hidden-md-and-up' v-if='!isSearch'>
    <v-app-bar-nav-icon>
      <v-icon>mdi-school-outline</v-icon>
    </v-app-bar-nav-icon>

    <v-app-bar-title>Расписание</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click='isFavorite = !isFavorite'>
      <v-icon>mdi-book-heart-outline</v-icon>
    </v-btn>

    <v-menu transition='slide-y-transition'>
      <template v-slot:activator='{ props }'>
        <v-btn v-bind='props' icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click='isSearch = !isSearch'>
          <template v-slot:prepend>
            <v-icon>mdi-magnify</v-icon>
          </template>
          <v-list-item-title>Поиск</v-list-item-title>
        </v-list-item>

        <v-list-item @click='selectSession'>
          <template v-slot:prepend>
            <v-icon>mdi-book-education-outline</v-icon>
          </template>
          <v-list-item-title>Сессия</v-list-item-title>
        </v-list-item>

        <v-list-item @click='openInformation'>
          <template v-slot:prepend>
            <v-icon>mdi-information-outline</v-icon>
          </template>
          <v-list-item-title>Информация</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  <v-app-bar class='hidden-md-and-up' v-else>
    <v-btn icon @click='isSearch = !isSearch'>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <search-schedule class='pr-3'></search-schedule>
  </v-app-bar>

  <v-dialog v-model='isFavorite' max-width='450px'>
    <favoriteSchedule :favorites='favorites' @remove-favorite='removeFavorite'></favoriteSchedule
    >
  </v-dialog>

  <v-dialog :model-value='mobileState' @update:model-value='update($event)' max-width='450px'>
    <calender-mobile :startDate='startDate' @select-date='selectDate'></calender-mobile>
  </v-dialog>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import searchSchedule from '@/components/search-schedule.vue';
import FavoriteSchedule from './favorite-schedule.vue';
import Datepicker from 'vuejs3-datepicker';
import CalenderMobile from '@/components/calender-mobile.vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'AppBarMobile',
  components: { searchSchedule, FavoriteSchedule, Datepicker, CalenderMobile },
  emits: ['open-info', 'schedule-date', 'update:mobileState', 'select-date', 'remove-favorite'],
  props: ['isMobileCalender', 'mobileState', 'startDate', 'favorites'],
  setup(props, { emit }) {
    const isSearch = ref(false);
    const isFavorite = ref(false);

    const { push } = useRouter();
    const { query, name, params } = useRoute();


    function openInformation() {
      emit('open-info');
    }

    function selectDate(date) {
      emit('select-date', date);
    }

    function removeFavorite(f) {
      emit('remove-favorite', f);
    }

    function selectSession() {
      push({ path: `/session/${name}/${params.id}` });
    }


    function update(value: boolean) {
      emit('update:mobileState', value);
    }

    return { isSearch, isFavorite, openInformation, update, selectDate, removeFavorite, selectSession };
  }
});
</script>

<style>
@media (min-width: 960px) {
  .v-main {
    padding-top: 0px !important;
  }
}
</style>
