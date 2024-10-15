<template>
<!--TODO 메소드(prev, next, today, 좌우 제스처) 추가해야 하는지?-->
  <com-calendar
    :items="items"
    @item-touch="onItemTouch"
    @date-touch="onDateTouch"
  >
  </com-calendar>
  <div class="row justify-center">
    <sales-activity-edit ref="editPopup"></sales-activity-edit>
  </div>
</template>
<script lang="ts">
import ComCalendar, {CalendarEvent} from 'components/calendar/ComCalendar.vue';
import SalesActivityEdit from 'pages/sales/SalesActivityEdit.vue';
import {defineComponent,ref} from 'vue';
import {useRouter} from 'vue-router';
import {dateToStr} from 'src/plugin/utils/format/date';
import {eventItems} from 'src/data/events';

export default defineComponent({
  name:'SalesActivityMain',
  components: {SalesActivityEdit, ComCalendar},
  setup(){
    const items = ref(eventItems);
    const editPopup = ref();
    const router = useRouter();
    function onItemTouch(event: CalendarEvent){
      editPopup.value.open(event);
    }
    function onDateTouch(event: CalendarEvent){
      const date = dateToStr(event.date, 'YYYY-MM-DD');
      const events = getDateEvents(date);
      router.push({
        path: '/calendarDetail',
        query: {
          date: date,
          events: JSON.stringify(events)
        }
      })
    }
    function getDateEvents(date: string) {
      return items.value.filter(event => {
        const startDate = new Date(event.start.slice(0, 10));
        const endDate = new Date(event.end.slice(0, 10));
        const targetDate = new Date(date);

        return targetDate >= startDate && targetDate <= endDate;
      });
    }

    return{
      items,
      editPopup,
      onItemTouch,
      onDateTouch
    }
  }
});

</script>
<style scoped>

</style>
