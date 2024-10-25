<template>
    <div class="q-pa-md" style="max-width: 300px">
        <div class="q-gutter-lg" style="margin-bottom: 20px">
            <p style="font-weight: bold; font-size: 20px">input Value</p>
            <q-select label="Mode: 'add'" filled v-model="modelAdd" use-input use-chips multiple hide-dropdown-icon input-debounce="0" new-value-mode="add" />
        </div>
        <div class="tab-container">
            <q-tabs>
                <q-tab name="all" label="판매 실적" />
                <q-tab name="actual" label="판매 현황" />
            </q-tabs>
        </div>

        <div class="q-pa-md q-gutter-sm">
            <q-btn flat color="primary" label="보내기" />
            <q-btn round color="blue" text-color="white">
                <q-icon name="chat" />
            </q-btn>
        </div>

        <div class="q-pa-md">
            <q-option-group :options="optionsRadio" type="radio" v-model="radioGroup" />
        </div>
        <div class="q-pa-md">
            <q-option-group :options="optionsCheck" type="checkbox" v-model="checkBoxGroup" />
        </div>
        <div>
            <form autocapitalize="off" autocomplete="off" spellcheck="false">
                <q-editor ref="editorRef" @paste="onPaste" v-model="editor" />
            </form>
        </div>
    </div>

    <div class="q-pa-md" style="max-width: 350px">
        <q-list bordered class="rounded-borders">
            <q-expansion-item expand-separator icon="receipt" label="유형" caption="유형선택">
                <q-expansion-item :header-inset-level="1" expand-separator icon="receipt" label="Receipts">
                    <q-expansion-item switch-toggle-side dense-toggle label="Today" :header-inset-level="1" :content-inset-level="2">
                        <q-card>
                            <q-card-section> 1-1 TESTING</q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-expansion-item switch-toggle-side dense-toggle label="Yesterday" :header-inset-level="1" :content-inset-level="2">
                        <q-card>
                            <q-card-section> 1-2 TESTING</q-card-section>
                        </q-card>
                    </q-expansion-item>
                </q-expansion-item>

                <q-expansion-item :header-inset-level="1" :content-inset-level="1" expand-separator icon="schedule" label="client">
                    <q-card>
                        <q-card-section> 2-1 TESTING </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-expansion-item>
        </q-list>
    </div>

    <div class="q-pa-md">
        <div class="row items-center q-gutter-md">
            <p>Selected Start Date: {{ startDate }}</p>
            <q-icon name="arrow_forward" class="q-mx-md" />
            <p>Selected End Date: {{ endDate }}</p>
        </div>
        <q-expansion-item label="시작일">
            <div class="row items-center q-gutter-md">
                <q-date v-model="startDate" mask="YYYY-MM-DD" />
            </div>
        </q-expansion-item>
        <q-expansion-item label="종료일">
            <div class="row items-center q-gutter-md">
                <q-date v-model="endDate" mask="YYYY-MM-DD" />
            </div>
        </q-expansion-item>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const modelAdd = ref(null);
const radioGroup = ref(null);
const checkBoxGroup = ref([]);
const editorRef = ref(null);
const editor = ref('');
const date = ref('');
const startDate = ref('');
const endDate = ref('');

const optionsRadio = [
    {label: '고객미팅', value: 'bat'},
    {label: '입찰', value: 'bidding'},
    {label: '제안', value: 'proposal'},
    {label: '출장', value: 'business_trip'},
    {label: '내근', value: 'inside'}
];

const optionsCheck = [
    {label: '고객미팅', value: 'bat'},
    {label: '입찰', value: 'bidding'},
    {label: '제안', value: 'proposal'},
    {label: '출장', value: 'business_trip'},
    {label: '내근', value: 'inside'}
];

function onPaste(evt) {
    // 메서드에서 editorRef 반응형 참조를 사용
    // Let inputs do their thing, so we don't break pasting of links.
    if (evt.target.nodeName === 'INPUT') return;
    let text, onPasteStripFormattingIEPaste;
    evt.preventDefault();
    evt.stopPropagation();
    // ...
    // 이하 생략
}
</script>

<style scoped></style>
