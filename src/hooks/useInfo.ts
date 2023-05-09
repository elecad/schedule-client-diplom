import { ref } from 'vue';

interface Info {
  id?: number;
  name?: string;
  phone?: string;
  adress?: string;
  img_path?: string;
}

export default function useInfo() {
  const isLoading = ref(true);
  const info = ref<Info>({});

  infoFetch();

  async function infoFetch() {
    const id = 1;
    const response = await fetch(`/api/university/${id}`);
    const json = await response.json();

    info.value = json;
    isLoading.value = false;
  }

  return { isLoading, info };
}
