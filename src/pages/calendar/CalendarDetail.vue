<template>
    <q-page claoss="q-pa-md">
        <div class="container">
            <q-card class="dialog-card row">
                <q-btn class="arrow" icon="arrow_left"></q-btn>
                <q-card class="column card-main">
                    <q-card-section class="col-3 calendar-header">
                        <div class="text-h4">{{ date }}</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none col-7 calendar-main">
                        <div v-if="events.length === 0">일정이 없습니다.</div>
                        <div v-else>
                            <q-list>
                                <q-item v-for="event in events" :key="event.id">
                                    <q-item-section> {{ event.title }} </q-item-section>
                                </q-item>
                            </q-list>
                        </div>
                    </q-card-section>

                    <q-card-actions class="col-2 calendar-footer" align="evenly">
                        <q-btn class="button" color="primary" label="편집" />
                        <q-btn class="button" color="primary" label="닫기" @click="close" />
                    </q-card-actions>
                </q-card>
                <q-btn class="arrow" icon="arrow_right"></q-btn>
            </q-card>
        </div>
    </q-page>
</template>
<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';

const route = useRoute();
const router = useRouter();
const date = route.query.date;
const events = ref(JSON.parse((route.query.events as string) || '[]'));

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
