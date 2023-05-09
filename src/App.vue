<template>
  <v-app>
    <navigation-draver-desktop
      @open-info='isInfo = !isInfo'
    ></navigation-draver-desktop>

    <app-bar-mobile v-model:mobile-state='isMobileCalender' :isMobileCalender='isMobileCalender'
                    @open-info='isInfo = !isInfo'></app-bar-mobile>

    <v-main class='bg-grey-lighten-5 d-flex justify-center'>
      <v-container class='px-1 fix-max-width'>
        <header-schedule
          :scheduleDate='date'
          :scheduleHeader='schedule.header'
          :calenderLabel='getCalenderLabel()'
          @now-date='nowWeek'
          @forward-date='nextWeek'
          @back-date='backWeek'
          @open-mobile-calender='isMobileCalender = !isMobileCalender'
        ></header-schedule>
      </v-container>
    </v-main>

    <info-university v-model:state='isInfo'></info-university>
  </v-app>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import AppBarMobile from '@/components/app-bar-mobile.vue';
import NavigationDraverDesktop from '@/components/navigation-drawer-desktop.vue';
import InfoUniversity from './components/info-university.vue';
import HeaderSchedule from './components/header-schedule.vue';
import useSchedule from '@/hooks/useSchedule';

export default defineComponent({
  components: {
    AppBarMobile,
    NavigationDraverDesktop,
    InfoUniversity,
    HeaderSchedule
  },
  setup(props) {
    const isInfo = ref(false);
    const isMobileCalender = ref(false);
    const { date, nextWeek, backWeek, isLoading, schedule, getCalenderLabel, nowWeek } = useSchedule();


    return { isInfo, date, nextWeek, backWeek, schedule, getCalenderLabel, nowWeek, isMobileCalender };
  }
});
</script>

<style>
.fix-max-width {
  max-width: 900px !important;
}
</style>
