<template>
  <v-app>
    <navigation-draver-desktop
      :favorites='favorites'
      @open-info='isInfo = !isInfo'
      @remove-favorite='removeFavoriteAction'
      :date='new Date()'
    ></navigation-draver-desktop>

    <app-bar-mobile v-model:mobile-state='isMobileCalender' :isMobileCalender='isMobileCalender'
                    @open-info='isInfo = !isInfo' :startDate='new Date()' :favorites='favorites'
                    @remove-favorite='removeFavoriteAction'
    ></app-bar-mobile>

    <v-main class='bg-grey-lighten-5 d-flex justify-center'>
      <v-container class='px-1 fix-max-width'>
        <header-schedule-session
          :scheduleHeader='schedule.header'
          :isLoadingSchedule='isLoading'
        ></header-schedule-session>

        <loading-schedule v-if='isLoading'></loading-schedule>
        <schedule-list v-else-if='schedule.schedule.length' :scheduleResponse='schedule'></schedule-list>
        <h3 v-else class='mt-13'>Занятий нет</h3>
      </v-container>
    </v-main>

    <info-university v-model:state='isInfo'></info-university>
  </v-app>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import AppBarMobile from '@/components/app-bar-mobile.vue';
import NavigationDraverDesktop from '@/components/navigation-drawer-desktop.vue';
import ScheduleList from '@/components/list-schedule.vue';
import InfoUniversity from '@/components/info-university.vue';
import useFavorites, { Favorite } from '@/hooks/useFavorites';
import { useRoute } from 'vue-router';
import LoadingSchedule from '@/components/loading-schedule.vue';
import HeaderScheduleSession from '@/components/header-schedule-session.vue';
import useScheduleSession from '@/hooks/useScheduleSession';

export default defineComponent({
  components: {
    LoadingSchedule,
    ScheduleList,
    AppBarMobile,
    NavigationDraverDesktop,
    InfoUniversity,
    HeaderScheduleSession
  },
  setup(props) {
    let type = useRoute().name as 'g' | 't' | 'l';
    const id = useRoute().params.id as string;

    const isInfo = ref(false);
    const isMobileCalender = ref(false);
    const { schedule, isLoading } = useScheduleSession();
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


    return {
      isInfo,
      schedule,
      isMobileCalender,
      isLoading,
      isThisScheduleFavorite,
      favorites,
      actionFavorite,
      removeFavoriteAction
    };
  }
});
</script>

<style>
.fix-max-width {
  max-width: 900px !important;
}
</style>
