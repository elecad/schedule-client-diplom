<template>
  <v-app>
    <navigation-draver-desktop
      :date='date'
      :favorites='favorites'
      @open-info='isInfo = !isInfo'
      @select-date='setDate'
      @remove-favorite='removeFavoriteAction'
    ></navigation-draver-desktop>

    <app-bar-mobile v-model:mobile-state='isMobileCalender' :isMobileCalender='isMobileCalender'
                    @open-info='isInfo = !isInfo' :startDate='date' :favorites='favorites'
                    @remove-favorite='removeFavoriteAction'
                    @select-date='setMobileDate'></app-bar-mobile>

    <v-main class='bg-grey-lighten-5 d-flex justify-center'>
      <v-container class='px-1 fix-max-width'>
        <header-schedule
          :scheduleDate='date'
          :scheduleHeader='schedule.header'
          :calenderLabel='getCalenderLabel()'
          :isThisScheduleFavorite='isThisScheduleFavorite'
          :isLoadingSchedule='isLoading'
          @now-date='nowWeek'
          @forward-date='nextWeek'
          @back-date='backWeek'
          @open-mobile-calender='isMobileCalender = !isMobileCalender'
          @favorite-click='actionFavorite'
        ></header-schedule>

        <copy-alert-schedule v-if='schedule.timeReceiving && !schedule.actual'
                             :get-time='schedule.timeReceiving'></copy-alert-schedule>

        <h3 v-if='isError' class='mt-13 text-center'>Ошибка запроса</h3>
        <loading-schedule v-else-if='isLoading'></loading-schedule>
        <schedule-list v-else-if='schedule.schedule.length' :scheduleResponse='schedule'></schedule-list>
        <h3 v-else class='mt-13 text-center'>Занятий нет</h3>

      </v-container>
    </v-main>

    <info-university v-model:state='isInfo'></info-university>
  </v-app>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import AppBarMobile from '@/components/app-bar-mobile.vue';
import NavigationDraverDesktop from '@/components/navigation-drawer-desktop.vue';
import useSchedule from '@/hooks/useSchedule';
import ScheduleList from '@/components/list-schedule.vue';
import InfoUniversity from '@/components/info-university.vue';
import HeaderSchedule from '@/components/header-schedule.vue';
import useFavorites, { Favorite } from '@/hooks/useFavorites';
import { useRoute } from 'vue-router';
import LoadingSchedule from '@/components/loading-schedule.vue';
import CopyAlertSchedule from '@/components/copy-alert-schedule.vue';

export default defineComponent({
  components: {
    CopyAlertSchedule,
    LoadingSchedule,
    ScheduleList,
    AppBarMobile,
    NavigationDraverDesktop,
    InfoUniversity,
    HeaderSchedule
  },
  setup(props) {
    const type = useRoute().name as 'g' | 't' | 'l';
    const id = useRoute().params.id as string;

    const isInfo = ref(false);
    const isMobileCalender = ref(false);
    const {
      date,
      nextWeek,
      backWeek,
      isLoading,
      isError,
      schedule,
      getCalenderLabel,
      nowWeek,
      setDate
    } = useSchedule();
    const { additionFavorite, removeFavorite, checkFavorite, favorites } = useFavorites();
    const isThisScheduleFavorite = ref(checkFavorite({ type, id }));

    function removeFavoriteAction(f: Favorite) {
      removeFavorite(f);
      isThisScheduleFavorite.value = checkFavorite({ type, id });
    }

    function actionFavorite() {
      if (isThisScheduleFavorite.value) {
        removeFavorite({ type, id });
      } else {
        additionFavorite({ type, id, label: schedule.value.header });
      }
      isThisScheduleFavorite.value = checkFavorite({ type, id });
    }

    function setMobileDate(date) {
      setDate(date.value);
      isMobileCalender.value = false;
    }

    return {
      isInfo,
      date,
      nextWeek,
      backWeek,
      schedule,
      getCalenderLabel,
      nowWeek,
      isMobileCalender,
      setDate,
      setMobileDate,
      isLoading,
      isThisScheduleFavorite,
      favorites,
      actionFavorite,
      removeFavoriteAction,
      isError
    };
  }
});
</script>

<style>
.fix-max-width {
  max-width: 900px !important;
}
</style>
