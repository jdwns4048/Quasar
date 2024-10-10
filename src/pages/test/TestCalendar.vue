<template>
    <div id="calendar" ref="container"></div>
    <div class="row justify-center">
        <q-btn @click="isOpened = true">상세페이지 팝업</q-btn>
        <q-dialog v-model="isOpened" persistent>
            <q-card class="dialog-card row">
                <q-btn class="arrow" icon="arrow_left"></q-btn>
                <q-card class="column card-main">
                    <q-card-section class="col-3 calendar-header">
                        <div class="text-h4">2020.10.10</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none col-7 calendar-main" round>
                        <q-list>
                            <q-item v-for="item in sampleList" :key="item.key">{{ item.label }} </q-item></q-list
                        >
                    </q-card-section>

                    <q-card-actions class="col-2 calendar-footer" align="evenly">
                        <q-btn class="button" color="primary" label="편집" />
                        <q-btn class="button" color="primary" label="닫기" v-close-popup />
                    </q-card-actions>
                </q-card>
                <q-btn class="arrow" icon="arrow_right"></q-btn>
            </q-card>
        </q-dialog>
    </div>
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
        const isOpened = ref(false);
        const sampleList = [
            {key: 1, label: '일정 1 아침에 일어나서 알람듣고 끄기'},
            {key: 2, label: 'item 2'},
            {key: 3, label: 'item 3'}
        ];

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
                        eventContent(info: CalendarEventContent) {
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
            container,
            isOpened,
            sampleList
        };
    }
});
</script>

<style scoped>
#calendar {
    padding: 16px;
}

.dialog-card {
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
    background-color: darkgray;
}

.card-main {
    height: 100%;
    width: 70%;
    background-color: darkgray;
}

.calendar-header {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1d1d1d;
    background-color: white;
}

.calendar-main {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: bisque;
    width: 100%;
}

.calendar-footer {
    background-color: white;
}

.arrow {
    background-color: white;
}

.button {
    width: 20%;
}
</style>
