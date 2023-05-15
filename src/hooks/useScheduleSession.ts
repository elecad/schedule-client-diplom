import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { ScheduleResponse } from '@/hooks/useSchedule';

const initSchedule: ScheduleResponse = { header: '', actual: false, timeReceiving: 0, schedule: [] };

const TYPES = ['экз.', 'зач.', 'курс.р.', 'реф.', 'к.р.', 'конс.', 'практ.', 'дифф.зач.', 'ТЕСТ', 'КонсВКР', 'ком.', 'пер.', 'защВКР'];

export default function useScheduleSession() {
  const isLoading = ref(true);
  const isError = ref(false);
  const schedule = ref<ScheduleResponse>(initSchedule);

  const type = useRoute().meta.name as 'g' | 't' | 'l';
  const id = useRoute().params.id as string;

  scheduleFetch();

  async function scheduleFetch() {
    isLoading.value = true;
    // const start = `${new Date().getFullYear() - 1}-09-01`;
    // const end = `${new Date().getFullYear()}-09-01`;

    const start = new Date().toISOString().slice(0, 10);
    const currentMonth = new Date().getMonth();
    let end = '';
    if (currentMonth >= 9) {
      end = `${new Date().getFullYear() + 1}-02-01`;
    } else {
      end = `${new Date().getFullYear()}-09-01`;
    }


    try {
      const response = await fetch(`/api/schedule/${type}/${id}?to=${start}&from=${end}`);
      const json = await response.json() as ScheduleResponse;
      isLoading.value = false;
      schedule.value = filterLesson(json);
    } catch {
      isLoading.value = false;
      isError.value = true;
    }
  }

  function filterLesson(json: ScheduleResponse) {

    for (const day of json.schedule) {
      for (const pair of day.pairs) {
        pair.lessons = pair.lessons.filter((p) => {
          return p.types.some(type => TYPES.includes(type));
        });
      }
    }


    for (const day of json.schedule) {

      day.pairs = day.pairs.filter((p) => {
        console.log(p.lessons.length);
        return p.lessons.length;
      });

      console.log('После: ', day.pairs);
    }
    console.log('До: ', json.schedule);
    json.schedule = json.schedule.filter((d) => {
      return d.pairs.length;
    });
    console.log('после: ', json.schedule);

    return json;
  }


  return { isLoading, schedule };
}
