<template>
    <div id="calendar" ref="container"></div>
</template>

<script lang="ts">
import {onMounted, defineComponent, ref} from 'vue';
import Calendar from '@event-calendar/core';
import TimeGrid from '@event-calendar/time-grid';
import DayGrid from '@event-calendar/day-grid';
import List from '@event-calendar/list';
import Interaction from '@event-calendar/interaction';

export default defineComponent({
    name: 'TestCalendar',
    setup() {
        const container = ref<HTMLElement>();
        const instance = ref<Calendar>();
        onMounted(() => {
          initialize();
        });
        function initialize(){
            instance.value = new Calendar({
              target: container.value,
              props:{
                plugins: [TimeGrid, DayGrid, List, Interaction],
                options:{
                  view: 'timeGridWeek',
                  events: [
                    // { id: '1', title: 'Event 1', start: '2024-10-15T10:00:00' },
                    // { id: '2', title: 'Event 2', start: '2024-10-16T14:00:00' }
                  ]
                }
              }
            })
        }
        return{
          container
        }
    }
});
</script>

<style scoped>
#calendar {
    padding: 16px;
}
</style>
