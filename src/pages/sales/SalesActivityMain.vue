<template>
    <!--TODO 메소드(prev, next, today, 좌우 제스처) 를 공용에 추가할지? 아니면 여기에 추가할지?-->
    <com-calendar :items="items" @item-touch="onItemTouch" @date-touch="onDateTouch"> </com-calendar>
    <div class="row justify-center">
        <sales-activity-schedule ref="editPopup"></sales-activity-schedule>
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
            items,
            editPopup,
            onItemTouch,
            onDateTouch
        };
    }
});
</script>
<style scoped></style>
