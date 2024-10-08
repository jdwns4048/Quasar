<template>
  <div id="calendar"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import Calendar from '@event-calendar/core';
import TimeGrid from '@event-calendar/time-grid';

onMounted(() => {
  const calendar = new Calendar({
    target: document.getElementById('calendar'),
    props: {
      plugins: [TimeGrid],
      options: {
        view: 'timeGridWeek',
        events: [
          // { id: '1', title: 'Event 1', start: '2024-10-15T10:00:00' },
          // { id: '2', title: 'Event 2', start: '2024-10-16T14:00:00' }
        ]
      }
    }
  });
});
</script>

<style scoped>
#calendar {
  padding: 16px;
}
</style>
