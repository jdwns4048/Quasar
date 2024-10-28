<template>
    <q-dialog v-model="isOpened" maximized>
        <q-card class="q-card">
            <div class="text-h6">담당자 검색 팝업</div>
            <q-select
                filled
                v-model="selectedUser"
                use-input
                input-debounce="0"
                :options="options"
                rows-visible="3"
                @filter="filterFn"
                style="min-height: 100vh; width: 250px; max-height: 180px; overflow-y: auto"
            >
                <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey"> No results</q-item-section>
                    </q-item>
                </template>
            </q-select>

            <div>
                <q-btn @click="close">닫기</q-btn>
                <q-btn @click="confirm">확인</q-btn>
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue';

defineExpose({open});
const emits = defineEmits(['confirm']);
const stringOptions = ['담당자1', '담당자2', '담당자3', '담당자4', '담당자5', '담당자6', '담당자7', '담당자8', '담당자9'];
const selectedUser = ref('');
const isOpened = ref<boolean>(false);
const options = ref<string[]>(stringOptions);

const filterFn = (val: string, update: (cb: () => void) => void) => {
    if (val === '') {
        update(() => {
            options.value = stringOptions;
        });
        return;
    }

    update(() => {
        const needle = val.toLowerCase();
        options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1);
    });
};
//TODO 가상스크롤 적용할것
function open() {
    isOpened.value = true;
}

function close() {
    isOpened.value = false;
    clear();
}

function confirm() {
    emits('confirm', selectedUser.value);
    close();
}

function clear() {
    selectedUser.value = '';
}
</script>

<style scoped></style>
