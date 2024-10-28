<template>
  <q-card v-touch-swipe.mouse="onSwipePage">
    <q-card-section>
      <div>{{ formattedDate }}</div>
    </q-card-section>
    <q-card-section>
      <div v-if="dailyEvents.length > 0">
        <q-item v-for="(event, index) in dailyEvents" :key="index">
          <q-item-section>{{ event.title }}</q-item-section>
        </q-item>
      </div>
      <div v-else>일정이 없습니다.</div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import {useRoute} from 'vue-router';
import {computed, ref, watch} from 'vue';
import {eventItems} from 'src/data/events';
import {dateToStr, strToDate} from 'src/plugin/utils/format/date';

interface Event {
  skedCode: string;
  start: string;
  end: string;
  title: string;
}

const route = useRoute();
const selectedDate = strToDate(route.query.date as string);
const date = ref<Date>(selectedDate);
const dailyEvents = ref<Event[]>(getEventsByDate(date.value));

const formattedDate = computed(() => dateToStr(date.value, 'YYYY-MM-DD'));

watch(date, newDate => {
  dailyEvents.value = getEventsByDate(newDate);
});

function getEventsByDate(targetDate: Date) {
  return eventItems.filter(event => {
    const startDate = strToDate(event.start, 'YYYY-MM-DD');
    const endDate = strToDate(event.end, 'YYYY-MM-DD');
    return targetDate >= startDate && targetDate <= endDate;
  });
}

function onSwipePage(event) {
  const direction = event.direction;
  if (direction === 'left') {
    next();
  } else if (direction === 'right') {
    previous();
  }
}

function previous() {
  date.value = new Date(date.value.setDate(date.value.getDate() - 1));
}

function next() {
  date.value = new Date(date.value.setDate(date.value.getDate() + 1));
}
</script>

