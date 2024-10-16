<template>
    <q-page class="q-pa-md">
        <div class="container" v-touch-swipe.mouse="onSwipePage">
            <q-card class="dialog-card row">
                <q-btn class="arrow" icon="arrow_left" @click="previous"></q-btn>
                <q-card class="column card-main">
                    <q-card-section class="col-3 calendar-header">
                        <div class="text-h4">{{ formattedDate }}</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none col-7 calendar-main">
                        <div v-if="dailyEvents.length > 0">
                            <q-item v-for="event in dailyEvents" :key="event.id">
                                <q-item-section>{{ event.title }}</q-item-section>
                            </q-item>
                        </div>
                        <div v-else>일정이 없습니다.</div>
                    </q-card-section>

                    <q-card-actions class="col-2 calendar-footer" align="evenly">
                        <q-btn class="button" color="primary" label="편집" />
                        <q-btn class="button" color="primary" label="닫기" @click="close" />
                    </q-card-actions>
                </q-card>
                <q-btn class="arrow" icon="arrow_right" @click="next"></q-btn>
            </q-card>
        </div>
    </q-page>
</template>
<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {computed, ref, watch} from 'vue';
import {eventItems} from 'src/data/events';
import {dateToStr, strToDate} from 'src/plugin/utils/format/date';

interface Event {
    id: string;
    start: string;
    end: string;
    title: string;
}

const route = useRoute();
const router = useRouter();
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

function close() {
    router.back();
}
</script>
<style scoped>
.container {
    display: flex;
    height: calc(100vh - 51px);
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
    justify-content: center;
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
