<template>
    <div v-if="isVisible" class="row justify-center">
      <q-page>
        <h6>Test</h6>
      </q-page>
    </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
export default  defineComponent({
  name:'CalendarDetail',
  setup(){
    const isVisible = ref(false);
    function open(info){
      console.log('Opening detail popup =>', info);
      isVisible.value = true;
    }
    function close(){
      isVisible.value = false;
    }
    return{
      isVisible,
      open,
      close
    }
  }
});
</script>
<style scoped>

</style>
