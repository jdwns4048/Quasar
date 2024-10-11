<template>
    <div ref="calendarRef" v-touch-swipe="onSwipeCalendar" @mousedown="onMouseDown" style="padding: 16px"></div>
    <div class="row justify-center">
        <CalendarDetail ref="detailPage"></CalendarDetail>
        <CalendarEdit ref="editPopup"></CalendarEdit>
    </div>
</template>

<script lang="ts">
import {onMounted, defineComponent, ref, PropType, watch} from 'vue';
import Calendar from '@event-calendar/core';
import TimeGrid from '@event-calendar/time-grid';
import DayGrid from '@event-calendar/day-grid';
import List from '@event-calendar/list';
import Interaction from '@event-calendar/interaction';
import {dateToStr} from 'src/plugin/utils/format/date';
import CalendarDetail from 'pages/calendar/CalendarDetail.vue';
import CalendarEdit from 'pages/calendar/CalendarEdit.vue';

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

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm';

export default defineComponent({
    name: 'CalendarMain',
    components: {
        CalendarDetail,
        CalendarEdit
    },
    props: {
        modelValue: {
            type: String,
            // default: () => global.format.dateToStr(new Date(), DEFAULT_FORMAT)
            default: () => dateToStr(new Date(), DEFAULT_FORMAT)
        },
        type: {
            type: String as PropType<Type>,
            default: 'month'
        }
    },
    setup(props, context) {
        const calendarRef = ref<HTMLElement>();
        const detailPage = ref();
        const editPopup = ref();
        const instance = ref<Calendar>();
        const isSwipeCalendar = ref(false);
        const info = ref();
        onMounted(() => {
            initialize();
        });
        const eventItems = ref([
            {
                id: 'SP0000093',
                start: '2024-10-10 10:00:30',
                end: '2024-10-10 12:00:30',
                title: 'Meeting1'
            },
            {
                id: 'SP0000094',
                start: '2024-10-10 13:00:30',
                end: '2024-10-17 15:00:30',
                title: 'Meeting3'
            },
            {
                id: 'SA0000083',
                start: '2024-10-11T12:00:00',
                end: '2024-10-11T13:00:00',
                title: 'Lunch'
            }
        ]);
        function initialize() {
            instance.value = new Calendar({
                target: calendarRef.value,
                props: {
                    plugins: [TimeGrid, DayGrid, List, Interaction],
                    options: {
                        view: 'dayGridMonth',
                        events: eventItems.value,
                        // date: model.value,
                        dayMaxEvents: isSwipeCalendar.value,
                        nowIndicator: true, // 현재 시간을 나타내는 표시선 여부
                        selectable: false, //날짜, 시간범위 선택 여부
                        eventStartEditable: false, // 드래그 가능 여부
                        eventDurationEditable: false, // 크기 조정 여부
                        eventContent(info: CalendarEventContent) {
                            //이벤트 렌더링 커스터마이징
                        },
                        moreLinkContent(item: CalendarMoreLink) {
                            //더보기 링크 커스터마이징
                        },
                        dateClick(info: CalendarEventInfo) {
                            detailPage.value.open(info);
                        },
                        eventClick(info: CalendarEventInfo) {
                            editPopup.value.open(info);
                        },
                        datesSet(datesSet: CalendarDatesSet) {
                          // 여기에 새로고침하면 무한대로 하게됨
                          console.log('datesSet : ', datesSet);
                        },
                        noEventsContent(): string {
                            return '해당 기간에 등록된 활동이 없습니다.';
                        }
                    }
                }
            });
            instance.value.refetchEvents();
        }
        function onMouseDown(event: MouseEvent) {
            const element = (event.target as HTMLElement).closest('.ec-day-foot .more');
            if (element) {
                const {date} = instance.value.dateFromPoint(event.clientX, event.clientY);
                context.emit('more', dateToStr(date, 'YYYY-MM-DD HH:mm'));
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }
        // function onSwipeCalendar(event){
        //   console.log('evemt', event);
        // }
        function onSwipeCalendar(event) {
          const direction = event.direction;
          //TODO 'direction' up-down 이벤트
            if (direction === 'up') {
                isSwipeCalendar.value = true;
            } else if (direction === 'down') {
                isSwipeCalendar.value = false;
            } else if (direction === 'left') {
                instance.value.next();
            } else if (direction === 'right') {
                instance.value.prev();
            }
        }
        return {
          info,
            calendarRef,
            detailPage,
            editPopup,
            eventItems,
            onMouseDown,
          onSwipeCalendar
        };
    }
});
</script>
