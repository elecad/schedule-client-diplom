<template>
  <v-autocomplete
    label='Поиск...'
    hide-details
    no-data-text='Нужно не менее 3 символов для поиска'
    density='comfortable'
    prepend-inner-icon='mdi-magnify'
    menu-icon=''
    clearable
    :items='results'
    item-title='name'
    @update:model-value='select'
    @update:search='searchFetch'
    return-object

  ></v-autocomplete>
</template>

<script lang='ts'>
import useSearch from '@/hooks/useSearch';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SearchSchedule',
  setup() {
    const { results, searchFetch } = useSearch();
    const { push } = useRouter();

    console.log(results.value);

    function select(event: any) {
      //? Логика по смене расписания
      push({ path: `/${event.type}/${event.id}` });
    }

    return { searchFetch, results, select };
  }
});
</script>

<style scoped></style>
