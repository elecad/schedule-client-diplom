<template>
  <v-dialog
    max-width='450px'
    :model-value='state'
    @update:model-value='update($event)'
  >
    <v-card>
      <v-container v-if='isLoading' class='d-flex align-center justify-center'>
        <v-progress-circular
          color='#0b6737'
          indeterminate
        ></v-progress-circular>
      </v-container>
      <div v-else>
        <v-img :src='info.img_path' height='270px' cover></v-img>
        <v-container>
          <h3 class='mb-3'>
            {{ info.name }}
          </h3>

          <div>Телефон: {{ info.phone }}</div>
          <div>Адрес: {{ info.adress }}</div>
        </v-container>
        <v-card-actions class='d-flex align-center justify-end'>
          <v-btn variant='tonal' color='#0b6737' @click='update(false)'
          >Закрыть
          </v-btn
          >
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import useInfo from '@/hooks/useInfo';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InfoIniversity',
  props: {
    state: Boolean
  },
  emits: ['update:state'],
  setup(params, { emit }) {
    const { info, isLoading } = useInfo();

    function update(value: boolean) {
      emit('update:state', value);
    }

    return { update, info, isLoading };
  }
});
</script>

<style scoped></style>
