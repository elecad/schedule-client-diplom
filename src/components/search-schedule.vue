<template>
  <v-autocomplete
    label="Поиск..."
    hide-details
    no-data-text="Нужно не менее 3 символов для поиска"
    density="comfortable"
    prepend-inner-icon="mdi-magnify"
    menu-icon=""
    clearable
    :items="results"
    item-title="name"
    @update:model-value="select"
    @update:search="searchFetch"
    return-object
  ></v-autocomplete>
</template>

<script lang="ts">
import useSearch from "@/hooks/useSearch";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchSchedule",
  setup() {
    const { results, searchFetch } = useSearch();

    console.log(results.value);

    function select(event: any) {
      //? Логика по смене расписания
      console.log(event);
    }
    return { searchFetch, results, select };
  },
});
</script>

<style scoped></style>
