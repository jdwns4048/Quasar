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
export type CalendarEvent<T extends Record<string, any> = Record<string, any>> = {
  id: string;
  start: string; //ISO8601
  end: string; //ISO8601
  resourceId?: string | number;
  extendedProps: T;
  allDay?: boolean;
  title: string;
  display?: 'auto' | 'background' | 'ghost' | 'preview' | 'pointer';
};

export type CalendarView = {
  activeEnd: Date;
  activeStart: Date;
  calendar: any;
  currentEnd: Date;
  currentStart: Date;
  title: string;
  type: CalendarType;
};

type CalendarEventContent = {
  event: CalendarEvent;
  timeText: string;
  view: CalendarView;
};
const CalendarTypeMap: Record<Type, CalendarType> = {month: 'dayGridMonth', week: 'listWeek'};
const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm';

export default defineComponent({
    name: 'TestCalendar',
    props: {
        type: {
            type: String as PropType<Type>,
            default: 'month'
        }
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
                        view: typeToCalendarType(props.type),
                        headerToolbar: {
                            start: 'prev,today,next',
                            center: 'title',
                            end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        },
                        buttonText: {
                            dayGridMonth: 'Month',
                            timeGridWeek: 'Week',
                            timeGridDay: 'Day',
                            listWeek: 'List',
                            today: 'Today'
                        },
                        // events: eventItems.value
                        // date: model.value,
                      dayMaxEvents: true,
                      nowIndicator: true,
                      selectable: false,
                      eventStartEditable: false, // 드래그 가능 여부
                      eventDurationEditable: false, // 크기 조정 여부
                      eventContent(info: CalendarEventContent){
                        // const item = info.event;
                        // const instance = slotToComponent(context.slots.default(item));
                        // return {domNodes: [instance.el]};
                      }
                    }
                }
            });
          instance.value.refetchEvents();
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
