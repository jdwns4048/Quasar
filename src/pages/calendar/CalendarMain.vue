<template>
  <div id="calendar" ref="container" @mousedown="onMouseDown" @click="testMouse"></div>
  <div class="row justify-center">
    <CalendarDetail :isOpened="isOpened"></CalendarDetail>
    <CalendarEdit></CalendarEdit>
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

type CalendarEventContent = {
  event: CalendarEvent;
  timeText: string;
  view: CalendarView;
};

type CalendarMoreLink = {
  num: number;
  text: string;
};

const CalendarTypeMap: Record<Type, CalendarType> = {month: 'dayGridMonth', week: 'listWeek'};
const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm';

export default defineComponent({
  name: 'CalendarMain',
  components:{
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
    const container = ref<HTMLElement>();
    const instance = ref<Calendar>();
    const isOpened = ref(false);
    onMounted(() => {
      initialize();
    });
    function initialize() {
      instance.value = new Calendar({
        target: container.value,
        props: {
          plugins: [TimeGrid, DayGrid, List, Interaction], //TODO 캘린더 기능 확장,
          events: [
            //TODO 캘린더에 표시될 이벤트 데이터
            {
              title: 'Meeting',
              start: '2024-10-10T10:00:00',
              end: '2024-10-10T12:00:00'
            },
            {
              title: 'Lunch',
              start: '2024-10-11T12:00:00',
              end: '2024-10-11T13:00:00'
            }
          ],
          options: {
            view: typeToCalendarType(props.type),
            // headerToolbar: {
            //     start: 'prev,today,next',
            //     center: 'title',
            //     end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            // },
            // buttonText: {
            //     dayGridMonth: 'Month',
            //     timeGridWeek: 'Week',
            //     timeGridDay: 'Day',
            //     listWeek: 'List', // TODO 주간목록 뷰
            //     today: 'Today'
            // },
            // events: eventItems.value
            // date: model.value,
            dayMaxEvents: false, // 하루에 표시할 최대 이벤트 수를 설정, 초과시 '더보기' 표시
            nowIndicator: true, // 현재 시간을 나타내는 표시선 여부
            selectable: false, //날짜, 시간범위 선택 여부
            eventStartEditable: false, // 드래그 가능 여부
            eventDurationEditable: false, // 크기 조정 여부
            eventContent(info: CalendarEventContent) {
              //TODO 이벤트 렌더링 커스터마이징
              console.log('eventContent-info => ', info);
              // const item = info.event;
              // const instance = slotToComponent(context.slots.default(item));
              // return {domNodes: [instance.el]};
            },
            moreLinkContent(item: CalendarMoreLink) {
              //TODO 이벤트 렌더링 커스터마이징
              console.log('moreLinkContent-item', item);
              // const instance = slotToComponent(context.slots.more({item}));
              // return {domNodes: [instance.el]};
            },
            dateClick(info: CalendarEventInfo) {
              console.log('dateClick-info => ', info); // TODO 해당 날짜 클릭시 상세페이지
              context.emit('date-click', info.event);
            },
            eventClick(info: CalendarEventInfo) {
              console.log('eventClick-info => ', info); // TODO 해당 '활동' 클릭시 Popup
              context.emit('event-click', info.event);
            },
            datesSet(datesSet: CalendarDatesSet) {
              // TODO 달력날짜 설정될때마다, model 및 상태 업데이트
              // model.value = dateToStr(datesSet.view.currentStart, DEFAULT_FORMAT);
              console.log('datesSet => ', datesSet);
              context.emit('update:type', calendarTypeToType(datesSet.view.type));
              context.emit('update:range', [datesSet.startStr, datesSet.endStr]);
            },
            noEventsContent(): string {
              // 해당 기간에 등록된 일정이 없습니다.
              // return i18n.t('COM_MSG_NO_EVENTS');
              return '해당 기간에 등록된 활동이 없습니다.';
            }
          }
        }
      });
      instance.value.refetchEvents();
    }
    function typeToCalendarType(value: Type): CalendarType {
      return CalendarTypeMap[value];
    }
    //TODO Test
    function calendarTypeToType(value: CalendarType): Type {
      // @ts-ignore
      return Object.entries(CalendarTypeMap).find(array => array[1] === value)[0] as Type;
    }
    function onMouseDown(event: MouseEvent) {
      console.log('onMouseDown =>', event);
      const element = (event.target as HTMLElement).closest('.ec-day-foot .more');
      if (element) {
        const {date} = instance.value.dateFromPoint(event.clientX, event.clientY);
        context.emit('more', dateToStr(date, 'YYYY-MM-DD HH:mm'));
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
    //TODO 테스트 Methods
    function testMouse(event: MouseEvent) {
      console.log('click =>', event);
      // const {date} = instance.value.dateFromPoint(event.clientX, event.clientY);
      // context.emit('add', dateToStr(date, DEFAULT_FORMAT));
    }
    watch(isOpened,(value)=>{
      console.log('isOpened', value);
    },{immediate:true});
    return {
      container,
      isOpened,
      onMouseDown,
      testMouse,
    };
  }
});
</script>

<style scoped>
#calendar {
  padding: 16px;
}
</style>

