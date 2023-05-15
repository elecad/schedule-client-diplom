<template>
  <v-container v-for='day in scheduleResponse?.schedule' class='pa-0'>
    <!-- Заголовок для-->
    <v-card
      color='#0b6737'
      class='py-3 px-6 my-3 text-white d-flex align-center'
    >
      <h4>{{ day.name }}</h4>
      <v-spacer></v-spacer>
      <h5>{{ day.date }}</h5>
    </v-card>
    <!-- Занятие -->
    <v-expansion-panels v-for='pair in day.pairs' class='mb-3' accordion>
      <v-expansion-panel v-for='lesson in pair.lessons'
                         :class='{"now-lesson": isNowLesson(pair), "today-lesson": isTodayLesson(day.date)}'>
        <v-expansion-panel-title class='pa-1 pr-4 d-flex'>
          <div
            class='px-3 d-flex flex-column align-center justify-space-around'
          >
            <div class='start-time mb-2'>
              {{ getTimeString(pair.times.start) }}
            </div>
            <div class='number font-weight-bold'>{{ pair.number }}</div>
            <div class='end-time mt-2'>
              {{ getTimeString(pair.times.end) }}
            </div>
          </div>
          <v-divider vertical></v-divider>
          <div class='pa-2'>
            <div class='types mb-2'>
              <v-chip
                v-for='type in lesson.types'
                class='mx-1'
                color='#0b6737'
              >{{ type }}
              </v-chip
              >
            </div>
            <div class='discipline font-weight-bold'>
              {{ lesson.discipline }}
            </div>
            <div
              v-for='characteristic in lesson.characteristics'
              class='characteristic d-flex align-center justify-start my-2'
            >
              <v-icon class='mr-3'>{{ setIcon(characteristic.type) }}</v-icon>
              <div class='characteristic-text'>{{ characteristic.text }}</div>
            </div>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div
            v-for='characteristic in lesson.characteristics'
            class='characteristic d-flex align-center justify-start my-2'
          >
            <v-icon class='mr-3'>{{ setIcon(characteristic.type) }}</v-icon>
            <div class='characteristic-text'>{{ characteristic.info }}</div>
          </div>
          <div class='d-flex align-center justify-space-between'>

            <div class='d-flex align-center flex-nowrap mt-2'>
              <router-link v-for='characteristic in lesson.characteristics'
                           :to='`/${characteristic.type}/${characteristic.id}`'>
                <v-btn :icon='setIcon(characteristic.type)'
                       color='#0b6737' class='text-white mx-1'></v-btn>
              </router-link>

            </div>

            <div class='d-flex align-center justify-end flex-wrap'>
              <v-btn v-for='course in lesson.courses' :href='course.link' color='#0b6737' class='text-white mx-1 my-1'>
                {{ course.name }}
              </v-btn>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref } from 'vue';
import { Pair, ScheduleResponse } from '@/hooks/useSchedule';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ScheduleList',
  props: {
    scheduleResponse: Object as PropType<ScheduleResponse>
  },
  setup(props) {
    const { push } = useRouter();
    const nowObject = ref(new Date());

    setUpdateAndNotificationTimer();

    function isTodayLesson(day: string) {
      return day == nowObject.value.toLocaleDateString();
    }

    function isNowLesson(pair: Pair) {
      const start = pair.times.start;
      const end = pair.times.end;
      const now = nowObject.value.getTime();
      return start < now && now < end;
    }

    function getTimeString(unix: number) {
      return new Date(unix).toLocaleTimeString('ru-RU', { timeStyle: 'short' });
    }

    function setIcon(type: 'g' | 't' | 'l') {
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

    function setUpdateAndNotificationTimer() {
      nowObject.value = new Date();

      let delayUpdate = nowObject.value.getTime();
      let delayNotification = nowObject.value.getTime();

      for (const day of props.scheduleResponse?.schedule) {
        for (const pair of day.pairs) {
          const deltaStart = pair.times.start - nowObject.value.getTime();
          const deltaEnd = pair.times.end - nowObject.value.getTime();

          // Если начало занятия ещё не наступило
          if (deltaStart > 0) {
            // Если прошлое время ожидания перерисовки до начала занятия меньше
            if (deltaStart < delayUpdate) {
              delayUpdate = deltaStart;
            }
            // Если прошлое время ожидания перерисовки до конца занаятия меньше
            if (deltaEnd < delayUpdate) {
              delayUpdate = deltaEnd;
            }
            // Если прошлое время ожидания уведомления до начала занаятия меньше
            if (deltaStart < delayNotification) {
              delayNotification = deltaStart;
            }
          }
        }
      }
      console.log('Следующее обновление: ', new Date(nowObject.value.getTime() + delayUpdate).toLocaleString());
      console.log('Следующее оповещение: ', new Date(nowObject.value.getTime() + delayNotification).toLocaleString());

      setTimeout(setUpdateAndNotificationTimer, delayUpdate);
      setTimeout(sendNotification, delayNotification);
    }


    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState == 'visible') {
        setUpdateAndNotificationTimer();
      }
    });

    function sendNotification() {
      Notification.requestPermission(function(permission) {
        // Если пользователь разрешил, то создаём уведомление
        if (permission === 'granted') {
          const options: NotificationOptions = {
            icon: '../img/icon.png',
            body: 'Начинается новое занятие'
          };
          const notification = new Notification('Расписание', options);
        }
      });
    }

    sendNotification();

    return { setIcon, getTimeString, isNowLesson, isTodayLesson };
  }
});
</script>

<style scoped>
.start-time {
  font-size: 13pt;
}

.end-time {
  font-size: 13pt;
}

.number {
  font-size: 22pt;
}

.discipline {
  font-size: 13pt;
}

.characteristic-text {
  font-size: 10pt;
}

.today-lesson {
  border-inline-start: 5px solid rgba(11, 103, 56, 0.4);
}

.now-lesson {
  border-inline-start: 6px solid #0b6737;
}
</style>
