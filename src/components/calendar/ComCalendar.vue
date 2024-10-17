<template>
    <div ref="calendarRef" v-touch-swipe.mouse="onSwipeCalendar" style="padding: 16px"></div>
</template>

<script lang="ts">
import {onMounted, defineComponent, ref, PropType} from 'vue';
import Calendar from '@event-calendar/core';
import TimeGrid from '@event-calendar/time-grid';
import DayGrid from '@event-calendar/day-grid';
import List from '@event-calendar/list';
import Interaction from '@event-calendar/interaction';

type CalendarType = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';
export type CalendarEvent<T extends Record<string, any> = Record<string, any>> = {
    id: string;
    start: string; //ISO8601
    end: string; //ISO8601
    date: Date;
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

type CalendarMoreLink = {
    num: number;
    text: string;
};

export type CalendarEventInfo = {
    el: HTMLElement;
    event: CalendarEvent;
    jsEvent: PointerEvent;
    view: CalendarView;
};

export type CalendarDatesSet = {
    end: Date;
    endStr: string; //iso8601
    start: Date;
    startStr: string; //iso8601
    view: CalendarView;
};

export default defineComponent({
    name: 'CalendarMain',
    emits: ['item-touch', 'date-touch'],
    props: {
        items: {
            type: Array as PropType<Array<Record<string, any>>>,
            default: () => []
        }
    },

    setup(props, context) {
        const calendarRef = ref<HTMLElement>();
        const instance = ref<Calendar>();
        const eventItems = ref(props.items);

        function initialize() {
            //TODO 공휴일 API 적용할것.
            instance.value = new Calendar({
                target: calendarRef.value,
                props: {
                    plugins: [TimeGrid, DayGrid, List, Interaction],
                    options: {
                        view: 'dayGridMonth',
                        dayHeaderFormat: {weekday: 'short'}, // default
                        headerToolbar: {
                            start: '',
                            center: 'title',
                            end: ''
                        },
                        events: eventItems.value,
                        dayMaxEvents: true,
                        nowIndicator: true,
                        selectable: false,
                        eventStartEditable: false,
                        eventDurationEditable: false,
                        eventContent(info: CalendarEventContent) {
                            //스케쥴 커스터마이징
                            const {event} = info;
                            const el = document.createElement('div');
                            el.textContent = event.title;
                            return {domNodes: [el]};
                        },
                        moreLinkContent(item: CalendarMoreLink) {
                            //더보기 설정
                            const contentEl = document.createElement('span');
                            contentEl.innerHTML = `+ ${item.num}개의 추가 일정`;
                            contentEl.style.color = '#138535';
                            contentEl.style.cursor = 'pointer';
                            return {domNodes: [contentEl]};
                        },
                        dateClick(info: CalendarEventInfo) {
                            //날짜 클릭
                            context.emit('date-touch', info);
                        },
                        eventClick(info: CalendarEventInfo) {
                            //스케줄 클릭
                            context.emit('item-touch', info.event);
                        },
                        datesSet(datesSet: CalendarDatesSet) {
                            //달력 초기 세팅
                        },
                        noEventsContent(): string {
                            return '해당 기간에 등록된 활동이 없습니다.';
                        }
                    }
                }
            });
            instance.value.refetchEvents();
        }

        function onSwipeCalendar(event) {
            const direction = event.direction;
            if (direction === 'left') {
                instance.value.next();
            } else if (direction === 'right') {
                instance.value.prev();
            } else if (direction === 'down'){
              console.log('down');
            } else if (direction === 'up'){
              console.log('up');
            }
        }

        onMounted(() => {
            initialize();
        });

        return {
            calendarRef,
            onSwipeCalendar
        };
    }
});
</script>
<style scoped>
:deep(.ec-title) {
    font-size: 20px;
    font-weight: bold;
}
:deep(.ec-content .ec-days .ec-day) {
    height: 90px;
}
:deep(.ec-content .ec-days .ec-day .ec-day-head) {
    text-align: center;
}
:deep(.ec-days .ec-day.ec-sat) {
    color: blue;
}
:deep(.ec-days .ec-day.ec-sun) {
    color: red;
}
</style>
