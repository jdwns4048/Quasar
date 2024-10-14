<template>
    <div ref="calendarRef" v-touch-swipe.mouse="onSwipeCalendar" style="padding: 16px"></div>
    <div class="row justify-center">
        <!--        <CalendarDetail ref="detailPage"></CalendarDetail>-->
        <CalendarEdit ref="editPopup"></CalendarEdit>
    </div>
</template>

<script lang="ts">
import {onMounted, defineComponent, ref} from 'vue';
import Calendar from '@event-calendar/core';
import TimeGrid from '@event-calendar/time-grid';
import DayGrid from '@event-calendar/day-grid';
import List from '@event-calendar/list';
import Interaction from '@event-calendar/interaction';
import CalendarDetail from 'pages/calendar/CalendarDetail.vue';
import CalendarEdit from 'pages/calendar/CalendarEdit.vue';
import {useRouter} from 'vue-router';

type CalendarType = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';
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

export type Info = {
    date: Date; // 클릭된 날짜
    dateStr: string; // 날짜 문자열
    allDay: boolean; // 하루 종일 여부
    resource?: any; // 리소스 객체 (선택적)
    dayEl: HTMLElement; // 클릭된 전체 일 요소
    jsEvent: MouseEvent;
};

export default defineComponent({
    name: 'CalendarMain',
    components: {
        CalendarDetail,
        CalendarEdit
    },
    setup(props, context) {
        const calendarRef = ref<HTMLElement>();
        const detailPage = ref();
        const editPopup = ref();
        const instance = ref<Calendar>();
        const router = useRouter();
        onMounted(() => {
            initialize();
        });
        const eventItems = ref([
            {
                id: 'SP0000093',
                start: '2024-10-10 10:00:30',
                end: '2024-10-10 12:00:30',
                title: 'Meeting'
            },
            {
                id: 'SP0000094',
                start: '2024-10-10 13:00:30',
                end: '2024-10-17 15:00:30',
                title: 'work1'
            },
            {
                id: 'SP0000094',
                start: '2024-10-10 13:00:30',
                end: '2024-10-17 15:00:30',
                title: 'work2'
            },
            {
                id: 'SA0000083',
                start: '2024-10-11T12:00:00',
                end: '2024-10-11T13:00:00',
                title: 'Lunch'
            },
            {
                id: 'SA0000083',
                start: '2024-10-11T12:00:00',
                end: '2024-10-11T13:00:00',
                title: 'Lunch'
            },
            {
                id: 'SA0000083',
                start: '2024-10-11T12:00:00',
                end: '2024-10-11T13:00:00',
                title: 'Lunch'
            }
        ]);
        function initialize() {
            //TODO 주말 외에 공휴일 표시하는 법 찾아볼것.
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
                            // el.style.backgroundColor = event.backgroundColor || '#FF5733'; // 기본 배경색
                            // el.style.color = event.textColor || '#FFFFFF';
                            return {domNodes: [el]};
                        },
                        moreLinkContent(item: CalendarMoreLink) {
                            //더보기 설정
                            const contentEl = document.createElement('span');
                            contentEl.innerHTML = `+ ${item.num}개의 추가 일정`;
                            contentEl.innerHTML = `+ ${item.num}개의 추가 일정`;
                            contentEl.style.color = '#138535';
                            contentEl.style.cursor = 'pointer';
                            return {domNodes: [contentEl]};
                        },
                        //TODO 해당 라우터에 매개변수 info 를 보내야됨
                        dateClick(info: Info) {
                            router.push({
                                path: '/calendarDetail',
                                query: {
                                    dateStr: info.dateStr.slice(0, 10)
                                }
                            });
                        },
                        eventClick(info: CalendarEventInfo) {
                            editPopup.value.open(info);
                        },
                        datesSet(datesSet: CalendarDatesSet) {},
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
            }
        }
        return {
            calendarRef,
            detailPage,
            editPopup,
            eventItems,
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
