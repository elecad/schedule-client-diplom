import { ref } from 'vue';

const saveKey = 'favorite';

export interface Favorite {
  label: string;
  type: 'g' | 't' | 'l';
  id: string;
}

export default function useFavorites() {
  const favorites = ref<Favorite[]>(getFavorites());

  function additionFavorite(favorite: Favorite) {
    favorites.value.push(favorite);
    localStorage.setItem(saveKey, JSON.stringify(favorites.value));
  }

  function removeFavorite(favorite: Favorite) {
    favorites.value = favorites.value.filter((el) => {
      return el.id != favorite.id;
    });
    localStorage.setItem(saveKey, JSON.stringify(favorites.value));
  }

  function getFavorites(): Favorite[] {
    const text = localStorage.getItem(saveKey);
    if (text) {
      try {
        return JSON.parse(text);
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  return { favorites, additionFavorite, removeFavorite };
}
