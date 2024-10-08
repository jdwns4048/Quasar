<template>
    <div id="calendar" ref="container"></div>
</template>

<script lang="ts">
import {onMounted, defineComponent, ref, PropType} from 'vue';
import Calendar from '@event-calendar/core';
import TimeGrid from '@event-calendar/time-grid';
import DayGrid from '@event-calendar/day-grid';
import List from '@event-calendar/list';
import Interaction from '@event-calendar/interaction';

type CalendarType = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';
type Type = 'month' | 'week';
const CalendarTypeMap: Record<Type, CalendarType> = {month: 'dayGridMonth', week: 'listWeek'};
const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm';

export default defineComponent({
    name: 'TestCalendar',
    props:{
      type: {
        type: String as PropType<Type>,
        default: 'month'
      },
    },
    setup(props, context) {
        const container = ref<HTMLElement>();
        const instance = ref<Calendar>();

        onMounted(() => {
            initialize();
        });
        function initialize() {
            instance.value = new Calendar({
                target: container.value,
                props: {
                    plugins: [TimeGrid, DayGrid, List, Interaction],
                    options: {
                        view: typeToCalendarType(props.type)
                    }
                }
            });
        }
        function typeToCalendarType(value: Type): CalendarType {
            return CalendarTypeMap[value];
        }

        return {
            container
        };
    }
});
</script>

<style scoped>
#calendar {
    padding: 16px;
}
</style>
