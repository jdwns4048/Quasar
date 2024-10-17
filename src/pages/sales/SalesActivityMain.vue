<template>
  <div style="padding: 16px">
    <q-tabs v-model="selectedTab" align="justify">
      <q-tab name="all" label="전체활동" />
      <q-tab name="actual" label="실적 입력 활동" />
      <q-tab name="plan" label="실적 미입력 활동" />
    </q-tabs>
    <com-calendar :items="items" @item-touch="onItemTouch" @date-touch="onDateTouch"> </com-calendar>
    <div class="row justify-center">
      <sales-activity-schedule ref="editPopup"></sales-activity-schedule>
    </div>
    <div class="row justify-end">
      <q-btn rounded color="primary" label="+ 활동추가" />
    </div>
  </div>
</template>
<script lang="ts">
import ComCalendar, {CalendarEvent} from 'components/calendar/ComCalendar.vue';
import SalesActivitySchedule from 'pages/sales/SalesActivitySchedule.vue';
import {defineComponent, ref} from 'vue';
import {useRouter} from 'vue-router';
import {dateToStr} from 'src/plugin/utils/format/date';
import {eventItems} from 'src/data/events';

export default defineComponent({
    name: 'SalesActivityMain',
    components: {SalesActivitySchedule, ComCalendar},
    setup() {
        const selectedTab = ref('all');
        //TODO 탭에 따라 items 가 바껴야함
        const items = ref(eventItems);
        const editPopup = ref();
        const router = useRouter();
        function onItemTouch(event: CalendarEvent) {
            editPopup.value.open(event);
        }
        function onDateTouch(event: CalendarEvent) {
            const date = dateToStr(event.date, 'YYYY-MM-DD');
            router.push({
                path: '/calendarDetail',
                query: {
                    date: date
                }
            });
        }

        return {
            selectedTab,
            items,
            editPopup,
            onItemTouch,
            onDateTouch
        };
    }
});
</script>
<style scoped>
.q-tab {
    flex: 1 1 0;
    max-width: none;
}
</style>
