import { ref } from 'vue';

interface Search {
  id: string;
  name: string;
  type: 't' | 'g' | 'l';
}

export default function useSearch() {
  const results = ref<Search[]>([]);

  async function searchFetch(text: string) {
    if (text) {
      const url = `../api/search/${text}`;
      const response = await fetch(url);
      const json = await response.json();
      if (!json.message) {
        results.value = json;
      } else {
        results.value = [];
      }
    }
  }

  return { results, searchFetch };
}
