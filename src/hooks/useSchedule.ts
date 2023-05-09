import { ref } from 'vue';

export const millisecondsInDay = 86400000;

interface ScheduleResponse {
  actual: boolean,
  timeReceiving: number,
  header: string,
  schedule: Schedule[]
}

interface Schedule {
  name: string,
  date: string,
  pairs: Pair[]
}

interface Pair {
  number: number,
  times: {
    start: number,
    end: number
  }
}

interface Lesson {
  discipline: string,
  types: string[],
  characteristics: Characteristic[],
  courses: Course[]
}

interface Characteristic {
  type: 'g' | 't' | 'l',
  id: string,
  text: string,
  info: string
}

interface Course {
  name: string,
  link: string
}

const initSchedule: ScheduleResponse = { header: '', actual: false, timeReceiving: 0, schedule: [] };

export default function useSchedule() {
  const date = ref(new Date());
  const isLoading = ref(true);
  const isError = ref(false);
  const schedule = ref<ScheduleResponse>(initSchedule);

  scheduleFetch();

  async function scheduleFetch() {
    isLoading.value = true;
    const { monday, sunday } = getWeeksDate();
    const mondayString = monday.toISOString().slice(0, 10);
    const sundayString = sunday.toISOString().slice(0, 10);

    try {
      const response = await fetch(`/api/schedule/g/12001902?to=${mondayString}&from=${sundayString}`);
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


  return { date, isLoading, nextWeek, backWeek, schedule, getCalenderLabel, nowWeek };
}
