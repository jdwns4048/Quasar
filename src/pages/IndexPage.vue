<template>
    <q-page class="q-pa-md">
        <div style="margin-bottom: 20px; font-size: 18px; font-weight: bold; color: #1976d2">모바일 업무 지원</div>
        <q-select use-input use-chips v-model="searchClientInfo" :options="clientList" input-debounce="0" hint="2글자 이상 검색해주세요" label="고객/담당자 조회" behavior="menu" style="margin-bottom: 20px" @filter="minCharFilter">
            <q-icon name="search" size="30px" />
            <template v-slot:no-option>
                <q-item>
                    <q-item-section class="text-grey"> No results </q-item-section>
                </q-item>
            </template>
        </q-select>
        <div class="row items-center justify-center q-gutter-lg">
            <q-btn size="md" color="white" text-color="black" stack style="min-width: 130px" @click="changeUrl('/sales-activity')">
                <q-icon name="calendar_month" style="font-size: 40px" />
                <div style="margin-top: 10px; font-size: 15px">영업활동관리</div>
            </q-btn>

            <q-btn size="md" color="white" text-color="black" stack style="min-width: 130px" @click="changeUrl('/dashboard')">
                <q-icon name="bar_chart" style="font-size: 40px" />
                <div style="margin-top: 10px; font-size: 15px">수주판매현황</div>
            </q-btn>
            <q-btn size="md" color="white" text-color="black" stack style="min-width: 130px" @click="changeUrl('/company-info')">
                <q-icon name="emoji_transportation" style="font-size: 40px" />
                <div style="margin-top: 10px; font-size: 15px">고객정보</div>
            </q-btn>
            <q-btn size="md" color="white" text-color="black" stack style="min-width: 130px" @click="changeUrl('/company-contact')">
                <q-icon name="diversity_3" style="font-size: 40px" />
                <div style="margin-top: 10px; font-size: 13px">고객담당자정보</div>
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
            minCharFilter,
        };
    }
});
</script>
