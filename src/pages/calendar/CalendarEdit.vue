<template>
    <div v-if="isVisible" style="background-color: blue">
      <h6>Edit</h6>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
export default defineComponent({
  name:'CalendarEdit',
  setup(){
    const isVisible = ref(false);
    function open(info){
      console.log('Opening edit popup => ', info);
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
})
</script>

<style scoped>

</style>
