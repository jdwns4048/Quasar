<template>
    <q-page class="q-pa-md">
        <div class="column items-center justify-center q-gutter-lg">
            <q-btn class="item-button" size="md" color="white" text-color="black" stack @click="changeUrl('/sales-activity')">
                <q-icon class="button-icon" name="calendar_month" />
                <div>Calendar</div>
            </q-btn>

            <q-btn class="item-button" size="md" color="white" text-color="black" stack @click="changeUrl('/map')">
                <q-icon class="button-icon" name="pin_drop" />
                <div>지도</div>
            </q-btn>
            <q-btn class="item-button" size="md" color="white" text-color="black" stack @click="changeUrl('/location')">
                <q-icon class="button-icon" name="my_location" />
                <div>주소 검색</div>
            </q-btn>
        </div>
    </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useRouter} from 'vue-router';

const sample1: {label: string; value: string}[] = [];
for (let i = 0; i < 500; i++) {
    const randomData = Math.random().toString(36).substring(2, 15);
    sample1.push({label: randomData, value: randomData});
}
export default defineComponent({
    name: 'IndexPage',
    components: {},
    setup() {
        const router = useRouter();
        const searchClientInfo = ref();
        const clientList = ref(sample1);

        function changeUrl(newUrl: string) {
            router.push(newUrl);
        }
        const minCharFilter = (val: string, update: Function, abort: Function) => {
            if (val.length < 2) {
                abort();
                return;
            }
            update(() => {
                const needle = val.toLowerCase();
                clientList.value = sample1.filter(v => v.label.toLowerCase().includes(needle));
            });
        };
        return {
            searchClientInfo,
            clientList,
            changeUrl,
            minCharFilter
        };
    }
});
</script>
<style scoped>
.q-pa-md {
    display: flex;
    justify-content: center;
}
.item-button {
    min-width: 130px;
}

.button-icon {
    font-size: 40px;
}

.item-button > div {
    margin-top: 10px;
    font-size: 13px;
}
</style>
