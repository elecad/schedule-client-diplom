// Composables
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ScheduleView from '@/view/schedule-view.vue';
import scheduleSessionView from '@/view/schedule-session-view.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/g/12001902'

  },
  {
    path: '/g/:id',
    component: ScheduleView,
    name: 'g'
  },
  {
    path: '/t/:id',
    component: ScheduleView,
    name: 't'
  },
  {
    path: '/l/:id',
    component: ScheduleView,
    name: 'l'
  },
  {
    path: '/session/g/:id',
    component: scheduleSessionView,
    meta: {
      name: 'g'
    }
  },
  {
    path: '/session/t/:id',
    component: scheduleSessionView,
    meta: {
      name: 't'
    }
  },
  {
    path: '/session/l/:id',
    component: scheduleSessionView,
    meta: {
      name: 'l'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
