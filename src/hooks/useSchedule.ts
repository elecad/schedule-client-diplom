import { ref } from 'vue';
import { useRoute } from 'vue-router';

export const millisecondsInDay = 86400000;

export interface ScheduleResponse {
  actual: boolean,
  timeReceiving: number,
  header: string,
  schedule: Schedule[]
}

export interface Schedule {
  name: string,
  date: string,
  pairs: Pair[]
}

export interface Pair {
  number: number,
  times: {
    start: number,
    end: number
  }
  lessons: Lesson[]
}

export interface Lesson {
  discipline: string,
  types: string[],
  characteristics: Characteristic[],
  courses: Course[]
}

export interface Characteristic {
  type: 'g' | 't' | 'l',
  id: string,
  text: string,
  info: string
}

export interface Course {
  name: string,
  link: string
}

const initSchedule: ScheduleResponse = { header: '', actual: false, timeReceiving: 0, schedule: [] };

export default function useSchedule() {
  const date = ref(new Date());
  const isLoading = ref(true);
  const isError = ref(false);
  const schedule = ref<ScheduleResponse>(initSchedule);

  const type = useRoute().name as 'g' | 't' | 'l';
  const id = useRoute().params.id as string;

  scheduleFetch();

  async function scheduleFetch() {
    isLoading.value = true;
    const { monday, sunday } = getWeeksDate();
    const start = monday.toISOString().slice(0, 10);
    const end = sunday.toISOString().slice(0, 10);
    try {
      const response = await fetch(`/api/schedule/${type}/${id}?to=${start}&from=${end}`);
      const json = await response.json();
      isLoading.value = false;
      schedule.value = json;
    } catch {
      isLoading.value = false;
      isError.value = true;
    }
  }


  function setDate(newDate: Date) {
    date.value = newDate;
    console.log(date.value.toLocaleDateString());
    scheduleFetch();
  }

  function nextWeek() {
    const interval = 7 * millisecondsInDay;
    const dateNumber = date.value.getTime();
    date.value = new Date(dateNumber + interval);
    console.log(date.value.toLocaleDateString());
    scheduleFetch();
  }

  function backWeek() {
    const interval = 7 * millisecondsInDay;
    const dateNumber = date.value.getTime();
    date.value = new Date(dateNumber - interval);
    console.log(date.value.toLocaleDateString());
    scheduleFetch();
  }

  function nowWeek() {
    date.value = new Date();
    console.log(date.value.toLocaleDateString());
    scheduleFetch();
  }

  function getWeeksDate() {
    const weekdayPosition = date.value.getDay();

    const sunday = new Date(
      date.value.getTime() -
      weekdayPosition * millisecondsInDay +
      7 * millisecondsInDay
    );
    const monday = new Date(sunday.getTime() - 6 * millisecondsInDay);

    return { monday, sunday };
  }

  function getCalenderLabel() {
    const monthNames = [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Мая',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек'
    ];
    const { monday, sunday } = getWeeksDate();
    const mondayLabel = `${monday.getDate()} ${monthNames[monday.getMonth()]}`;
    const sundayLabel = `${sunday.getDate()} ${monthNames[monday.getMonth()]}`;
    return `${mondayLabel} - ${sundayLabel}`.toUpperCase();
  }


  return { date, isLoading, nextWeek, backWeek, schedule, getCalenderLabel, nowWeek, setDate };
}
